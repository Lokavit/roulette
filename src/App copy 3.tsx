import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Roulette 憑天轉
 * - React + TS (this file assumes TSX)
 * - Tailwind UI
 * - File System Access API
 *
 * Notes:
 * - Uses showOpenFilePicker/showSaveFilePicker. Works in Chromium-based browsers.
 * - Year file is a dynamic log file (e.g. 2026.json)
 * - Task pool is loaded from a local task-pool.json (bundled) OR user can open it too.
 */

type Energy = "low" | "medium" | "high";

type TaskPool = {
  version: number;
  updatedAt: string;
  tasks: Task[];
};

type Task = {
  id: string;
  title: string;
  description: string;
  energy: Energy;
  duration: { min: number; max: number };
  tags: string[];
  output?: {
    type: "text" | "code" | "note" | "file";
    suggestedPath?: string;
  };
  rules?: {
    repeatable?: boolean;
    cooldownDays?: number;
  };
};

type DayLog = {
  energy: Energy;
  rolled: string[];
  selected?: string;
  status: "rolled" | "accepted" | "done" | "skip" | "abandoned";
  result?: {
    type: "url" | "file" | "repo" | "note";
    value: string;
    summary?: string;
  };
  createdAt: string;
  completedAt?: string;
  rollsUsed?: number;
  skipsUsed?: number;
};

type YearLog = {
  year: number;
  days: Record<string, DayLog>;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function nowISO() {
  return new Date().toISOString();
}

function startOfWeekISO(date = new Date()) {
  // Monday as start
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function formatDuration(task?: Task) {
  if (!task) return "-";
  const { min, max } = task.duration;
  if (min === max) return `${min} min`;
  return `${min}~${max} min`;
}

function energyLabel(e: Energy) {
  if (e === "low") return "低能量";
  if (e === "medium") return "中能量";
  return "高能量";
}

function energyBadgeClass(e: Energy) {
  if (e === "low") return "bg-zinc-100 text-zinc-700 border-zinc-200";
  if (e === "medium") return "bg-amber-50 text-amber-800 border-amber-200";
  return "bg-rose-50 text-rose-800 border-rose-200";
}

function statusBadgeClass(s: DayLog["status"]) {
  if (s === "done") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (s === "skip") return "bg-zinc-100 text-zinc-700 border-zinc-200";
  if (s === "abandoned") return "bg-rose-50 text-rose-800 border-rose-200";
  if (s === "accepted") return "bg-sky-50 text-sky-800 border-sky-200";
  return "bg-violet-50 text-violet-800 border-violet-200";
}

function isFSAvailable() {
  return (
    typeof window !== "undefined" &&
    // @ts-ignore
    typeof window.showOpenFilePicker === "function" &&
    // @ts-ignore
    typeof window.showSaveFilePicker === "function"
  );
}

// A tiny bundled fallback pool so UI can run without external file.
const BUILTIN_TASK_POOL: TaskPool = {
  version: 1,
  updatedAt: "2026-02-13",
  tasks: [
    {
      id: "task_write_001",
      title: "写一段人物外貌描写",
      description: "为你正在构思的角色写一段外貌描写，重点是细节和气质。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["writing", "character"],
      output: { type: "text", suggestedPath: "./writing/snippets/" },
      rules: { repeatable: true, cooldownDays: 3 },
    },
    {
      id: "task_linux_001",
      title: "整理一个 Linux alias 小工具",
      description:
        "写 5 个你最常用的 alias，放进 ~/.bashrc 或 ~/.zshrc，并写一段解释。",
      energy: "low",
      duration: { min: 15, max: 20 },
      tags: ["linux", "productivity"],
      output: { type: "note", suggestedPath: "./notes/linux/" },
      rules: { repeatable: true, cooldownDays: 7 },
    },
    {
      id: "task_frontend_001",
      title: "做一个可复用的 Button 组件",
      description: "在你的组件库里写一个 Button，支持 variant/size/disabled。",
      energy: "medium",
      duration: { min: 30, max: 60 },
      tags: ["frontend", "react", "typescript"],
      output: { type: "code", suggestedPath: "./src/components/" },
      rules: { repeatable: true, cooldownDays: 10 },
    },
    {
      id: "task_write_002",
      title: "写一段对话（雪夜空佛寺）",
      description: "写 300~600 字对话：公主与酒客万乞一在雪夜相遇。",
      energy: "medium",
      duration: { min: 40, max: 60 },
      tags: ["writing", "dialogue"],
      output: { type: "text", suggestedPath: "./writing/dialogue/" },
      rules: { repeatable: true, cooldownDays: 5 },
    },
    {
      id: "task_deep_001",
      title: "写一篇黑暗道回忆（不必给任何人看）",
      description: "写 800~1200 字：一段你不愿回忆的往事。写完封存。",
      energy: "high",
      duration: { min: 90, max: 120 },
      tags: ["fuck", "memory", "writing"],
      output: { type: "note", suggestedPath: "./private/" },
      rules: { repeatable: true, cooldownDays: 14 },
    },
  ],
};

export default function App() {
  const [taskPool, setTaskPool] = useState<TaskPool>(BUILTIN_TASK_POOL);
  const [yearLog, setYearLog] = useState<YearLog | null>(null);

  const [yearFileHandle, setYearFileHandle] =
    useState<FileSystemFileHandle | null>(null);
  const [poolFileHandle, setPoolFileHandle] =
    useState<FileSystemFileHandle | null>(null);

  const [energy, setEnergy] = useState<Energy>("medium");
  const [rolledCandidates, setRolledCandidates] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [rollsUsed, setRollsUsed] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [skipsUsed, setSkipsUsed] = useState<number>(0);

  const [resultType, setResultType] =
    useState<DayLog["result"]["type"]>("file");
  const [resultValue, setResultValue] = useState<string>("");
  const [resultSummary, setResultSummary] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"today" | "week" | "timeline">(
    "today"
  );

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2500);
  }

  const today = todayKey();

  const todayLog: DayLog | null = useMemo(() => {
    if (!yearLog) return null;
    return yearLog.days[today] ?? null;
  }, [yearLog, today]);

  useEffect(() => {
    // If today already has a log, sync local UI state
    if (!todayLog) return;
    setEnergy(todayLog.energy);
    setRollsUsed(todayLog.rollsUsed ?? 0);
    setSkipsUsed(todayLog.skipsUsed ?? 0);

    const tasks = todayLog.rolled
      .map((id) => taskPool.tasks.find((t) => t.id === id))
      .filter(Boolean) as Task[];

    setRolledCandidates(tasks);
    setSelectedTaskId(todayLog.selected ?? null);

    if (todayLog.result) {
      setResultType(todayLog.result.type);
      setResultValue(todayLog.result.value);
      setResultSummary(todayLog.result.summary ?? "");
    }
  }, [todayLog, taskPool.tasks]);

  const fsAvailable = isFSAvailable();

  async function openYearFile() {
    if (!fsAvailable) {
      showToast(
        "当前浏览器不支持 File System Access API（建议 Chrome / Edge）"
      );
      return;
    }

    try {
      // @ts-ignore
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Year Log JSON",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });

      const file = await handle.getFile();
      const text = await file.text();

      const parsed = safeJsonParse<YearLog>(text, {
        year: new Date().getFullYear(),
        days: {},
      });

      if (!parsed.days) parsed.days = {} as any;

      setYearFileHandle(handle);
      setYearLog(parsed);
      showToast(`已加载：${file.name}`);
    } catch (e) {
      // user cancelled
    }
  }

  async function createNewYearFile() {
    if (!fsAvailable) {
      showToast(
        "当前浏览器不支持 File System Access API（建议 Chrome / Edge）"
      );
      return;
    }

    try {
      // @ts-ignore
      const handle = await window.showSaveFilePicker({
        suggestedName: `${new Date().getFullYear()}.json`,
        types: [
          {
            description: "Year Log JSON",
            accept: { "application/json": [".json"] },
          },
        ],
      });

      const empty: YearLog = {
        year: new Date().getFullYear(),
        days: {},
      };

      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(empty, null, 2));
      await writable.close();

      setYearFileHandle(handle);
      setYearLog(empty);
      showToast("已创建年度文件");
    } catch {
      // ignore
    }
  }

  async function openTaskPoolFile() {
    if (!fsAvailable) {
      showToast(
        "当前浏览器不支持 File System Access API（建议 Chrome / Edge）"
      );
      return;
    }

    try {
      // @ts-ignore
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Task Pool JSON",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });

      const file = await handle.getFile();
      const text = await file.text();
      const parsed = safeJsonParse<TaskPool>(text, BUILTIN_TASK_POOL);

      if (!parsed.tasks) parsed.tasks = [];

      setPoolFileHandle(handle);
      setTaskPool(parsed);
      showToast(`任务池已加载：${file.name}`);
    } catch {
      // ignore
    }
  }

  function pickRandomTasks(energyLevel: Energy, count: number) {
    const pool = taskPool.tasks.filter((t) => t.energy === energyLevel);
    if (pool.length === 0) return [];

    // avoid duplicates
    const picked: Task[] = [];
    const used = new Set<string>();

    const maxTry = 200;
    let tries = 0;

    while (picked.length < Math.min(count, pool.length) && tries < maxTry) {
      tries++;
      const t = pool[Math.floor(Math.random() * pool.length)];
      if (used.has(t.id)) continue;
      used.add(t.id);
      picked.push(t);
    }

    return picked;
  }

  function recommendOne(candidates: Task[]) {
    if (!yearLog) return candidates[0]?.id ?? null;

    // simple heuristic:
    // 1) prefer tags not used in last 7 days
    const recentDays = Object.keys(yearLog.days)
      .sort()
      .slice(-7)
      .map((k) => yearLog.days[k])
      .filter(Boolean);

    const recentSelectedIds = recentDays
      .map((d) => d.selected)
      .filter(Boolean) as string[];
    const recentTasks = recentSelectedIds
      .map((id) => taskPool.tasks.find((t) => t.id === id))
      .filter(Boolean) as Task[];

    const recentTags = new Set(recentTasks.flatMap((t) => t.tags));

    let bestId: string | null = null;
    let bestScore = -999;

    for (const t of candidates) {
      const novelty = t.tags.reduce(
        (acc, tag) => acc + (recentTags.has(tag) ? 0 : 1),
        0
      );
      const score = novelty * 10 + Math.random();
      if (score > bestScore) {
        bestScore = score;
        bestId = t.id;
      }
    }

    return bestId ?? candidates[0]?.id ?? null;
  }

  function ensureTodayLogBase(): YearLog {
    const base: YearLog = yearLog ?? {
      year: new Date().getFullYear(),
      days: {},
    };
    const existing = base.days[today];

    if (!existing) {
      base.days[today] = {
        energy,
        rolled: [],
        status: "rolled",
        createdAt: nowISO(),
        rollsUsed: 0,
        skipsUsed: 0,
      };
    }

    return { ...base, days: { ...base.days } };
  }

  function roll3() {
    if (!yearLog) {
      showToast("先打开年度文件（STEP 1）");
      return;
    }

    if (spinning) return;

    if (rollsUsed >= 3) {
      showToast("今日 Spin 次数已用完（最多 3 次）");
      return;
    }

    const picked = pickRandomTasks(energy, 3);
    if (picked.length === 0) {
      showToast("任务池里没有这个能量等级的任务");
      return;
    }

    setSpinning(true);

    // Only reveal ONE task per spin
    const chosen = picked[Math.floor(Math.random() * picked.length)];
    setRolledCandidates([chosen]);

    const recommendedId = chosen.id;
    setSelectedTaskId(recommendedId);

    setRollsUsed((x) => x + 1);

    // write into memory yearLog
    const next = ensureTodayLogBase();

    // rolled is the historical list of all tasks rolled today
    const prevRolled = next.days[today].rolled ?? [];
    next.days[today] = {
      ...next.days[today],
      energy,
      rolled: [...prevRolled, chosen.id],
      selected: recommendedId ?? undefined,
      status: "rolled",
      rollsUsed: (next.days[today].rollsUsed ?? 0) + 1,
    };

    setYearLog(next);

    // 5s cooldown
    window.setTimeout(() => {
      setSpinning(false);
    }, 5000);
  }

  function skipToday() {
    if (!yearLog) {
      showToast("先打开年度文件（STEP 1）");
      return;
    }

    if (skipsUsed >= 1) {
      showToast("今日 Skip 次数已用完（最多 1 次）");
      return;
    }

    setSkipsUsed((x) => x + 1);

    const next = ensureTodayLogBase();
    next.days[today] = {
      ...next.days[today],
      energy,
      status: "skip",
      skipsUsed: (next.days[today].skipsUsed ?? 0) + 1,
    };

    setYearLog(next);
    showToast("今日已标记为 Skip");
  }

  function abandonToday() {
    if (!yearLog) {
      showToast("先打开年度文件（STEP 1）");
      return;
    }

    const next = ensureTodayLogBase();
    next.days[today] = {
      ...next.days[today],
      status: "abandoned",
    };

    setYearLog(next);
    showToast("今日任务已放弃");
  }

  function acceptTask(taskId: string) {
    if (!yearLog) {
      showToast("先打开年度文件（STEP 1）");
      return;
    }

    setSelectedTaskId(taskId);

    const next = ensureTodayLogBase();
    next.days[today] = {
      ...next.days[today],
      energy,
      selected: taskId,
      status: "accepted",
    };

    setYearLog(next);
  }

  function markDone() {
    if (!yearLog) {
      showToast("先打开年度文件（STEP 1）");
      return;
    }

    if (!selectedTaskId) {
      showToast("先选择一个任务");
      return;
    }

    const next = ensureTodayLogBase();
    next.days[today] = {
      ...next.days[today],
      energy,
      selected: selectedTaskId,
      status: "done",
      completedAt: nowISO(),
      result: resultValue
        ? {
            type: resultType,
            value: resultValue,
            summary: resultSummary || undefined,
          }
        : undefined,
    };

    setYearLog(next);
    showToast("已标记 Done（还没写回文件）");
  }

  async function saveToYearFile() {
    if (!yearLog) {
      showToast("没有可保存的数据");
      return;
    }

    if (!yearFileHandle) {
      showToast("未绑定年度文件句柄（请先 STEP 1 打开/创建）");
      return;
    }

    try {
      const writable = await yearFileHandle.createWritable();
      await writable.write(JSON.stringify(yearLog, null, 2));
      await writable.close();
      showToast("已写回年度文件");
    } catch {
      showToast("写入失败（可能权限被拒绝）");
    }
  }

  const taskById = useMemo(() => {
    const map = new Map<string, Task>();
    for (const t of taskPool.tasks) map.set(t.id, t);
    return map;
  }, [taskPool.tasks]);

  const selectedTask = selectedTaskId
    ? taskById.get(selectedTaskId)
    : undefined;

  const recommendedId = useMemo(() => {
    if (rolledCandidates.length === 0) return null;
    return recommendOne(rolledCandidates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolledCandidates.map((x) => x.id).join("|")]);

  const weekDays = useMemo(() => {
    const start = startOfWeekISO(new Date());
    return Array.from({ length: 7 }).map((_, i) => {
      const d = addDays(start, i);
      return isoDate(d);
    });
  }, []);

  const weekLogs = useMemo(() => {
    if (!yearLog) return [] as Array<{ date: string; log: DayLog | null }>;
    return weekDays.map((date) => ({ date, log: yearLog.days[date] ?? null }));
  }, [weekDays, yearLog]);

  const timeline = useMemo(() => {
    if (!yearLog) return [] as Array<{ date: string; log: DayLog }>;
    return Object.keys(yearLog.days)
      .sort()
      .reverse()
      .map((date) => ({ date, log: yearLog.days[date] }));
  }, [yearLog]);

  const stats = useMemo(() => {
    if (!yearLog) return { done: 0, total: 0 };
    const days = Object.values(yearLog.days);
    const done = days.filter((d) => d.status === "done").length;
    return { done, total: days.length };
  }, [yearLog]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="tile-title text-3xl font-black tracking-tight">
              ROULETTE
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              憑天轉 · 每日隨機任務 · 年度時間線
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
              {yearLog ? `Year ${yearLog.year}` : "No Year File"}
            </div>
            <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
              {stats.done}/{stats.total} done
            </div>
          </div>
        </div>

        <hr className="line-dashed my-6 border-dashed border-zinc-800" />

        {!fsAvailable && (
          <div className="mb-6 rounded-2xl border border-amber-800/40 bg-amber-950/30 p-4 text-amber-200">
            你的浏览器不支持 File System Access API。建议使用 Chrome / Edge。
          </div>
        )}

        {/* STEP 1 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs text-zinc-500">STEP 1</div>
              <div className="text-lg font-semibold">
                选择年度文件（2026.json）
              </div>
              <div className="mt-1 text-sm text-zinc-400">
                年度文件保存 timeline 日志。任务池可以内置或另行打开。
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={openYearFile}
                className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white">
                打开年度文件
              </button>
              <button
                onClick={createNewYearFile}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800">
                新建年度文件
              </button>
              <button
                onClick={openTaskPoolFile}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800">
                打开任务池 task-pool.json
              </button>
            </div>
          </div>

          {yearFileHandle && (
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400">
              已绑定年度文件句柄（浏览器权限 OK）
            </div>
          )}

          {poolFileHandle && (
            <div className="mt-2 rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400">
              已绑定任务池文件句柄（任务池可动态更新）
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* STEP 2 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="text-xs text-zinc-500">STEP 2</div>
            <div className="text-lg font-semibold">选择任务难度（能量）</div>
            <div className="mt-1 text-sm text-zinc-400">
              每次 Roll 之前都可以改变能量等级。
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["low", "medium", "high"] as Energy[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEnergy(e)}
                  className={
                    "rounded-xl border px-4 py-2 text-sm font-semibold transition " +
                    (energy === e
                      ? "border-white bg-white text-zinc-900"
                      : "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-800")
                  }>
                  {energyLabel(e)}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400">
              <div>
                今日：
                <span className="font-semibold text-zinc-200">{today}</span>
              </div>
              <div
                className={
                  "rounded-full border px-2 py-0.5 " + energyBadgeClass(energy)
                }>
                {energy}
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <div className="text-xs text-zinc-500">STEP 3</div>
            <div className="text-lg font-semibold">随机按钮（最多 3 次）</div>
            <div className="mt-1 text-sm text-zinc-400">
              Roll 会抽 3 个候选任务，并给出系统推荐。你可以接受推荐或手动选。
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={roll3}
                disabled={!yearLog || spinning || rollsUsed >= 3}
                className={
                  "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                  (!yearLog || spinning || rollsUsed >= 3
                    ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                    : "bg-violet-200 text-zinc-900 hover:bg-violet-100")
                }>
                Spin
              </button>

              <button
                onClick={skipToday}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-800">
                Skip（今日最多一次）
              </button>

              <button
                onClick={abandonToday}
                className="rounded-xl border border-rose-700/60 bg-zinc-950 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-950/30">
                放弃（Abandon）
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400">
              <div>
                Roll 已用：
                <span className="font-semibold text-zinc-200">
                  {rollsUsed}/3
                </span>
              </div>
              <div>
                Skip 已用：
                <span className="font-semibold text-zinc-200">
                  {skipsUsed}/1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Today candidates */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-500">今日任务列表</div>
              <div className="text-lg font-semibold">Roll 结果（全部显示）</div>
              <div className="mt-1 text-sm text-zinc-400">
                候选任务会保留在年度文件的今日节点里。
              </div>
            </div>

            {todayLog && (
              <div
                className={
                  "rounded-full border px-3 py-1 text-xs " +
                  statusBadgeClass(todayLog.status)
                }>
                status: {todayLog.status}
              </div>
            )}
          </div>

          {rolledCandidates.length === 0 ? (
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
              还没有 Roll。点击{" "}
              <span className="font-semibold text-zinc-200">Spin</span> 开始。
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {rolledCandidates.map((t) => {
                const isSelected = selectedTaskId === t.id;
                const isRecommended = recommendedId === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => acceptTask(t.id)}
                    className={
                      "text-left rounded-2xl border p-4 transition shadow-sm " +
                      (isSelected
                        ? "border-white bg-white text-zinc-900"
                        : "border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900")
                    }>
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-base font-bold leading-tight">
                        {t.title}
                      </div>
                      {isRecommended && (
                        <div
                          className={
                            "shrink-0 rounded-full border px-2 py-0.5 text-[11px] " +
                            (isSelected
                              ? "border-zinc-300 bg-zinc-100 text-zinc-700"
                              : "border-violet-400/40 bg-violet-950/40 text-violet-200")
                          }>
                          推荐
                        </div>
                      )}
                    </div>

                    <div
                      className={
                        "mt-2 inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs " +
                        (isSelected
                          ? "border-zinc-300 bg-zinc-100 text-zinc-700"
                          : energyBadgeClass(t.energy))
                      }>
                      <span>{t.energy}</span>
                      <span className="opacity-60">·</span>
                      <span>{formatDuration(t)}</span>
                    </div>

                    <div
                      className={
                        "mt-2 text-sm " +
                        (isSelected ? "text-zinc-700" : "text-zinc-300")
                      }>
                      {t.description}
                    </div>

                    <div
                      className={
                        "mt-3 flex flex-wrap gap-1 " +
                        (isSelected ? "text-zinc-600" : "text-zinc-400")
                      }>
                      {uniq(t.tags)
                        .slice(0, 6)
                        .map((tag) => (
                          <span
                            key={tag}
                            className={
                              "rounded-full border px-2 py-0.5 text-[11px] " +
                              (isSelected
                                ? "border-zinc-300"
                                : "border-zinc-800")
                            }>
                            {tag}
                          </span>
                        ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* STEP 4 */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="text-xs text-zinc-500">STEP 4</div>
          <div className="text-lg font-semibold">
            选择其中一个 · 执行任务 · 写回文件
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            选择任务后，可填写结果（文件路径/链接/总结），然后标记
            Done，并写回年度文件。
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <div className="text-sm font-semibold text-zinc-200">
                当前选择
              </div>

              {selectedTask ? (
                <div className="mt-2">
                  <div className="text-base font-bold">
                    {selectedTask.title}
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    {selectedTask.description}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={
                        "rounded-full border px-2 py-0.5 text-xs " +
                        energyBadgeClass(selectedTask.energy)
                      }>
                      {selectedTask.energy}
                    </span>
                    <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-xs text-zinc-300">
                      {formatDuration(selectedTask)}
                    </span>
                    {selectedTask.output?.type && (
                      <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-xs text-zinc-300">
                        output: {selectedTask.output.type}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-zinc-500">
                    taskId: {selectedTask.id}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-zinc-500">尚未选择任务</div>
              )}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <div className="text-sm font-semibold text-zinc-200">
                成果（可选）
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs text-zinc-400">resultType</label>
                  <select
                    value={resultType}
                    onChange={(e) => setResultType(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none">
                    <option value="file">file</option>
                    <option value="url">url</option>
                    <option value="repo">repo</option>
                    <option value="note">note</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400">resultValue</label>
                  <input
                    value={resultValue}
                    onChange={(e) => setResultValue(e.target.value)}
                    placeholder="./writing/2026-02-13.md 或 https://..."
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400">summary</label>
                  <input
                    value={resultSummary}
                    onChange={(e) => setResultSummary(e.target.value)}
                    placeholder='例如："写了800字短篇：雪夜空佛寺"'
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={markDone}
                  className="rounded-xl bg-emerald-200 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-100">
                  标记 Done
                </button>
                <button
                  onClick={saveToYearFile}
                  className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white">
                  写回年度文件
                </button>
              </div>

              <div className="mt-3 text-xs text-zinc-500">
                注意：只有点击“写回年度文件”才会真正保存。
              </div>
            </div>
          </div>
        </div>

        {/* Views */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("today")}
              className={
                "rounded-xl border px-4 py-2 text-sm font-semibold " +
                (activeTab === "today"
                  ? "border-white bg-white text-zinc-900"
                  : "border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900")
              }>
              Today
            </button>
            <button
              onClick={() => setActiveTab("week")}
              className={
                "rounded-xl border px-4 py-2 text-sm font-semibold " +
                (activeTab === "week"
                  ? "border-white bg-white text-zinc-900"
                  : "border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900")
              }>
              Week
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={
                "rounded-xl border px-4 py-2 text-sm font-semibold " +
                (activeTab === "timeline"
                  ? "border-white bg-white text-zinc-900"
                  : "border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900")
              }>
              Timeline
            </button>
          </div>

          {activeTab === "today" && (
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="text-lg font-semibold">Today View</div>
              <div className="mt-1 text-sm text-zinc-400">
                显示今日节点的完整信息。
              </div>

              <pre className="mt-4 overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs text-zinc-300">
                {JSON.stringify(todayLog, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === "week" && (
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="text-lg font-semibold">Week View</div>
              <div className="mt-1 text-sm text-zinc-400">本周每日状态。</div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {weekLogs.map(({ date, log }) => {
                  const selected = log?.selected
                    ? taskById.get(log.selected)
                    : undefined;
                  return (
                    <div
                      key={date}
                      className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold text-zinc-200">
                          {date}
                        </div>
                        {log ? (
                          <span
                            className={
                              "rounded-full border px-2 py-0.5 text-xs " +
                              statusBadgeClass(log.status)
                            }>
                            {log.status}
                          </span>
                        ) : (
                          <span className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-xs text-zinc-500">
                            empty
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-zinc-400">
                        {selected ? selected.title : log ? "(无选择)" : ""}
                      </div>

                      <div className="text-xs text-zinc-500">
                        {log?.result?.summary ? log.result.summary : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="text-lg font-semibold">Timeline View</div>
              <div className="mt-1 text-sm text-zinc-400">
                年度时间线（倒序）。
              </div>

              {timeline.length === 0 ? (
                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
                  还没有任何记录。
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {timeline.map(({ date, log }) => {
                    const selected = log.selected
                      ? taskById.get(log.selected)
                      : undefined;
                    return (
                      <div
                        key={date}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-zinc-200">
                              {date}
                            </div>
                            <span
                              className={
                                "rounded-full border px-2 py-0.5 text-xs " +
                                statusBadgeClass(log.status)
                              }>
                              {log.status}
                            </span>
                            <span
                              className={
                                "rounded-full border px-2 py-0.5 text-xs " +
                                energyBadgeClass(log.energy)
                              }>
                              {log.energy}
                            </span>
                          </div>

                          <div className="text-xs text-zinc-500">
                            rolls: {log.rollsUsed ?? 0} / skips:{" "}
                            {log.skipsUsed ?? 0}
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-zinc-300">
                          {selected ? selected.title : "(无选择)"}
                        </div>

                        {log.result?.summary && (
                          <div className="mt-2 text-xs text-zinc-500">
                            {log.result.summary}
                          </div>
                        )}

                        {log.result?.value && (
                          <div className="mt-2 text-xs text-zinc-400">
                            <span className="opacity-60">result:</span>{" "}
                            {log.result.value}
                          </div>
                        )}

                        <details className="mt-3">
                          <summary className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-200">
                            raw json
                          </summary>
                          <pre className="mt-2 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-xs text-zinc-300">
                            {JSON.stringify(log, null, 2)}
                          </pre>
                        </details>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-zinc-500">
          <div>提示：你可以把 task-pool.json 维护成你的“命运牌库”。</div>
          <div>如果你想做“冷却机制”，可以在 roll 时过滤最近完成过的任务。</div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-950/90 px-4 py-2 text-sm text-zinc-200 shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

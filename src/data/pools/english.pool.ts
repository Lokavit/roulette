import type { Task } from "../task-types";

/**
 * English Pool (Programming English Focus)
 * - 主要服務：看懂文檔 / API / StackOverflow / GitHub / 教程
 * - 核心載體：qwerty.kaiyi.cool 背單詞（按章節）
 *
 * 設計原則：
 * - 短、輕、可重複
 * - 低能量：背單詞 / 複習 / 句子抄寫
 * - 中能量：讀一小段文檔 + 記錄
 * - 高能量：寫 mini-summary / 翻譯 + 寫程式片段
 *
 * 注意：
 * - chapter 的具體數字你可自由填，這裡用「章」概念。
 */

export const ENGLISH_TASKS: Task[] = [
  // =========================================================
  // ROOT
  // =========================================================
  {
    id: "root_english_programming",
    type: "root",
    title: "English for Programming (Root)",
    description:
      "工程英語主線：單詞 → 文檔 → 句子理解 → 實戰閱讀 → 輸出（筆記/summary）。",
    energy: "easy",
    duration: { min: 5, max: 15 },
    tags: ["english", "programming", "root"],
  },

  // =========================================================
  // STAGES
  // =========================================================
  {
    id: "stage_english_vocab_base",
    type: "stage",
    parentId: "root_english_programming",
    order: 1,
    title: "Stage 1 - Vocabulary Base (單詞基礎)",
    description: "每天少量背單詞 + 高頻複習。建立閱讀 API 文檔的最小詞彙量。",
    energy: "easy",
    duration: { min: 5, max: 15 },
    tags: ["english", "vocab", "stage"],
  },
  {
    id: "stage_english_doc_reading",
    type: "stage",
    parentId: "root_english_programming",
    order: 2,
    title: "Stage 2 - Reading Docs (文檔閱讀能力)",
    description:
      "開始讀 MDN / Node / React / TypeScript 文檔，訓練快速掃描與抓關鍵句。",
    energy: "medium",
    duration: { min: 15, max: 35 },
    tags: ["english", "docs", "reading", "stage"],
    prerequisites: ["stage_english_vocab_base"],
  },
  {
    id: "stage_english_stackoverflow",
    type: "stage",
    parentId: "root_english_programming",
    order: 3,
    title: "Stage 3 - StackOverflow / GitHub (問題閱讀能力)",
    description:
      "閱讀真實的 bug 問題與回答。你需要能看懂 issue / error / solution。",
    energy: "medium",
    duration: { min: 20, max: 40 },
    tags: ["english", "stackoverflow", "github", "stage"],
    prerequisites: ["stage_english_doc_reading"],
  },
  {
    id: "stage_english_output",
    type: "stage",
    parentId: "root_english_programming",
    order: 4,
    title: "Stage 4 - Output (輸出能力)",
    description:
      "開始用英文寫筆記、寫 issue、寫 commit message，建立工程場景輸出能力。",
    energy: "hard",
    duration: { min: 30, max: 60 },
    tags: ["english", "writing", "output", "stage"],
    prerequisites: ["stage_english_stackoverflow"],
  },

  // =========================================================
  // LEAF - Vocabulary Drills (qwerty.kaiyi.cool)
  // =========================================================
  {
    id: "en_vocab_001",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 1,
    title: "背單詞：學習 1 章（qwerty）",
    description:
      "打開 https://qwerty.kaiyi.cool/ ，學習 1 章新單詞。要求：至少完成一輪測試。",
    energy: "easy",
    duration: { min: 8, max: 15 },
    tags: ["english", "vocab", "qwerty"],
  },
  {
    id: "en_vocab_002",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 2,
    title: "背單詞：學習 2 章（qwerty）",
    description: "學習 2 章新單詞。目標是擴充詞彙，而不是追求完美記住。",
    energy: "medium",
    duration: { min: 15, max: 25 },
    tags: ["english", "vocab", "qwerty"],
  },
  {
    id: "en_vocab_003",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 3,
    title: "複習單詞：複習 2 章（qwerty）",
    description:
      "選擇你最近背過的 2 章進行複習。要求：錯的單詞要點進去再看一遍。",
    energy: "easy",
    duration: { min: 8, max: 15 },
    tags: ["english", "review", "vocab", "qwerty"],
  },
  {
    id: "en_vocab_004",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 4,
    title: "複習單詞：複習 4 章（qwerty）",
    description: "複習 4 章。目標是加深熟悉度，提升閱讀時的識別速度。",
    energy: "medium",
    duration: { min: 15, max: 25 },
    tags: ["english", "review", "vocab", "qwerty"],
  },
  {
    id: "en_vocab_005",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 5,
    title: "單詞小結：記錄今天最難的 10 個詞",
    description:
      "從 qwerty 裡挑 10 個你今天最不熟的詞，寫在筆記中（中英對照即可）。",
    energy: "easy",
    duration: { min: 5, max: 10 },
    tags: ["english", "vocab", "notes"],
  },
  {
    id: "en_vocab_006",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 6,
    title: "單詞句子化：用 5 個單詞造句",
    description:
      "從今天背的詞裡挑 5 個，寫 5 個簡單句子。重點是語法正確，不追求文采。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["english", "vocab", "sentence"],
  },

  // =========================================================
  // LEAF - Docs Reading (Engineering Reading)
  // =========================================================
  {
    id: "en_docs_001",
    type: "leaf",
    parentId: "stage_english_doc_reading",
    order: 1,
    title: "讀文檔：讀 1 個 API 小節（10 分鐘）",
    description:
      "選擇一個你常用技術（React/TS/Node/Linux），讀一個 API 小節。記錄：3 個關鍵句。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["english", "docs", "reading"],
    prerequisites: ["en_vocab_001"],
  },
  {
    id: "en_docs_002",
    type: "leaf",
    parentId: "stage_english_doc_reading",
    order: 2,
    title: "讀文檔：整理 5 個術語（glossary）",
    description:
      "從文檔裡挑 5 個術語（例如: immutable, runtime, compile-time），寫下中文解釋與例句。",
    energy: "medium",
    duration: { min: 15, max: 30 },
    tags: ["english", "docs", "glossary"],
  },
  {
    id: "en_docs_003",
    type: "leaf",
    parentId: "stage_english_doc_reading",
    order: 3,
    title: "讀文檔：翻譯 5 句關鍵句",
    description:
      "選一段文檔（5~8 句），挑其中 5 句翻譯成中文。目標是理解語意，不是逐字翻。",
    energy: "hard",
    duration: { min: 25, max: 45 },
    tags: ["english", "docs", "translation"],
  },
  {
    id: "en_docs_004",
    type: "leaf",
    parentId: "stage_english_doc_reading",
    order: 4,
    title: "讀文檔：做 1 頁速讀掃描",
    description:
      "選一篇比較長的 docs page（至少 1 頁），快速掃描標題、code snippet、warning。寫 5 行 summary。",
    energy: "medium",
    duration: { min: 20, max: 35 },
    tags: ["english", "docs", "skimming"],
  },

  // =========================================================
  // LEAF - Error / StackOverflow / GitHub
  // =========================================================
  {
    id: "en_so_001",
    type: "leaf",
    parentId: "stage_english_stackoverflow",
    order: 1,
    title: "閱讀 StackOverflow：理解一個 Q&A",
    description:
      "找一個你感興趣的 StackOverflow 問題，閱讀問題與最高票答案。寫 5 行筆記：問題是什麼？解法是什麼？",
    energy: "medium",
    duration: { min: 20, max: 35 },
    tags: ["english", "stackoverflow", "reading"],
    prerequisites: ["en_docs_001"],
  },
  {
    id: "en_so_002",
    type: "leaf",
    parentId: "stage_english_stackoverflow",
    order: 2,
    title: "閱讀 GitHub Issue：理解一個 bug 討論",
    description:
      "找一個 GitHub issue（React/Vite/Node/TS），讀 issue 內容 + 至少 3 個回覆。寫下：bug 描述、重現方式、解法。",
    energy: "hard",
    duration: { min: 30, max: 55 },
    tags: ["english", "github", "issue", "reading"],
    prerequisites: ["en_docs_004"],
  },
  {
    id: "en_so_003",
    type: "leaf",
    parentId: "stage_english_stackoverflow",
    order: 3,
    title: "Error Message Drill：拆解 1 個錯誤訊息",
    description:
      "找一個你遇過的錯誤訊息（或隨便挑一個），逐句理解它。寫下：關鍵詞、可能原因、你會如何 Google。",
    energy: "medium",
    duration: { min: 15, max: 25 },
    tags: ["english", "error", "debug"],
  },

  // =========================================================
  // LEAF - Output (English Writing for Engineering)
  // =========================================================
  {
    id: "en_out_001",
    type: "leaf",
    parentId: "stage_english_output",
    order: 1,
    title: "英文輸出：寫 1 個 commit message（練習）",
    description:
      "模擬一個 commit，寫一條 commit message（例如: fix: handle null in task pool parser）。寫 5 條不同 commit message。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["english", "writing", "commit"],
    prerequisites: ["en_so_001"],
  },
  {
    id: "en_out_002",
    type: "leaf",
    parentId: "stage_english_output",
    order: 2,
    title: "英文輸出：寫 1 段 README 說明（5~10 行）",
    description:
      "用英文寫一段 README（介紹你的 Roulette 或任意小工具）。要求：5~10 行，包含 features 列表。",
    energy: "hard",
    duration: { min: 25, max: 45 },
    tags: ["english", "writing", "readme"],
    prerequisites: ["en_docs_004"],
  },
  {
    id: "en_out_003",
    type: "leaf",
    parentId: "stage_english_output",
    order: 3,
    title: "英文輸出：寫 1 個 issue 描述（模板）",
    description:
      "寫一段 GitHub issue 描述模板：Expected behavior / Actual behavior / Steps to reproduce。",
    energy: "hard",
    duration: { min: 25, max: 50 },
    tags: ["english", "writing", "github", "issue"],
    prerequisites: ["en_so_002"],
  },
  {
    id: "en_out_004",
    type: "leaf",
    parentId: "stage_english_output",
    order: 4,
    title: "英文輸出：用英文寫 10 行技術筆記",
    description:
      "從今天學到的內容裡挑一個概念，用英文寫 10 行筆記。允許簡單句，不追求高級表達。",
    energy: "medium",
    duration: { min: 15, max: 30 },
    tags: ["english", "writing", "notes"],
    prerequisites: ["en_docs_001"],
  },

  // =========================================================
  // LEAF - Mixed Quick Tasks (Perfect for Roulette)
  // =========================================================
  {
    id: "en_mix_001",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 50,
    title: "速任務：背單詞 10 分鐘（qwerty）",
    description:
      "設定計時器 10 分鐘，在 qwerty.kaiyi.cool 背單詞。時間到就停，不加碼。",
    energy: "easy",
    duration: { min: 8, max: 12 },
    tags: ["english", "vocab", "qwerty", "drill"],
  },
  {
    id: "en_mix_002",
    type: "leaf",
    parentId: "stage_english_vocab_base",
    order: 51,
    title: "速任務：複習單詞 10 分鐘（qwerty）",
    description: "複習模式刷 10 分鐘。目標：讓舊詞變熟。",
    energy: "easy",
    duration: { min: 8, max: 12 },
    tags: ["english", "review", "vocab", "qwerty", "drill"],
  },
  {
    id: "en_mix_003",
    type: "leaf",
    parentId: "stage_english_doc_reading",
    order: 52,
    title: "速任務：讀 1 個 code snippet + 解釋",
    description:
      "找一個文檔 code snippet（10~20 行），看懂後用中文寫一句話解釋它在做什麼。",
    energy: "medium",
    duration: { min: 12, max: 20 },
    tags: ["english", "docs", "code", "snippet"],
    prerequisites: ["en_vocab_003"],
  },
  {
    id: "en_mix_004",
    type: "leaf",
    parentId: "stage_english_stackoverflow",
    order: 53,
    title: "速任務：看 1 個英文影片片段（5 分鐘）",
    description:
      "找一個 programming tutorial 影片，播放 5 分鐘。即使開翻譯也行。記下 5 個聽到的關鍵詞。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["english", "listening", "video"],
    prerequisites: ["en_vocab_001"],
  },
];

export const TASK_POOL = {
  version: 2,
  updatedAt: "2026-02-13",
  tasks: [
    // =========================================================
    // ROOT: Linux Learning Path
    // =========================================================
    {
      id: "root_linux_learning_path",
      type: "root",
      title: "Linux Learning Path (Root)",
      description:
        "循序漸進學 Linux：Stage 1（基礎生存）→ Stage 2（系統/網路/權限）。Spin 抽到 root 時會自動解析到下一個可做的 leaf。",
      energy: "medium",
      duration: { min: 10, max: 25 },
      tags: ["linux", "learning", "path", "root"],
    },

    // -------------------------
    // STAGE 1: Linux Survival
    // -------------------------
    {
      id: "stage_linux_1_survival",
      type: "stage",
      parentId: "root_linux_learning_path",
      order: 1,
      title: "Linux Stage 1: Survival Basics",
      description:
        "學會 Linux 生存技能：目錄、檔案、編輯器、搜尋、管線。完成這個 stage 等於你可以在 Linux 裡不迷路。",
      energy: "medium",
      duration: { min: 10, max: 30 },
      tags: ["linux", "stage", "survival"],
    },

    {
      id: "linux_leaf_pwd_ls_cd",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 1,
      title: "Linux: pwd / ls / cd 生存練習",
      description:
        "打開終端，完成：pwd、ls、ls -la、cd ~、cd ..、cd /。理解絕對/相對路徑。",
      energy: "low",
      duration: { min: 8, max: 15 },
      tags: ["linux", "terminal", "filesystem"],
    },
    {
      id: "linux_leaf_mkdir_touch_rm",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 2,
      title: "Linux: mkdir / touch / rm 練習",
      description:
        "建立資料夾與檔案：mkdir、touch。嘗試 rm、rm -r。理解刪除不可逆。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["linux", "terminal", "filesystem"],
      prerequisites: ["linux_leaf_pwd_ls_cd"],
    },
    {
      id: "linux_leaf_cp_mv",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 3,
      title: "Linux: cp / mv 檔案搬運練習",
      description: "練習複製與移動：cp、cp -r、mv。理解 rename 本質就是 mv。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["linux", "terminal", "filesystem"],
      prerequisites: ["linux_leaf_mkdir_touch_rm"],
    },
    {
      id: "linux_leaf_cat_less_head_tail",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 4,
      title: "Linux: cat / less / head / tail",
      description:
        "讀取檔案內容：cat、less、head -n、tail -n。嘗試 tail -f 觀察 log。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["linux", "terminal", "logs"],
      prerequisites: ["linux_leaf_cp_mv"],
    },
    {
      id: "linux_leaf_grep_find",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 5,
      title: "Linux: grep / find 搜尋練習",
      description:
        "練習 grep -n、grep -r，find . -name。理解「內容搜尋」與「檔名搜尋」差異。",
      energy: "medium",
      duration: { min: 12, max: 25 },
      tags: ["linux", "terminal", "search"],
      prerequisites: ["linux_leaf_cat_less_head_tail"],
    },
    {
      id: "linux_leaf_pipe_redirect",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 6,
      title: "Linux: 管線與重導向 | > >>",
      description:
        "練習：cat file | grep word。練習輸出：> 覆蓋，>> 追加。理解 stdout/stderr。",
      energy: "medium",
      duration: { min: 12, max: 25 },
      tags: ["linux", "terminal", "pipe", "redirect"],
      prerequisites: ["linux_leaf_grep_find"],
    },
    {
      id: "linux_leaf_nano_or_vim",
      type: "leaf",
      parentId: "stage_linux_1_survival",
      order: 7,
      title: "Linux: nano 或 vim 編輯器最小生存",
      description:
        "選 nano 或 vim。至少學會：開檔、輸入、存檔、退出。vim：i, Esc, :wq, :q!",
      energy: "medium",
      duration: { min: 12, max: 25 },
      tags: ["linux", "editor", "vim", "nano"],
      prerequisites: ["linux_leaf_pipe_redirect"],
    },

    // -------------------------
    // STAGE 2: Linux System Skills
    // -------------------------
    {
      id: "stage_linux_2_system",
      type: "stage",
      parentId: "root_linux_learning_path",
      order: 2,
      title: "Linux Stage 2: System + Permissions",
      description:
        "學會權限、程序、網路、套件管理。完成後你可以開始真正部署與排錯。",
      energy: "high",
      duration: { min: 15, max: 40 },
      tags: ["linux", "stage", "system"],
      prerequisites: ["linux_leaf_nano_or_vim"],
    },

    {
      id: "linux_leaf_permissions_chmod",
      type: "leaf",
      parentId: "stage_linux_2_system",
      order: 1,
      title: "Linux: 權限概念 + chmod/chown",
      description:
        "理解 rwx / owner / group / others。練習 chmod 755、chmod +x、chown user:file。",
      energy: "high",
      duration: { min: 15, max: 30 },
      tags: ["linux", "permissions", "chmod", "chown"],
      prerequisites: ["linux_leaf_nano_or_vim"],
    },
    {
      id: "linux_leaf_ps_top_kill",
      type: "leaf",
      parentId: "stage_linux_2_system",
      order: 2,
      title: "Linux: ps / top / kill 進程管理",
      description: "練習 ps aux、top、kill -9。理解 PID 與服務程序。",
      energy: "medium",
      duration: { min: 12, max: 25 },
      tags: ["linux", "process", "debug"],
      prerequisites: ["linux_leaf_permissions_chmod"],
    },
    {
      id: "linux_leaf_systemctl_service",
      type: "leaf",
      parentId: "stage_linux_2_system",
      order: 3,
      title: "Linux: systemctl 管理 service",
      description:
        "練習 systemctl status/start/stop/restart。理解 service 的概念。",
      energy: "high",
      duration: { min: 15, max: 30 },
      tags: ["linux", "systemctl", "service"],
      prerequisites: ["linux_leaf_ps_top_kill"],
    },
    {
      id: "linux_leaf_network_basics",
      type: "leaf",
      parentId: "stage_linux_2_system",
      order: 4,
      title: "Linux: 網路工具 curl / ping / netstat",
      description:
        "練習 ping、curl、ss -tulpn（或 netstat）。理解 port 與 listening。",
      energy: "high",
      duration: { min: 15, max: 30 },
      tags: ["linux", "network", "curl", "ss"],
      prerequisites: ["linux_leaf_systemctl_service"],
    },
    {
      id: "linux_leaf_package_manager",
      type: "leaf",
      parentId: "stage_linux_2_system",
      order: 5,
      title: "Linux: apt/yum 套件管理入門",
      description:
        "Ubuntu：apt update / apt install。理解 package、dependency、版本。",
      energy: "medium",
      duration: { min: 15, max: 30 },
      tags: ["linux", "apt", "package-manager"],
      prerequisites: ["linux_leaf_network_basics"],
    },

    // =========================================================
    // ROOT: Web Text Game Dev Path
    // =========================================================
    {
      id: "root_web_text_game",
      type: "root",
      title: "Web Text Game Development (Root)",
      description:
        "開發 Web 文字遊戲：從設計 → data schema → engine → UI → save/load → release。",
      energy: "high",
      duration: { min: 15, max: 45 },
      tags: ["web", "game-dev", "text-game", "root"],
    },

    // -------------------------
    // STAGE: Design & Narrative
    // -------------------------
    {
      id: "stage_text_game_design",
      type: "stage",
      parentId: "root_web_text_game",
      order: 1,
      title: "Stage 1: Narrative & Design",
      description:
        "建立世界觀、玩法循環與文本結構。這個 stage 的成果是：你知道遊戲在玩什麼。",
      energy: "medium",
      duration: { min: 15, max: 40 },
      tags: ["game-design", "writing", "text-game"],
    },
    {
      id: "leaf_game_core_loop",
      type: "leaf",
      parentId: "stage_text_game_design",
      order: 1,
      title: "Text Game: 定義核心玩法循環",
      description:
        "用 5 行文字寫出遊戲 loop：玩家做什麼→得到什麼→失去什麼→如何結束。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["game-design", "core-loop", "writing"],
    },
    {
      id: "leaf_game_story_premise",
      type: "leaf",
      parentId: "stage_text_game_design",
      order: 2,
      title: "Text Game: 寫 1 句 Premise + 3 個結局方向",
      description:
        "一句話概括世界與衝突，並列出 3 種結局方向（勝利/失敗/隱藏結局）。",
      energy: "low",
      duration: { min: 10, max: 25 },
      tags: ["writing", "narrative", "ending"],
      prerequisites: ["leaf_game_core_loop"],
    },
    {
      id: "leaf_game_scene_list",
      type: "leaf",
      parentId: "stage_text_game_design",
      order: 3,
      title: "Text Game: 列出 8 個場景節點",
      description:
        "列出 8 個 scene（起點、衝突、陷阱、轉折、高潮等），每個 1 句描述。",
      energy: "medium",
      duration: { min: 15, max: 30 },
      tags: ["writing", "structure", "scene"],
      prerequisites: ["leaf_game_story_premise"],
    },

    // -------------------------
    // STAGE: Data Schema
    // -------------------------
    {
      id: "stage_text_game_schema",
      type: "stage",
      parentId: "root_web_text_game",
      order: 2,
      title: "Stage 2: Data Schema & Story Graph",
      description: "把故事拆成 JSON/TS 資料結構，形成 story graph。",
      energy: "high",
      duration: { min: 20, max: 45 },
      tags: ["schema", "json", "typescript", "game-dev"],
      prerequisites: ["leaf_game_scene_list"],
    },
    {
      id: "leaf_schema_define_scene_type",
      type: "leaf",
      parentId: "stage_text_game_schema",
      order: 1,
      title: "Define Scene Type（TypeScript）",
      description:
        "寫一個 Scene type：id、text、choices[]、effects、conditions。",
      energy: "high",
      duration: { min: 20, max: 35 },
      tags: ["typescript", "schema", "game-dev"],
      prerequisites: ["leaf_game_scene_list"],
    },
    {
      id: "leaf_schema_write_5_scenes",
      type: "leaf",
      parentId: "stage_text_game_schema",
      order: 2,
      title: "寫 5 個場景 JSON（含 choices）",
      description:
        "把你的 8 個場景中先挑 5 個做成 JSON，choices 要能跳到其他場景。",
      energy: "high",
      duration: { min: 20, max: 45 },
      tags: ["json", "writing", "game-dev"],
      prerequisites: ["leaf_schema_define_scene_type"],
    },

    // -------------------------
    // STAGE: Engine
    // -------------------------
    {
      id: "stage_text_game_engine",
      type: "stage",
      parentId: "root_web_text_game",
      order: 3,
      title: "Stage 3: Game Engine",
      description:
        "建立狀態機：currentSceneId、inventory、flags、stats。完成後遊戲能跑。",
      energy: "high",
      duration: { min: 20, max: 50 },
      tags: ["engine", "react", "state-machine"],
      prerequisites: ["leaf_schema_write_5_scenes"],
    },
    {
      id: "leaf_engine_state_model",
      type: "leaf",
      parentId: "stage_text_game_engine",
      order: 1,
      title: "建立 GameState（flags/inventory/stats）",
      description:
        "建立 GameState interface：sceneId、flags、inventory、hp、gold 等。",
      energy: "high",
      duration: { min: 20, max: 40 },
      tags: ["typescript", "react", "game-dev"],
      prerequisites: ["leaf_schema_write_5_scenes"],
    },
    {
      id: "leaf_engine_apply_choice",
      type: "leaf",
      parentId: "stage_text_game_engine",
      order: 2,
      title: "實作 applyChoice() + scene jump",
      description:
        "寫 applyChoice(choiceId)，更新 flags/stats，並跳轉到 nextScene。",
      energy: "high",
      duration: { min: 25, max: 50 },
      tags: ["engine", "state", "logic"],
      prerequisites: ["leaf_engine_state_model"],
    },

    // -------------------------
    // STAGE: UI + Save/Load
    // -------------------------
    {
      id: "stage_text_game_ui",
      type: "stage",
      parentId: "root_web_text_game",
      order: 4,
      title: "Stage 4: UI + Save/Load",
      description:
        "建立 UI（文字輸出 + choices），並加入存檔讀檔（localStorage）。",
      energy: "medium",
      duration: { min: 15, max: 40 },
      tags: ["ui", "save-load", "react"],
      prerequisites: ["leaf_engine_apply_choice"],
    },
    {
      id: "leaf_ui_scene_render",
      type: "leaf",
      parentId: "stage_text_game_ui",
      order: 1,
      title: "UI: 渲染 Scene text + Choice buttons",
      description: "畫面要能顯示當前場景文字，並列出 choices 讓玩家點選。",
      energy: "medium",
      duration: { min: 15, max: 35 },
      tags: ["react", "ui", "game-dev"],
      prerequisites: ["leaf_engine_apply_choice"],
    },
    {
      id: "leaf_ui_save_load_localstorage",
      type: "leaf",
      parentId: "stage_text_game_ui",
      order: 2,
      title: "Save/Load: localStorage 存檔讀檔",
      description: "加入 Save/Load 按鈕，將 GameState 存入 localStorage。",
      energy: "medium",
      duration: { min: 15, max: 30 },
      tags: ["react", "localStorage", "save-load"],
      prerequisites: ["leaf_ui_scene_render"],
    },

    // =========================================================
    // ROOT: Harvard CS50 2026 Learning Path (Template Style)
    // =========================================================
    {
      id: "root_cs50_2026",
      type: "root",
      title: "Harvard CS50 2026 Path (Root)",
      description:
        "用課程節奏拆解 CS50。每次抽到 root/stage，會自動推進到下一個可做 leaf。",
      energy: "high",
      duration: { min: 20, max: 60 },
      tags: ["cs50", "computer-science", "learning", "root"],
    },

    // -------------------------
    // STAGE: Week 0-1 Foundations
    // -------------------------
    {
      id: "stage_cs50_foundation",
      type: "stage",
      parentId: "root_cs50_2026",
      order: 1,
      title: "CS50 Stage 1: Foundations (Week 0~1)",
      description:
        "建立基礎：思維模型 + 基本程式概念。目標是能理解 lecture 和 pseudocode。",
      energy: "high",
      duration: { min: 20, max: 60 },
      tags: ["cs50", "foundation", "stage"],
    },
    {
      id: "cs50_leaf_setup_notes",
      type: "leaf",
      parentId: "stage_cs50_foundation",
      order: 1,
      title: "CS50: 建立筆記系統（Notion/Markdown）",
      description:
        "建立一個 CS50 專用筆記資料夾，設計模板：概念/例子/錯誤/練習題。",
      energy: "medium",
      duration: { min: 15, max: 30 },
      tags: ["cs50", "study", "notes"],
    },
    {
      id: "cs50_leaf_watch_intro_segment",
      type: "leaf",
      parentId: "stage_cs50_foundation",
      order: 2,
      title: "CS50: 看 20 分鐘 Intro / Week0 片段",
      description: "只看 20 分鐘，不追求完整。記錄 5 個你不懂的名詞。",
      energy: "low",
      duration: { min: 20, max: 25 },
      tags: ["cs50", "lecture", "learning"],
      prerequisites: ["cs50_leaf_setup_notes"],
    },
    {
      id: "cs50_leaf_define_5_terms",
      type: "leaf",
      parentId: "stage_cs50_foundation",
      order: 3,
      title: "CS50: 查 5 個不懂名詞並寫成筆記",
      description: "把 lecture 中不懂的 5 個名詞查清楚：一句話定義 + 例子。",
      energy: "medium",
      duration: { min: 20, max: 40 },
      tags: ["cs50", "notes", "concepts"],
      prerequisites: ["cs50_leaf_watch_intro_segment"],
    },
    {
      id: "cs50_leaf_pseudocode_exercise",
      type: "leaf",
      parentId: "stage_cs50_foundation",
      order: 4,
      title: "CS50: 寫 3 個 pseudocode（if/loop/function）",
      description:
        "用 pseudocode 寫 3 個流程：找最大值、計算平均、猜數字遊戲。",
      energy: "high",
      duration: { min: 25, max: 50 },
      tags: ["cs50", "pseudocode", "logic"],
      prerequisites: ["cs50_leaf_define_5_terms"],
    },

    // -------------------------
    // STAGE: C Basics
    // -------------------------
    {
      id: "stage_cs50_c_basics",
      type: "stage",
      parentId: "root_cs50_2026",
      order: 2,
      title: "CS50 Stage 2: C Basics",
      description:
        "進入 C 語言：variables、loops、arrays、strings。這階段目標是能寫小程式。",
      energy: "high",
      duration: { min: 25, max: 60 },
      tags: ["cs50", "c", "stage"],
      prerequisites: ["cs50_leaf_pseudocode_exercise"],
    },
    {
      id: "cs50_leaf_c_hello",
      type: "leaf",
      parentId: "stage_cs50_c_basics",
      order: 1,
      title: "CS50 C: Hello World + printf 基礎",
      description: "寫 hello world，理解 main、printf、編譯（clang 或 make）。",
      energy: "medium",
      duration: { min: 20, max: 35 },
      tags: ["cs50", "c", "hello-world"],
      prerequisites: ["cs50_leaf_pseudocode_exercise"],
    },
    {
      id: "cs50_leaf_c_loops",
      type: "leaf",
      parentId: "stage_cs50_c_basics",
      order: 2,
      title: "CS50 C: loop 練習（for/while）",
      description: "寫 2 個 loop：印出 1~100、印出奇數。加上計數器。",
      energy: "high",
      duration: { min: 25, max: 50 },
      tags: ["cs50", "c", "loop"],
      prerequisites: ["cs50_leaf_c_hello"],
    },
    {
      id: "cs50_leaf_c_arrays_strings",
      type: "leaf",
      parentId: "stage_cs50_c_basics",
      order: 3,
      title: "CS50 C: array/string 概念筆記 + 例子",
      description:
        "整理 array 與 string 的差異，寫一個字串長度計算（不使用 strlen）。",
      energy: "high",
      duration: { min: 30, max: 60 },
      tags: ["cs50", "c", "array", "string"],
      prerequisites: ["cs50_leaf_c_loops"],
    },

    // -------------------------
    // STAGE: Problem Set Sprint (light)
    // -------------------------
    {
      id: "stage_cs50_pset_sprint",
      type: "stage",
      parentId: "root_cs50_2026",
      order: 3,
      title: "CS50 Stage 3: Pset Sprint (Micro Tasks)",
      description:
        "把 problem set 拆成 micro tasks。每次只做一小段，避免崩潰。",
      energy: "high",
      duration: { min: 20, max: 60 },
      tags: ["cs50", "pset", "practice"],
      prerequisites: ["cs50_leaf_c_arrays_strings"],
    },
    {
      id: "cs50_leaf_pset_read_spec",
      type: "leaf",
      parentId: "stage_cs50_pset_sprint",
      order: 1,
      title: "CS50 Pset: 只讀 spec（10~20 分鐘）",
      description: "不要寫程式，只讀 problem set spec，並寫下輸入輸出規則。",
      energy: "medium",
      duration: { min: 15, max: 25 },
      tags: ["cs50", "pset", "planning"],
      prerequisites: ["cs50_leaf_c_arrays_strings"],
    },
    {
      id: "cs50_leaf_pset_examples",
      type: "leaf",
      parentId: "stage_cs50_pset_sprint",
      order: 2,
      title: "CS50 Pset: 把 sample I/O 手動推演一遍",
      description: "照 spec 的 sample input/output 手算一次，確保你理解規則。",
      energy: "high",
      duration: { min: 20, max: 35 },
      tags: ["cs50", "pset", "logic"],
      prerequisites: ["cs50_leaf_pset_read_spec"],
    },
    {
      id: "cs50_leaf_pset_write_pseudocode",
      type: "leaf",
      parentId: "stage_cs50_pset_sprint",
      order: 3,
      title: "CS50 Pset: 寫 pseudocode（不寫 C）",
      description: "用 pseudocode 完整描述解法，包含 loop 與條件判斷。",
      energy: "high",
      duration: { min: 20, max: 40 },
      tags: ["cs50", "pset", "pseudocode"],
      prerequisites: ["cs50_leaf_pset_examples"],
    },
    {
      id: "cs50_leaf_pset_implement_part1",
      type: "leaf",
      parentId: "stage_cs50_pset_sprint",
      order: 4,
      title: "CS50 Pset: 實作 Part 1（先跑起來）",
      description: "先寫最簡版本：能編譯、能讀 input、能輸出東西，不求正確。",
      energy: "high",
      duration: { min: 25, max: 50 },
      tags: ["cs50", "pset", "coding"],
      prerequisites: ["cs50_leaf_pset_write_pseudocode"],
    },
    {
      id: "cs50_leaf_pset_fix_edge_cases",
      type: "leaf",
      parentId: "stage_cs50_pset_sprint",
      order: 5,
      title: "CS50 Pset: 修 edge cases（補齊規則）",
      description: "針對 spec 的 corner case 修正，讓 output 正確。",
      energy: "high",
      duration: { min: 25, max: 60 },
      tags: ["cs50", "pset", "debug"],
      prerequisites: ["cs50_leaf_pset_implement_part1"],
    },

    // =========================================================
    // Extra: Generic Writing / Creative tasks (optional examples)
    // =========================================================
    {
      id: "leaf_write_200_words",
      type: "leaf",
      title: "寫作：寫 200 字（不修稿）",
      description: "選一個題材，連續寫 200 字，不停筆，不修改。只求輸出。",
      energy: "low",
      duration: { min: 10, max: 20 },
      tags: ["writing", "creative", "output"],
    },
    {
      id: "leaf_refactor_notes",
      type: "leaf",
      title: "整理筆記：精煉 1 頁內容",
      description: "把今天的筆記整理成『一句話總結 + 3 個關鍵點 + 1 個例子』。",
      energy: "medium",
      duration: { min: 15, max: 30 },
      tags: ["notes", "learning", "review"],
    },
  ],
};

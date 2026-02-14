import type { Task } from "../task-types";

export const LINUX_DRILLS_TASKS: Task[] = [
  // =========================================================
  // ROOT
  // =========================================================
  {
    id: "root_linux_daily_drills",
    type: "root",
    title: "Linux Daily Drills (Root)",
    description:
      "Linux 每日小練習任務池：短、輕、可重複、可累積。適合 Roulette 抽取。",
    energy: "low",
    duration: { min: 3, max: 12 },
    tags: ["linux", "drill", "daily", "practice"],
  },

  // =========================================================
  // STAGE: WARMUP (always unlocked)
  // =========================================================
  {
    id: "stage_linux_drills_warmup",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 1,
    title: "Warmup Drills",
    description: "快速熱身，讓你進入 Linux 狀態（永遠可抽）。",
    energy: "low",
    duration: { min: 3, max: 8 },
    tags: ["linux", "drill", "warmup"],
  },

  {
    id: "task_linux_drill_pwd_ls_cd",
    type: "leaf",
    parentId: "stage_linux_drills_warmup",
    order: 1,
    title: "熱身：pwd + ls + cd 走位",
    description:
      "在終端快速切換：~ → / → /etc → /var → /tmp → 回到 ~。每次都用 ls 看一下內容。",
    energy: "low",
    duration: { min: 3, max: 6 },
    tags: ["linux", "terminal", "warmup"],
  },
  {
    id: "task_linux_drill_history_review",
    type: "leaf",
    parentId: "stage_linux_drills_warmup",
    order: 2,
    title: "熱身：回看 history（最近 30 條）",
    description: "輸入 history | tail -n 30，挑 3 條命令解釋用途，寫在筆記裡。",
    energy: "low",
    duration: { min: 3, max: 8 },
    tags: ["linux", "history", "reflection"],
  },
  {
    id: "task_linux_drill_man_random",
    type: "leaf",
    parentId: "stage_linux_drills_warmup",
    order: 3,
    title: "熱身：隨機 man 一個命令",
    description:
      "隨便挑一個命令（例如 tar、grep、ss、chmod），看 man，找到 2 個你之前沒用過的選項。",
    energy: "low",
    duration: { min: 4, max: 10 },
    tags: ["linux", "man", "documentation"],
  },

  // =========================================================
  // STAGE: FILESYSTEM (unlocked after Stage1 basics)
  // =========================================================
  {
    id: "stage_linux_drills_filesystem",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 2,
    title: "Filesystem Drills",
    description: "文件與目錄操作 drills（需完成 Linux Stage1 基礎命令）。",
    energy: "low",
    duration: { min: 4, max: 12 },
    tags: ["linux", "filesystem", "drill"],
  },

  {
    id: "task_linux_drill_make_playground",
    type: "leaf",
    parentId: "stage_linux_drills_filesystem",
    order: 1,
    title: "文件練習：建立今日 playground",
    description:
      "建立資料夾 ~/linux-drills/YYYY-MM-DD，並在裡面 touch 3 個文件。",
    energy: "low",
    duration: { min: 3, max: 7 },
    tags: ["linux", "filesystem", "mkdir", "touch"],
    prerequisites: ["task_linux_stage1_basic_commands_1"],
  },
  {
    id: "task_linux_drill_tree_practice",
    type: "leaf",
    parentId: "stage_linux_drills_filesystem",
    order: 2,
    title: "文件練習：tree 看結構",
    description:
      "在 ~/linux-drills 下執行 tree -L 3，觀察自己文件結構。把輸出複製到筆記。",
    energy: "low",
    duration: { min: 3, max: 7 },
    tags: ["linux", "tree", "filesystem"],
    prerequisites: ["task_linux_stage1_package_manager"],
  },
  {
    id: "task_linux_drill_cp_mv_rm",
    type: "leaf",
    parentId: "stage_linux_drills_filesystem",
    order: 3,
    title: "文件練習：cp/mv/rm 小操作",
    description:
      "在今日資料夾內建立 a.txt、複製成 b.txt、移動 b.txt 到子資料夾 temp/，最後刪除 temp/。",
    energy: "low",
    duration: { min: 4, max: 10 },
    tags: ["linux", "cp", "mv", "rm", "filesystem"],
    prerequisites: ["task_linux_stage1_basic_commands_1"],
  },
  {
    id: "task_linux_drill_find_filetype",
    type: "leaf",
    parentId: "stage_linux_drills_filesystem",
    order: 4,
    title: "find：找出今天資料夾內所有 .txt",
    description:
      "在 ~/linux-drills 裡用 find 找出所有 .txt 文件。加上 -maxdepth 限制層數。",
    energy: "medium",
    duration: { min: 4, max: 12 },
    tags: ["linux", "find", "search"],
    prerequisites: ["task_linux_stage1_find_and_locate"],
  },
  {
    id: "task_linux_drill_du_space",
    type: "leaf",
    parentId: "stage_linux_drills_filesystem",
    order: 5,
    title: "du：找出最大的資料夾",
    description: "執行 du -sh ~/linux-drills/*，找出最大的資料夾並記錄大小。",
    energy: "low",
    duration: { min: 4, max: 10 },
    tags: ["linux", "du", "storage"],
    prerequisites: ["task_linux_stage3_disk_usage"],
  },

  // =========================================================
  // STAGE: TEXT TOOLS (unlocked after Stage2 pipeline)
  // =========================================================
  {
    id: "stage_linux_drills_text_tools",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 3,
    title: "Text Tools Drills",
    description:
      "grep/sed/awk drills（需完成 Stage2 pipeline / grep / sed / awk）。",
    energy: "medium",
    duration: { min: 5, max: 15 },
    tags: ["linux", "grep", "sed", "awk", "drill"],
  },

  {
    id: "task_linux_drill_grep_basic",
    type: "leaf",
    parentId: "stage_linux_drills_text_tools",
    order: 1,
    title: "grep：在 /etc 裡搜索關鍵詞",
    description:
      "用 grep -r 在 /etc 裡搜索一個關鍵詞（例如: PATH / host / network），至少找到 3 個結果。",
    energy: "medium",
    duration: { min: 5, max: 12 },
    tags: ["linux", "grep", "search"],
    prerequisites: ["task_linux_stage2_grep_find_text"],
  },
  {
    id: "task_linux_drill_grep_log_errors",
    type: "leaf",
    parentId: "stage_linux_drills_text_tools",
    order: 2,
    title: "grep：從 journalctl 中找 error",
    description:
      "執行 journalctl -p err -n 20，挑一條錯誤訊息解釋大概意思（看不懂也可以寫猜測）。",
    energy: "medium",
    duration: { min: 6, max: 12 },
    tags: ["linux", "journalctl", "logs", "debugging"],
    prerequisites: ["task_linux_stage3_logs_journalctl"],
  },
  {
    id: "task_linux_drill_pipeline_sort_wc",
    type: "leaf",
    parentId: "stage_linux_drills_text_tools",
    order: 3,
    title: "管道：sort + uniq + wc 統計",
    description:
      "用 ls / 或 history 產生輸出，練習 sort | uniq -c | sort -nr。觀察哪個結果最多。",
    energy: "medium",
    duration: { min: 5, max: 12 },
    tags: ["linux", "pipeline", "sort", "uniq", "wc"],
    prerequisites: ["task_linux_stage2_pipeline_practice"],
  },
  {
    id: "task_linux_drill_sed_replace",
    type: "leaf",
    parentId: "stage_linux_drills_text_tools",
    order: 4,
    title: "sed：做一次文本替換",
    description:
      "在今日資料夾建立 note.txt，寫 5 行內容，用 sed 替換某個詞（例如 TODO→DONE）。",
    energy: "medium",
    duration: { min: 5, max: 12 },
    tags: ["linux", "sed", "text"],
    prerequisites: ["task_linux_stage2_sed_intro"],
  },
  {
    id: "task_linux_drill_awk_columns",
    type: "leaf",
    parentId: "stage_linux_drills_text_tools",
    order: 5,
    title: "awk：抽取 ps aux 欄位",
    description:
      "執行 ps aux | head -n 5，用 awk 抽取 USER、PID、COMMAND 欄位（至少打印兩欄）。",
    energy: "high",
    duration: { min: 6, max: 15 },
    tags: ["linux", "awk", "ps", "process"],
    prerequisites: ["task_linux_stage2_awk_intro"],
  },

  // =========================================================
  // STAGE: PERMISSIONS (unlocked after Stage1 chmod)
  // =========================================================
  {
    id: "stage_linux_drills_permissions",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 4,
    title: "Permissions Drills",
    description: "chmod/chown drills（需完成 Stage1 權限入門）。",
    energy: "medium",
    duration: { min: 5, max: 15 },
    tags: ["linux", "permissions", "chmod", "drill"],
  },

  {
    id: "task_linux_drill_chmod_644_755",
    type: "leaf",
    parentId: "stage_linux_drills_permissions",
    order: 1,
    title: "chmod：644 vs 755 實際演示",
    description:
      "在今日資料夾建立 hello.sh，chmod 644 後嘗試執行，再 chmod 755 執行。記錄差異。",
    energy: "medium",
    duration: { min: 6, max: 12 },
    tags: ["linux", "chmod", "permissions"],
    prerequisites: ["task_linux_stage1_permissions_intro"],
  },
  {
    id: "task_linux_drill_umask_check",
    type: "leaf",
    parentId: "stage_linux_drills_permissions",
    order: 2,
    title: "umask：檢查並理解默認權限",
    description: "執行 umask，然後新建文件與資料夾，觀察它們的默認權限。",
    energy: "medium",
    duration: { min: 6, max: 12 },
    tags: ["linux", "umask", "permissions"],
    prerequisites: ["task_linux_stage1_permissions_intro"],
  },
  {
    id: "task_linux_drill_ls_l_permissions",
    type: "leaf",
    parentId: "stage_linux_drills_permissions",
    order: 3,
    title: "ls -l：解讀 3 個文件的權限",
    description:
      "挑 3 個文件/資料夾，用 ls -l 查看。寫出它們的 owner/group/permission 解釋。",
    energy: "low",
    duration: { min: 5, max: 10 },
    tags: ["linux", "ls", "permissions", "review"],
    prerequisites: ["task_linux_stage1_permissions_intro"],
  },

  // =========================================================
  // STAGE: PROCESS & SYSTEM (unlocked after Stage3 process/systemd)
  // =========================================================
  {
    id: "stage_linux_drills_process_system",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 5,
    title: "Process & System Drills",
    description: "系統管理 drills（需完成 Stage3 process/systemd/logs）。",
    energy: "medium",
    duration: { min: 5, max: 15 },
    tags: ["linux", "system", "process", "drill"],
  },

  {
    id: "task_linux_drill_top_snapshot",
    type: "leaf",
    parentId: "stage_linux_drills_process_system",
    order: 1,
    title: "top：抓一個系統快照",
    description:
      "打開 top，記錄 CPU usage 前 3 名的 process 名稱（可手動寫下）。",
    energy: "medium",
    duration: { min: 5, max: 10 },
    tags: ["linux", "top", "process"],
    prerequisites: ["task_linux_stage3_process_basics"],
  },
  {
    id: "task_linux_drill_ps_grep",
    type: "leaf",
    parentId: "stage_linux_drills_process_system",
    order: 2,
    title: "ps + grep：找出某個程序",
    description:
      "用 ps aux | grep <keyword> 找出至少一個程序，並理解 PID 與 COMMAND。",
    energy: "low",
    duration: { min: 4, max: 10 },
    tags: ["linux", "ps", "grep", "process"],
    prerequisites: ["task_linux_stage3_process_basics"],
  },
  {
    id: "task_linux_drill_systemctl_list_failed",
    type: "leaf",
    parentId: "stage_linux_drills_process_system",
    order: 3,
    title: "systemctl：查看 failed services",
    description:
      "執行 systemctl --failed，看看有沒有失敗服務。沒有也正常，記錄結果。",
    energy: "low",
    duration: { min: 4, max: 8 },
    tags: ["linux", "systemctl", "systemd"],
    prerequisites: ["task_linux_stage3_systemd_basic"],
  },
  {
    id: "task_linux_drill_journalctl_last_boot",
    type: "leaf",
    parentId: "stage_linux_drills_process_system",
    order: 4,
    title: "journalctl：查看最近一次開機 log",
    description:
      "執行 journalctl -b -n 30，讀 5 行，挑一行寫下你覺得它在做什麼。",
    energy: "medium",
    duration: { min: 6, max: 12 },
    tags: ["linux", "journalctl", "logs"],
    prerequisites: ["task_linux_stage3_logs_journalctl"],
  },
  {
    id: "task_linux_drill_df_free_memory",
    type: "leaf",
    parentId: "stage_linux_drills_process_system",
    order: 5,
    title: "df/free：檢查磁碟與內存",
    description: "執行 df -h 與 free -h，記錄磁碟剩餘與 memory usage。",
    energy: "low",
    duration: { min: 4, max: 8 },
    tags: ["linux", "df", "free", "system"],
    prerequisites: ["task_linux_stage3_disk_usage"],
  },

  // =========================================================
  // STAGE: NETWORKING (unlocked after Stage4 networking)
  // =========================================================
  {
    id: "stage_linux_drills_networking",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 6,
    title: "Networking Drills",
    description: "網路 drills（需完成 Stage4 networking 基礎）。",
    energy: "medium",
    duration: { min: 5, max: 15 },
    tags: ["linux", "networking", "drill"],
  },

  {
    id: "task_linux_drill_ping_google",
    type: "leaf",
    parentId: "stage_linux_drills_networking",
    order: 1,
    title: "ping：測試連線",
    description:
      "執行 ping -c 4 google.com 或 8.8.8.8，記錄 latency 大概多少 ms。",
    energy: "low",
    duration: { min: 4, max: 8 },
    tags: ["linux", "ping", "networking"],
    prerequisites: ["task_linux_stage4_ping_traceroute"],
  },
  {
    id: "task_linux_drill_curl_headers",
    type: "leaf",
    parentId: "stage_linux_drills_networking",
    order: 2,
    title: "curl：查看 HTTP headers",
    description:
      "執行 curl -I https://example.com，找到 status code (200/301/403...)，寫下它代表什麼。",
    energy: "medium",
    duration: { min: 5, max: 10 },
    tags: ["linux", "curl", "http"],
    prerequisites: ["task_linux_stage4_curl_wget"],
  },
  {
    id: "task_linux_drill_ss_ports",
    type: "leaf",
    parentId: "stage_linux_drills_networking",
    order: 3,
    title: "ss：查看正在監聽的端口",
    description:
      "執行 ss -tulpn，找到至少 1 個 LISTEN port，記錄 port + 程序名。",
    energy: "medium",
    duration: { min: 5, max: 12 },
    tags: ["linux", "ss", "ports", "networking"],
    prerequisites: ["task_linux_stage4_ports_netstat_ss"],
  },
  {
    id: "task_linux_drill_dns_resolve",
    type: "leaf",
    parentId: "stage_linux_drills_networking",
    order: 4,
    title: "DNS：解析域名（dig 或 nslookup）",
    description:
      "用 dig 或 nslookup 查詢 example.com 或 google.com，記錄它解析出的 IP。",
    energy: "medium",
    duration: { min: 5, max: 12 },
    tags: ["linux", "dns", "dig", "nslookup"],
    prerequisites: ["task_linux_stage4_network_notes"],
  },

  // =========================================================
  // STAGE: BASH MICRO SCRIPTS (unlocked after Stage2 bash basics)
  // =========================================================
  {
    id: "stage_linux_drills_bash_micro_scripts",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 7,
    title: "Bash Micro Scripts",
    description: "微型 bash scripts drills（需完成 Stage2 bash script 基礎）。",
    energy: "medium",
    duration: { min: 8, max: 20 },
    tags: ["linux", "bash", "script", "drill"],
  },

  {
    id: "task_linux_drill_script_date_report",
    type: "leaf",
    parentId: "stage_linux_drills_bash_micro_scripts",
    order: 1,
    title: "腳本：生成今日 report.txt",
    description:
      "寫一個 report.sh：輸出日期、whoami、pwd、df -h、free -h 的結果到 report.txt。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["linux", "bash", "script", "report"],
    prerequisites: ["task_linux_stage2_bash_script_hello"],
  },
  {
    id: "task_linux_drill_script_backup_folder",
    type: "leaf",
    parentId: "stage_linux_drills_bash_micro_scripts",
    order: 2,
    title: "腳本：打包今日資料夾",
    description:
      "寫 backup.sh：把 ~/linux-drills/YYYY-MM-DD 打包成 tar.gz 存到 ~/linux-drills/backups/。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["linux", "bash", "script", "tar", "backup"],
    prerequisites: ["task_linux_stage3_tar_backup"],
  },
  {
    id: "task_linux_drill_script_cleanup_tmp",
    type: "leaf",
    parentId: "stage_linux_drills_bash_micro_scripts",
    order: 3,
    title: "腳本：清理 tmp 檔案（模擬）",
    description:
      "在 ~/linux-drills/tmp-test 建立幾個文件，寫腳本刪除 7 天前的文件（可用 touch -d 模擬）。",
    energy: "high",
    duration: { min: 12, max: 25 },
    tags: ["linux", "bash", "script", "cleanup"],
    prerequisites: ["task_linux_stage2_bash_vars_if_loop"],
  },
  {
    id: "task_linux_drill_script_error_detector",
    type: "leaf",
    parentId: "stage_linux_drills_bash_micro_scripts",
    order: 4,
    title: "腳本：ERROR detector",
    description:
      "建立 log.txt，寫腳本統計 ERROR 出現次數，輸出到 summary.txt。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["linux", "bash", "script", "logs"],
    prerequisites: ["task_linux_stage2_checkpoint_log_parser"],
  },

  // =========================================================
  // STAGE: REVIEW & MEMORY (unlocked after Stage1 checkpoint)
  // =========================================================
  {
    id: "stage_linux_drills_review_memory",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 8,
    title: "Review & Memory Drills",
    description:
      "累積型任務：做筆記、做卡片、做 cheat sheet（需完成 Stage1 checkpoint）。",
    energy: "low",
    duration: { min: 5, max: 15 },
    tags: ["linux", "review", "memory", "notes"],
  },

  {
    id: "task_linux_drill_add_to_cheatsheet",
    type: "leaf",
    parentId: "stage_linux_drills_review_memory",
    order: 1,
    title: "累積：Cheat Sheet 增加 3 條命令",
    description:
      "打開你的 Linux cheat sheet，新增 3 條命令：命令 + 用途 + 一個例子。",
    energy: "low",
    duration: { min: 5, max: 12 },
    tags: ["linux", "notes", "cheatsheet"],
    prerequisites: ["task_linux_stage1_mini_checkpoint"],
  },
  {
    id: "task_linux_drill_review_one_command_deep",
    type: "leaf",
    parentId: "stage_linux_drills_review_memory",
    order: 2,
    title: "累積：深挖一個命令",
    description:
      "選一個命令（例如 find/grep/tar/ss），找到它 2 個你沒用過的參數，寫下例子。",
    energy: "medium",
    duration: { min: 8, max: 15 },
    tags: ["linux", "review", "deep-dive"],
    prerequisites: ["task_linux_stage1_manual_help"],
  },
  {
    id: "task_linux_drill_write_one_linux_note",
    type: "leaf",
    parentId: "stage_linux_drills_review_memory",
    order: 3,
    title: "累積：寫一條 Linux 知識筆記",
    description: "寫一條筆記（不超過 6 行）：今天你學到的一個概念 + 一個例子。",
    energy: "low",
    duration: { min: 5, max: 10 },
    tags: ["linux", "notes", "reflection"],
    prerequisites: ["task_linux_stage1_mini_checkpoint"],
  },
  {
    id: "task_linux_drill_flashcard_3",
    type: "leaf",
    parentId: "stage_linux_drills_review_memory",
    order: 4,
    title: "累積：做 3 張 Linux Flashcards",
    description:
      "做 3 張 flashcards：正面是問題（例如 chmod 755 意味什麼？），背面是答案。",
    energy: "low",
    duration: { min: 6, max: 12 },
    tags: ["linux", "flashcards", "memory"],
    prerequisites: ["task_linux_stage1_mini_checkpoint"],
  },

  // =========================================================
  // STAGE: MICRO CHALLENGES (unlocked after Stage2 checkpoint)
  // =========================================================
  {
    id: "stage_linux_drills_micro_challenges",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 9,
    title: "Micro Challenges",
    description: "短小但刺激的挑戰題（需完成 Stage2 checkpoint log parser）。",
    energy: "medium",
    duration: { min: 6, max: 15 },
    tags: ["linux", "challenge", "drill"],
  },

  {
    id: "task_linux_drill_challenge_one_liner",
    type: "leaf",
    parentId: "stage_linux_drills_micro_challenges",
    order: 1,
    title: "挑戰：寫一條 one-liner",
    description:
      "用一條命令完成：列出 /etc 中包含 conf 的文件名，並統計有多少個。",
    energy: "high",
    duration: { min: 8, max: 15 },
    tags: ["linux", "challenge", "pipeline"],
    prerequisites: ["task_linux_stage2_pipeline_practice"],
  },
  {
    id: "task_linux_drill_challenge_find_big_files",
    type: "leaf",
    parentId: "stage_linux_drills_micro_challenges",
    order: 2,
    title: "挑戰：找出 HOME 下最大的 5 個文件",
    description:
      "使用 find + du/sort/head 找出 ~ 下最大的 5 個文件。記錄結果。",
    energy: "high",
    duration: { min: 10, max: 20 },
    tags: ["linux", "challenge", "find", "storage"],
    prerequisites: ["task_linux_stage3_disk_usage"],
  },
  {
    id: "task_linux_drill_challenge_process_hunter",
    type: "leaf",
    parentId: "stage_linux_drills_micro_challenges",
    order: 3,
    title: "挑戰：Process Hunter",
    description:
      "找出 CPU 使用最高的 3 個 process，並寫下它們的 PID + COMMAND。",
    energy: "medium",
    duration: { min: 8, max: 15 },
    tags: ["linux", "challenge", "process"],
    prerequisites: ["task_linux_stage3_process_basics"],
  },
  {
    id: "task_linux_drill_challenge_permission_puzzle",
    type: "leaf",
    parentId: "stage_linux_drills_micro_challenges",
    order: 4,
    title: "挑戰：權限推理題",
    description:
      "建立文件 a.txt，chmod 600。回答：誰能讀？誰能寫？誰不能？再改成 640、755 做對比。",
    energy: "medium",
    duration: { min: 8, max: 15 },
    tags: ["linux", "challenge", "permissions"],
    prerequisites: ["task_linux_stage1_permissions_intro"],
  },

  // =========================================================
  // STAGE: DAILY MINI QUESTS (almost always unlocked)
  // =========================================================
  {
    id: "stage_linux_drills_daily_mini_quests",
    type: "stage",
    parentId: "root_linux_daily_drills",
    order: 10,
    title: "Daily Mini Quests",
    description: "最適合 Roulette：每天抽到都能做（基本無門檻）。",
    energy: "low",
    duration: { min: 3, max: 10 },
    tags: ["linux", "daily", "quest", "drill"],
  },

  {
    id: "task_linux_drill_daily_quest_1",
    type: "leaf",
    parentId: "stage_linux_drills_daily_mini_quests",
    order: 1,
    title: "每日任務：寫下 1 條今天學到的命令",
    description: "今天用到或看到的命令，寫下：命令 + 一句用途 + 一個例子。",
    energy: "low",
    duration: { min: 3, max: 6 },
    tags: ["linux", "daily", "notes"],
  },
  {
    id: "task_linux_drill_daily_quest_2",
    type: "leaf",
    parentId: "stage_linux_drills_daily_mini_quests",
    order: 2,
    title: "每日任務：整理 1 條常用 alias",
    description: "新增一個 alias（例如 ll='ls -alF'），並在筆記記錄它。",
    energy: "low",
    duration: { min: 3, max: 8 },
    tags: ["linux", "alias", "productivity"],
    prerequisites: ["task_linux_stage1_terminal_basics"],
  },
  {
    id: "task_linux_drill_daily_quest_3",
    type: "leaf",
    parentId: "stage_linux_drills_daily_mini_quests",
    order: 3,
    title: "每日任務：快速查看系統狀態",
    description:
      "依序執行 uptime、df -h、free -h。記錄你看到的 1 個數字（例如 load average）。",
    energy: "low",
    duration: { min: 4, max: 8 },
    tags: ["linux", "system", "daily"],
    prerequisites: ["task_linux_stage3_disk_usage"],
  },
  {
    id: "task_linux_drill_daily_quest_4",
    type: "leaf",
    parentId: "stage_linux_drills_daily_mini_quests",
    order: 4,
    title: "每日任務：清理 Downloads 或 drills 資料夾",
    description: "刪掉不需要的文件或整理分類。目標：保持系統乾淨。",
    energy: "low",
    duration: { min: 5, max: 10 },
    tags: ["linux", "cleanup", "habits"],
  },
  {
    id: "task_linux_drill_daily_quest_5",
    type: "leaf",
    parentId: "stage_linux_drills_daily_mini_quests",
    order: 5,
    title: "每日任務：讀 10 行 /etc/passwd 或 /etc/hosts",
    description: "隨機讀一下系統配置文件。你不需要完全懂，只要觀察格式與規律。",
    energy: "low",
    duration: { min: 3, max: 8 },
    tags: ["linux", "daily", "files"],
    prerequisites: ["task_linux_stage1_view_files"],
  },
];

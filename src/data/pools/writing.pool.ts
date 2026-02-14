import type { Task } from "../task-types";

/**
 * Writing Pool
 * ---------------------------------------------------------
 * 設計理念：
 * - 寫作不是靈感，是資產累積。
 * - 你要建立「人生素材庫」與「故事生成管線」。
 * - 任務必須短、可重複、可累積。
 *
 * 核心分類：
 * - [work] 打工仔時期
 * - [family] 家庭與親人
 * - [fuck] 黑暗時刻 / 不願回憶的往事
 * - [nomad] 離家漂泊與見聞
 *
 * 故事工程：
 * - 人物小傳（素材庫）
 * - 主角設計
 * - 劇情設計
 * - 大綱設計
 * - 草稿推進
 * - 修訂與提純
 */

export const WRITING_TASKS: Task[] = [
  // =========================================================
  // ROOT
  // =========================================================
  {
    id: "root_writing",
    type: "root",
    title: "Writing (Root)",
    description:
      "寫作主線：素材挖掘 → 人物資產 → 劇情資產 → 大綱 → 草稿推進 → 修訂打磨。",
    energy: "low",
    duration: { min: 5, max: 15 },
    tags: ["writing", "root"],
  },

  // =========================================================
  // STAGES
  // =========================================================
  {
    id: "stage_writing_memory",
    type: "stage",
    parentId: "root_writing",
    order: 1,
    title: "Stage 1 - Memory Mining (素材挖掘)",
    description: "先挖素材再寫文章：把人生拆成事件、場景、人物、對話、情緒。",
    energy: "low",
    duration: { min: 10, max: 25 },
    tags: ["writing", "memory", "stage"],
  },
  {
    id: "stage_writing_biography",
    type: "stage",
    parentId: "root_writing",
    order: 2,
    title: "Stage 2 - Character Bank (人物資產庫)",
    description: "把真實人物變成可用角色。建立人物小傳，累積日後故事素材。",
    energy: "medium",
    duration: { min: 15, max: 40 },
    tags: ["writing", "character", "stage"],
    prerequisites: ["stage_writing_memory"],
  },
  {
    id: "stage_writing_plot",
    type: "stage",
    parentId: "root_writing",
    order: 3,
    title: "Stage 3 - Plot Bank (劇情資產庫)",
    description: "設計衝突、轉折、目標、障礙。把人生與想像變成故事結構。",
    energy: "medium",
    duration: { min: 20, max: 50 },
    tags: ["writing", "plot", "stage"],
    prerequisites: ["stage_writing_biography"],
  },
  {
    id: "stage_writing_outline",
    type: "stage",
    parentId: "root_writing",
    order: 4,
    title: "Stage 4 - Outline (大綱與章節規劃)",
    description: "用時間段或章節推進方式，把劇情拆成可寫的單元。",
    energy: "high",
    duration: { min: 30, max: 80 },
    tags: ["writing", "outline", "stage"],
    prerequisites: ["stage_writing_plot"],
  },
  {
    id: "stage_writing_draft",
    type: "stage",
    parentId: "root_writing",
    order: 5,
    title: "Stage 5 - Draft Pipeline (草稿推進)",
    description: "每天推進一小段草稿，避免『等狀態好』。寫出來比寫得好重要。",
    energy: "high",
    duration: { min: 20, max: 90 },
    tags: ["writing", "draft", "stage"],
    prerequisites: ["stage_writing_outline"],
  },
  {
    id: "stage_writing_polish",
    type: "stage",
    parentId: "root_writing",
    order: 6,
    title: "Stage 6 - Rewrite & Polish (修訂與打磨)",
    description: "從草稿中提純：刪廢話、加畫面、加節奏、提主題。",
    energy: "medium",
    duration: { min: 15, max: 60 },
    tags: ["writing", "rewrite", "stage"],
    prerequisites: ["stage_writing_draft"],
  },

  // =========================================================
  // Stage 1 - Memory Mining
  // =========================================================
  {
    id: "wr_mem_001",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 1,
    title: "素材挖掘：列出 10 個人生片段（只寫標題）",
    description:
      "列 10 個你人生中可寫的片段，像『某次打工被羞辱』『某次離家』『某次在陌生城市住地下室』。不寫正文，只寫標題。",
    energy: "low",
    duration: { min: 10, max: 20 },
    tags: ["writing", "memory", "brainstorm"],
  },
  {
    id: "wr_mem_002",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 2,
    title: "素材挖掘：挑 1 個片段寫『場景清單』",
    description:
      "選一個片段，寫下：地點、天氣、聲音、氣味、燈光、人物站位（不用寫故事）。",
    energy: "low",
    duration: { min: 10, max: 25 },
    tags: ["writing", "memory", "scene"],
  },
  {
    id: "wr_mem_003",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 3,
    title: "素材挖掘：還原一段真實對話（至少 8 句）",
    description:
      "回憶一次對話，把它寫成劇本形式（A: / B:）。不用美化，越像真話越好。",
    energy: "medium",
    duration: { min: 15, max: 35 },
    tags: ["writing", "dialogue", "memory"],
  },
  {
    id: "wr_mem_004",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 4,
    title: "素材挖掘：寫一段『情緒時間線』",
    description: "選一段人生事件，寫出情緒變化：開始→惡化→爆點→麻木→餘波。",
    energy: "medium",
    duration: { min: 15, max: 30 },
    tags: ["writing", "emotion", "memory"],
  },
  {
    id: "wr_mem_005",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 5,
    title: "素材挖掘：寫『我當時不知道的真相』",
    description: "回憶某個事件，寫下：當時我以為發生什麼？多年後我才懂什麼？",
    energy: "medium",
    duration: { min: 15, max: 35 },
    tags: ["writing", "reflection", "memory"],
  },

  // =========================================================
  // Stage 2 - Character Bank
  // =========================================================
  {
    id: "wr_char_001",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 1,
    title: "人物小傳：寫一個真實人物（300~600 字）",
    description:
      "寫一個你認識的人（同事/親戚/路人）。包含：外貌、語氣、價值觀、最擅長的事、最可怕的缺點。",
    energy: "medium",
    duration: { min: 25, max: 45 },
    tags: ["writing", "character", "biography"],
    prerequisites: ["wr_mem_001"],
  },
  {
    id: "wr_char_002",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 2,
    title: "人物小傳：寫一個『你恨過的人』",
    description:
      "寫一個你曾恨過的人。重點不是罵他，而是寫出他為什麼會成為那樣的人。",
    energy: "high",
    duration: { min: 30, max: 60 },
    tags: ["writing", "character", "dark"],
    prerequisites: ["wr_mem_004"],
  },
  {
    id: "wr_char_003",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 3,
    title: "人物小傳：寫一個『你佩服的人』",
    description: "寫一個你佩服的人，並寫清楚：他做對了什麼？他付出了什麼代價？",
    energy: "medium",
    duration: { min: 20, max: 45 },
    tags: ["writing", "character", "biography"],
  },
  {
    id: "wr_char_004",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 4,
    title: "人物設計：創造一個主角（角色卡）",
    description:
      "設計一個故事主角，寫：名字/年齡/技能/缺陷/恐懼/欲望/秘密/人生目標/底線。",
    energy: "medium",
    duration: { min: 20, max: 45 },
    tags: ["writing", "character", "protagonist"],
  },
  {
    id: "wr_char_005",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 5,
    title: "人物設計：主角的『一句話哲學』",
    description:
      "為你設計的主角寫一句他的人生信條（像詛咒一樣跟著他）。再寫 3 個他會說的口頭禪。",
    energy: "low",
    duration: { min: 10, max: 20 },
    tags: ["writing", "character", "voice"],
    prerequisites: ["wr_char_004"],
  },

  // =========================================================
  // Stage 3 - Plot Bank
  // =========================================================
  {
    id: "wr_plot_001",
    type: "leaf",
    parentId: "stage_writing_plot",
    order: 1,
    title: "劇情設計：圍繞主角寫 3 個衝突",
    description:
      "寫 3 個衝突：外部衝突（敵人/環境）、人際衝突（親人/同伴）、內在衝突（欲望 vs 恐懼）。",
    energy: "medium",
    duration: { min: 20, max: 35 },
    tags: ["writing", "plot", "conflict"],
    prerequisites: ["wr_char_004"],
  },
  {
    id: "wr_plot_002",
    type: "leaf",
    parentId: "stage_writing_plot",
    order: 2,
    title: "劇情設計：寫一個『不可逆的事件』",
    description:
      "寫一個事件，發生後主角的人生再也回不去。事件必須造成永久後果。",
    energy: "high",
    duration: { min: 25, max: 50 },
    tags: ["writing", "plot", "turning-point"],
    prerequisites: ["wr_plot_001"],
  },
  {
    id: "wr_plot_003",
    type: "leaf",
    parentId: "stage_writing_plot",
    order: 3,
    title: "劇情設計：設計一個反派（或對立者）",
    description:
      "寫一個對立角色：他追求什麼？他憎恨什麼？他和主角共享什麼弱點？",
    energy: "medium",
    duration: { min: 20, max: 45 },
    tags: ["writing", "plot", "villain"],
  },
  {
    id: "wr_plot_004",
    type: "leaf",
    parentId: "stage_writing_plot",
    order: 4,
    title: "劇情設計：寫一個故事 premise（50~100 字）",
    description:
      "用 50~100 字寫一個故事核心：主角是誰？他要什麼？阻礙是什麼？代價是什麼？",
    energy: "low",
    duration: { min: 10, max: 20 },
    tags: ["writing", "plot", "premise"],
    prerequisites: ["wr_plot_001"],
  },

  // =========================================================
  // Stage 4 - Outline
  // =========================================================
  {
    id: "wr_out_001",
    type: "leaf",
    parentId: "stage_writing_outline",
    order: 1,
    title: "大綱：寫一段時間的大綱（7 天/1 月/1 年）",
    description:
      "選一個時間段，寫出主角在這段時間的變化與事件節點（用條列即可）。",
    energy: "high",
    duration: { min: 30, max: 60 },
    tags: ["writing", "outline", "timeline"],
    prerequisites: ["wr_plot_002"],
  },
  {
    id: "wr_out_002",
    type: "leaf",
    parentId: "stage_writing_outline",
    order: 2,
    title: "大綱：把故事拆成 5 個章節標題",
    description: "不寫內容，只寫 5 個章節標題。每個標題要能暗示衝突與轉折。",
    energy: "medium",
    duration: { min: 20, max: 35 },
    tags: ["writing", "outline", "structure"],
    prerequisites: ["wr_plot_004"],
  },
  {
    id: "wr_out_003",
    type: "leaf",
    parentId: "stage_writing_outline",
    order: 3,
    title: "大綱：寫三幕劇結構（Beginning / Middle / End）",
    description:
      "把故事寫成三幕：第一幕引爆事件，第二幕惡化，第三幕對決與代價。",
    energy: "high",
    duration: { min: 30, max: 70 },
    tags: ["writing", "outline", "3act"],
    prerequisites: ["wr_plot_002"],
  },

  // =========================================================
  // Stage 5 - Draft Pipeline
  // =========================================================
  {
    id: "wr_draft_001",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 1,
    title: "草稿推進：寫一篇短文（300~800 字，不限類型）",
    description: "寫一篇短文，允許粗糙。寫完不修改。目標：產出。",
    energy: "high",
    duration: { min: 25, max: 60 },
    tags: ["writing", "draft", "short"],
    prerequisites: ["wr_mem_002"],
  },
  {
    id: "wr_draft_002",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 2,
    title: "草稿推進：推進故事一段（至少 400 字）",
    description:
      "延續你正在寫的故事草稿，推進一段（400 字以上）。不要回頭修，直接往前寫。",
    energy: "high",
    duration: { min: 30, max: 80 },
    tags: ["writing", "draft", "progress"],
    prerequisites: ["wr_out_002"],
  },
  {
    id: "wr_draft_003",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 3,
    title: "草稿推進：寫一個完整場景（帶對話）",
    description:
      "寫一個場景，必須包含：環境描寫、動作、至少 6 句對話、最後一句留出鉤子。",
    energy: "high",
    duration: { min: 35, max: 90 },
    tags: ["writing", "draft", "scene"],
    prerequisites: ["wr_mem_003"],
  },

  // =========================================================
  // Stage 6 - Rewrite & Polish
  // =========================================================
  {
    id: "wr_polish_001",
    type: "leaf",
    parentId: "stage_writing_polish",
    order: 1,
    title: "修訂：刪掉 20% 廢話",
    description:
      "挑一篇你寫過的文章，刪掉 20% 的句子。重點是刪掉『解釋性廢話』，保留畫面與行動。",
    energy: "medium",
    duration: { min: 20, max: 50 },
    tags: ["writing", "rewrite", "editing"],
    prerequisites: ["wr_draft_001"],
  },
  {
    id: "wr_polish_002",
    type: "leaf",
    parentId: "stage_writing_polish",
    order: 2,
    title: "修訂：把一段文字改成『更有畫面』版本",
    description:
      "挑一段 150~300 字的草稿，改寫成更具畫面感：加動作、光線、聲音、節奏。",
    energy: "medium",
    duration: { min: 20, max: 45 },
    tags: ["writing", "rewrite", "scene"],
    prerequisites: ["wr_draft_001"],
  },
  {
    id: "wr_polish_003",
    type: "leaf",
    parentId: "stage_writing_polish",
    order: 3,
    title: "修訂：提煉主題句（故事想說什麼？）",
    description:
      "為你寫的一篇文章寫一句主題句：『這篇文章真正想說的是……』。再寫 3 句備選。",
    energy: "low",
    duration: { min: 10, max: 20 },
    tags: ["writing", "rewrite", "theme"],
    prerequisites: ["wr_draft_001"],
  },

  // =========================================================
  // Core Articles - Your 4 Main Life Themes
  // =========================================================
  {
    id: "wr_article_work",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 50,
    title: "[work] 寫一篇打工仔時期的文章（800~2000 字）",
    description:
      "寫一篇關於打工仔生活的文章。必須包含：一個具體事件、一個具體人物、一句刺痛你的話、一個你忍下去的瞬間。",
    energy: "high",
    duration: { min: 60, max: 150 },
    tags: ["writing", "work", "article", "draft"],
    prerequisites: ["wr_mem_004"],
  },
  {
    id: "wr_article_family",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 51,
    title: "[family] 寫一篇家庭/兄弟/親人的文章（800~2000 字）",
    description:
      "寫一篇家庭文章。必須包含：一段回憶、一個衝突、一個你後來才理解的瞬間。",
    energy: "high",
    duration: { min: 60, max: 150 },
    tags: ["writing", "family", "article", "draft"],
    prerequisites: ["wr_mem_005"],
  },
  {
    id: "wr_article_fuck",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 52,
    title: "[fuck] 寫一篇黑暗時刻的文章（慎重）",
    description:
      "寫一篇關於人生黑暗時刻的文章。可以隱去名字與細節。要求：必須有『你如何活下來』的段落。",
    energy: "high",
    duration: { min: 60, max: 180 },
    tags: ["writing", "fuck", "dark", "article"],
    prerequisites: ["wr_mem_004"],
  },
  {
    id: "wr_article_nomad",
    type: "leaf",
    parentId: "stage_writing_draft",
    order: 53,
    title: "[nomad] 寫一篇離家漂泊的文章（800~2000 字）",
    description:
      "寫一篇離家後的漂泊故事。必須包含：一座城市、一個陌生人、一個讓你改變的瞬間。",
    energy: "high",
    duration: { min: 60, max: 150 },
    tags: ["writing", "nomad", "article", "draft"],
    prerequisites: ["wr_mem_002"],
  },

  // =========================================================
  // Quick Short Writing (Perfect for Roulette)
  // =========================================================
  {
    id: "wr_quick_001",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 100,
    title: "快寫：5 分鐘自由寫（不停止）",
    description:
      "設計時器 5 分鐘，想到什麼寫什麼，不停筆。內容可亂、可髒、可矛盾。",
    energy: "low",
    duration: { min: 5, max: 8 },
    tags: ["writing", "quick", "freewrite"],
  },
  {
    id: "wr_quick_002",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 101,
    title: "快寫：寫 10 句『我記得……』",
    description: "連續寫 10 句以『我記得……』開頭的句子。每句都要不同場景。",
    energy: "low",
    duration: { min: 8, max: 15 },
    tags: ["writing", "memory", "quick"],
  },
  {
    id: "wr_quick_003",
    type: "leaf",
    parentId: "stage_writing_memory",
    order: 102,
    title: "快寫：寫 10 句『我恨……』或『我怕……』",
    description:
      "寫 10 句以『我恨……』或『我怕……』開頭的句子。不要修飾，越直接越好。",
    energy: "medium",
    duration: { min: 10, max: 20 },
    tags: ["writing", "emotion", "quick"],
  },
  {
    id: "wr_quick_004",
    type: "leaf",
    parentId: "stage_writing_biography",
    order: 103,
    title: "快寫：寫一個路人角色（100~200 字）",
    description: "憑空寫一個路人角色：他的衣服、口音、習慣動作、秘密。",
    energy: "low",
    duration: { min: 10, max: 20 },
    tags: ["writing", "character", "quick"],
  },
  {
    id: "wr_quick_005",
    type: "leaf",
    parentId: "stage_writing_plot",
    order: 104,
    title: "快寫：設計一個『衝突句』",
    description: "寫 5 句衝突句，例如：『他想回家，但家裡有人等著殺他。』",
    energy: "low",
    duration: { min: 8, max: 15 },
    tags: ["writing", "plot", "quick"],
  },
];

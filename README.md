# Roulette 憑天轉

## 構想

- 放入一些隨機任務，通過每日隨機，完成任務，任務帶有難度等級。
- 今日任務，隨機`Spin`，顯示任務內容 + 預估耗時，完成後改變狀態。
- 本週任務列表、完成情況。以時間線形式逐日增加記錄。
- 每日時間節點是一個卡片模式，包含隨機任務、任務完成狀態、結果在哪兒看。

### 任務規則

- 每日最多可以跳過一次。
- 或者每次最多 roll 三次，從三個任務之中選擇一個。(有陷入選擇困難的風險)

### 任務分級(能量系統)

每日根據當日狀態、選擇分級任務池，再隨機，避免某日心情低靡卻隨機到高負荷任務。

- 低能量任務（10~20 分鐘）
- 中能量任務（30~60 分鐘）
- 高能量任務（90~120 分鐘）
- 任務類型 tag（寫作/前端/Linux/學習）

### 技術棧

- React + TypeScript + Vite + Tailwind
- File System Access API 本地讀寫.json。

用戶點「打開年度文件」
選擇 2026.json
系統讀取並載入 timeline
今日抽任務 → 更新內存 state
只有在點擊「執行任務」後，將所有內容寫回 2026.json 的今日下。(始終向前插入)

任務池 Task Pool（靜態）task-pool.json
包含： id title desc tags energyLevel duration outputType（輸出是文章？代碼？筆記？）

```json
{
  "version": 1,
  "updatedAt": "2026-02-13",
  "tasks": [
    {
      "id": "task_write_001",
      "title": "写一段人物外貌描写",
      "description": "为你正在构思的角色写一段外貌描写，重点是细节和气质。",
      "energy": "low",
      "duration": {
        "min": 10,
        "max": 20
      },
      "tags": ["writing", "character"],
      "output": {
        "type": "text",
        "suggestedPath": "./writing/snippets/"
      },
      "rules": {
        "repeatable": true,
        "cooldownDays": 3
      }
    }
  ]
}
```

日誌 Log（動態，年度文件）2026.json
記錄每天：
date
energyLevel
rolledTasks（抽到的候選）
selectedTask（最終接受）
status（done/skip/abandoned）
result（成果鏈接/文件路徑/一句總結）
timestamp

UI 展示（timeline / weekly / today）
Today View（抽任務、接受、完成）
Week View（本週完成情況）
Timeline View（年度時間線）

抽 3 個 → 但提供「系統推薦」
你不是自己選，而是：
系統高亮推薦一個（比如根據你最近沒做過的類型）
你可以接受推薦
或手動換成另外兩個

成果展示
resultType: url | file | repo | note
resultValue: "https://..." or "./writing/2026-02-13.md"
summary: "写了角色卡：李无名"

```json
{
  "year": 2026,
  "days": {
    "2026-02-13": {
      "energy": "medium",
      "rolled": ["task_012", "task_044", "task_081"],
      "selected": "task_044",
      "status": "done",
      "result": {
        "type": "file",
        "value": "./writing/2026-02-13.md",
        "summary": "写了800字短篇：雪夜空佛寺"
      },
      "createdAt": "2026-02-13T11:40:00",
      "completedAt": "2026-02-13T15:50:00"
    }
  }
}
```

### 任務細分類

- work 打工仔：所有關於打工的文字。
- fimaly 王族: 關於父母、兄弟、親戚。
- fuck 黑暗道：一些不願回憶的往事。
- nomad 流浪： 記錄離家後四處亂跑遇到的人和事。

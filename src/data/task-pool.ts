import type { TaskPool } from "./task-types";

import { LINUX_TASKS } from "./pools/linux.pool";
// import { LINUX_DRILLS_TASKS } from "./pools/linux-drills.pool";
import { CS50_TASKS } from "./pools/cs50.pool";
// import { WEBDEV_TASKS } from "./pools/webdev.pool";
import { WRITING_TASKS } from "./pools/writing.pool";
import { ENGLISH_TASKS } from "./pools/english.pool";

function assertNoDuplicateIds(tasks: { id: string }[]) {
  const set = new Set<string>();
  for (const t of tasks) {
    if (set.has(t.id)) {
      throw new Error(`Duplicate task id found: ${t.id}`);
    }
    set.add(t.id);
  }
}

const mergedTasks = [
  ...LINUX_TASKS,
  // ...LINUX_DRILLS_TASKS,
  ...CS50_TASKS,
  // ...WEBDEV_TASKS,
  ...WRITING_TASKS,
  ...ENGLISH_TASKS,
];

assertNoDuplicateIds(mergedTasks);

export const TASK_POOL: TaskPool = {
  version: 3,
  updatedAt: "2026-02-14",
  tasks: mergedTasks,
};

import process from "process";
import path from "path";
import fs from "fs";

function execute() {
  if (process.argv.length < 3) {
    console.log("usage: execute task-name [task-arguments]");
    console.error("error: missing task-name");
    process.exit(1);
  }

  const taskName = process.argv[2];
  if (!taskName) {
    return;
  }

  const taskFilePath = path.resolve(
    path.join(__dirname, "tasks", `${taskName}.ts`)
  );

  if (!fs.existsSync(taskFilePath)) {
    console.log("usage: execute task-name [task-arguments]");
    console.error("error: missing task-name.ts file in current directory");
    process.exit(2);
  }

  const task = require(taskFilePath);
  const taskResult = task(
    ...process.argv.slice(3).map((argument) => {
      try {
        return JSON.parse(argument);
      } catch {
        return argument;
      }
    })
  );

  console.log("task:", taskName);
  console.log("result:", taskResult);
}

execute();

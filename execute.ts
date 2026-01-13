import child_process from "child_process";
import process from "process";
import path from "path";
import fs from "fs";

function execute() {
  console.log(process.argv);

  if (process.argv.length < 3) {
    console.log("usage: execute task-name [task-arguments]");
    console.error("error: missing task-name");
    process.exit(1);
  }

  const taskFilePath = path.resolve(
    path.join(__dirname, `${process.argv[2]!}.ts`)
  );

  if (!fs.existsSync(taskFilePath)) {
    console.log("usage: execute task-name [task-arguments]");
    console.error("error: missing task-name.ts file in current directory");
    process.exit(2);
  }

  const result = child_process.execFileSync("ts-node", [
    taskFilePath,
    ...process.argv.slice(3),
  ]);

  console.log(result.toString());
}

execute();

import chalk from "chalk";

let debugEnabled = false;

export function enableDebug() {
  debugEnabled = true;
}

export function debug(message: string, data?: any) {
  if (!debugEnabled) return;

  console.log(chalk.gray("[debug]"), message);
  if (data !== undefined) {
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
  }
}

export function isDebugEnabled(): boolean {
  return debugEnabled;
}

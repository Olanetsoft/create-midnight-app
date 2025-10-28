import { spawn } from "cross-spawn";
import path from "path";

export class PackageInstaller {
  constructor(private packageManager: "npm" | "yarn" | "pnpm") {}

  async install(projectPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn(this.packageManager, ["install"], {
        cwd: projectPath,
        stdio: "pipe",
      });

      let output = "";
      child.stdout?.on("data", (data) => {
        output += data.toString();
      });

      child.stderr?.on("data", (data) => {
        output += data.toString();
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(
              `Package installation failed with code ${code}:\n${output}`
            )
          );
        }
      });

      child.on("error", reject);
    });
  }

  async runScript(projectPath: string, script: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const args = this.packageManager === "npm" ? ["run", script] : [script];

      const child = spawn(this.packageManager, args, {
        cwd: projectPath,
        stdio: "pipe",
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Script "${script}" failed with code ${code}`));
        }
      });

      child.on("error", reject);
    });
  }

  static detectPackageManager(): "npm" | "yarn" | "pnpm" {
    if (process.env.npm_config_user_agent?.includes("yarn")) {
      return "yarn";
    }
    if (process.env.npm_config_user_agent?.includes("pnpm")) {
      return "pnpm";
    }
    return "npm";
  }
}

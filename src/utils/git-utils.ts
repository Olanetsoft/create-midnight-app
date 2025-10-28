import { spawn } from "cross-spawn";
import fs from "fs-extra";
import path from "path";

export class GitUtils {
  static async init(projectPath: string): Promise<void> {
    // Check if git is available
    const gitAvailable = await this.isGitAvailable();
    if (!gitAvailable) {
      throw new Error("Git is not available");
    }

    // Initialize git repository
    await this.runGitCommand(projectPath, ["init"]);

    // Add all files
    await this.runGitCommand(projectPath, ["add", "."]);

    // Create initial commit
    await this.runGitCommand(projectPath, [
      "commit",
      "-m",
      "Initial commit from create-midnight-app",
    ]);
  }

  private static async isGitAvailable(): Promise<boolean> {
    try {
      await this.runGitCommand(process.cwd(), ["--version"]);
      return true;
    } catch {
      return false;
    }
  }

  private static async runGitCommand(
    cwd: string,
    args: string[]
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn("git", args, {
        cwd,
        stdio: "pipe",
      });

      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Git command failed with code ${code}`));
        }
      });

      child.on("error", reject);
    });
  }
}

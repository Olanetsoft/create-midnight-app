import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export class GitCloner {
  /**
   * Clone a GitHub repository
   */
  static async clone(
    repo: string,
    targetPath: string,
    branch: string = "main"
  ): Promise<void> {
    const repoUrl = `https://github.com/${repo}.git`;

    try {
      // Check if git is available
      execSync("git --version", { stdio: "ignore" });
    } catch {
      throw new Error(
        "Git is not installed. Please install Git from https://git-scm.com"
      );
    }

    try {
      // Clone with depth 1 for faster cloning
      execSync(
        `git clone --depth 1 --branch ${branch} ${repoUrl} "${targetPath}"`,
        { stdio: "pipe" }
      );

      // Remove .git directory to make it a fresh project
      const gitDir = path.join(targetPath, ".git");
      if (fs.existsSync(gitDir)) {
        await fs.remove(gitDir);
      }
    } catch (error) {
      throw new Error(
        `Failed to clone repository ${repo}. Please check your internet connection and try again.`
      );
    }
  }

  /**
   * Check if git is available
   */
  static isGitAvailable(): boolean {
    try {
      execSync("git --version", { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }
}

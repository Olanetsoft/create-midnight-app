// This file is part of create-mn-app.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { execSync, spawn } from "child_process";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";

export class CompactUpdater {
  /**
   * Check if Compact needs updating
   */
  static needsUpdate(currentVersion: string, requiredVersion: string): boolean {
    const current = currentVersion.split(".").map(Number);
    const required = requiredVersion.split(".").map(Number);

    for (let i = 0; i < Math.max(current.length, required.length); i++) {
      const curr = current[i] || 0;
      const req = required[i] || 0;

      if (curr < req) return true;
      if (curr > req) return false;
    }

    return false;
  }

  /**
   * Get the current installed Compact version
   */
  static getCurrentVersion(): string | null {
    try {
      const versionOutput = execSync("compact compile --version", {
        encoding: "utf-8",
      }).trim();

      const versionMatch = versionOutput.match(/(\d+\.\d+\.\d+)/);
      return versionMatch ? versionMatch[1] : null;
    } catch {
      return null;
    }
  }

  /**
   * Prompt user to update Compact compiler
   */
  static async promptUpdate(
    currentVersion: string,
    requiredVersion: string
  ): Promise<boolean> {
    console.log(
      chalk.yellow(
        `\n⚠️  Your Compact compiler version ${chalk.bold(
          currentVersion
        )} is outdated.`
      )
    );
    console.log(
      chalk.yellow(
        `   This template requires version ${chalk.bold(
          requiredVersion
        )}+ to work correctly.\n`
      )
    );

    const response = await prompts({
      type: "confirm",
      name: "shouldUpdate",
      message: `Would you like to update Compact compiler now?`,
      initial: true,
    });

    return response.shouldUpdate;
  }

  /**
   * Update Compact compiler to the latest version
   */
  static async updateCompact(): Promise<boolean> {
    const spinner = ora({
      text: "Updating Compact compiler to latest version...",
      color: "cyan",
    }).start();

    return new Promise((resolve) => {
      const installScript =
        "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh";

      const updateProcess = spawn("sh", ["-c", installScript], {
        stdio: ["inherit", "pipe", "pipe"],
      });

      let hasError = false;

      updateProcess.stdout?.on("data", (data) => {
        const output = data.toString().trim();
        if (output) {
          spinner.text = `Updating Compact compiler... ${chalk.gray(
            output.slice(0, 60)
          )}`;
        }
      });

      updateProcess.stderr?.on("data", (data) => {
        const error = data.toString().trim();
        if (error && !error.includes("Downloading")) {
          hasError = true;
          spinner.fail(
            `Failed to update Compact compiler: ${chalk.red(error)}`
          );
        }
      });

      updateProcess.on("close", (code) => {
        if (code === 0 && !hasError) {
          // Verify the new version
          const newVersion = this.getCurrentVersion();
          if (newVersion) {
            spinner.succeed(
              `Compact compiler updated successfully to version ${chalk.green(
                newVersion
              )}`
            );
            resolve(true);
          } else {
            spinner.fail("Update completed but could not verify version");
            resolve(false);
          }
        } else {
          if (!hasError) {
            spinner.fail(
              `Failed to update Compact compiler (exit code: ${code})`
            );
          }
          resolve(false);
        }
      });

      updateProcess.on("error", (error) => {
        spinner.fail(`Failed to update Compact compiler: ${error.message}`);
        resolve(false);
      });
    });
  }

  /**
   * Handle Compact version mismatch with automatic update option
   */
  static async handleVersionMismatch(
    currentVersion: string,
    requiredVersion: string
  ): Promise<boolean> {
    const shouldUpdate = await this.promptUpdate(
      currentVersion,
      requiredVersion
    );

    if (!shouldUpdate) {
      console.log(
        chalk.yellow(
          `\n⚠️  Skipping update. You can update manually later with:`
        )
      );
      console.log(
        chalk.gray(
          `   curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh\n`
        )
      );
      return false;
    }

    const updateSuccess = await this.updateCompact();

    if (!updateSuccess) {
      console.log(
        chalk.red(
          `\n❌ Update failed. Please try updating manually or check your internet connection.\n`
        )
      );
      return false;
    }

    // Verify the update meets requirements
    const newVersion = this.getCurrentVersion();
    if (newVersion && !this.needsUpdate(newVersion, requiredVersion)) {
      console.log(chalk.green(`\n✓ Compact compiler is now up to date!\n`));
      return true;
    } else {
      console.log(
        chalk.yellow(
          `\n⚠️  Update completed, but version may still need manual verification.\n`
        )
      );
      return false;
    }
  }
}

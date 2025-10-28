import chalk from "chalk";
import { getTemplate } from "./templates.js";
import type { PackageManager } from "./package-manager.js";

export interface SetupStep {
  title: string;
  commands: string[];
  cwd?: string;
  optional?: boolean;
}

export class SetupGuide {
  /**
   * Get setup instructions for a template
   */
  static getInstructions(
    templateName: string,
    projectName: string,
    packageManager: PackageManager
  ): void {
    const template = getTemplate(templateName);
    if (!template || template.type !== "remote") return;

    console.log();
    console.log(chalk.blue.bold("📚 Setup Instructions\n"));

    if (templateName === "counter") {
      this.displayCounterInstructions(projectName, packageManager);
    }
    // Add other templates as they become available
  }

  /**
   * Display Counter template instructions
   */
  private static displayCounterInstructions(
    projectName: string,
    pm: PackageManager
  ): void {
    const installCmd =
      pm === "npm"
        ? "npm install"
        : pm === "yarn"
        ? "yarn"
        : pm === "pnpm"
        ? "pnpm install"
        : "bun install";
    const runCmd = pm === "npm" ? "npm run" : pm;

    console.log(chalk.white.bold("📂 Project Structure:"));
    console.log(
      chalk.gray("  contract/     - Smart contract in Compact language")
    );
    console.log(chalk.gray("  counter-cli/  - Command-line interface"));
    console.log();

    console.log(chalk.white.bold("🚀 Getting Started:\n"));

    console.log(chalk.yellow("1.") + " Navigate to your project:");
    console.log(`   ${chalk.cyan(`cd ${projectName}`)}`);
    console.log();

    console.log(chalk.yellow("2.") + " Install dependencies:");
    console.log(`   ${chalk.cyan(installCmd)}`);
    console.log();

    console.log(chalk.yellow("3.") + " Compile the smart contract:");
    console.log(`   ${chalk.cyan(`cd contract && ${runCmd} compact`)}`);
    console.log(
      chalk.gray("   (First time may download ~500MB of ZK parameters)")
    );
    console.log();

    console.log(chalk.yellow("4.") + " Build the project:");
    console.log(`   ${chalk.cyan(`${runCmd} build`)}`);
    console.log(`   ${chalk.cyan(`cd ../counter-cli && ${runCmd} build`)}`);
    console.log();

    console.log(
      chalk.yellow("5.") + " Start the proof server (in a new terminal):"
    );
    console.log(
      chalk.cyan(
        "   docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'"
      )
    );
    console.log(chalk.gray("   Keep this running!"));
    console.log();

    console.log(chalk.yellow("6.") + " Run the Counter DApp:");
    console.log(
      `   ${chalk.cyan(`cd counter-cli && ${runCmd} start-testnet-remote`)}`
    );
    console.log();

    console.log(chalk.magenta.bold("💡 Important Notes:\n"));
    console.log(
      chalk.gray(
        "  • You'll need to create a wallet and fund it from the faucet"
      )
    );
    console.log(
      chalk.gray("  • Testnet faucet: https://midnight.network/test-faucet")
    );
    console.log(chalk.gray("  • Funding takes 2-3 minutes to process"));
    console.log();

    console.log(chalk.white.bold("📖 Full Guide:"));
    console.log(
      chalk.gray(
        "  See README.md for detailed instructions and troubleshooting"
      )
    );
    console.log();
  }

  /**
   * Display post-clone message
   */
  static displayPostCloneMessage(templateName: string): void {
    const template = getTemplate(templateName);
    if (!template) return;

    console.log();
    console.log(chalk.green("✓ Successfully cloned example project!"));
    console.log();

    if (template.requiresCompactCompiler) {
      console.log(
        chalk.yellow(
          "⚠ This project requires the Compact compiler to be installed."
        )
      );
      console.log(
        chalk.gray("  Follow the setup instructions below to install it.")
      );
      console.log();
    }
  }
}

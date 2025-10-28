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

    console.log(chalk.bold("\n[" + chalk.blue("→") + "] Next Steps\n"));

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

    console.log(chalk.gray("    project structure:"));
    console.log(chalk.gray("    ├─ contract/     smart contract (compact)"));
    console.log(chalk.gray("    └─ counter-cli/  cli interface"));
    console.log();

    console.log(chalk.gray("    $ ") + chalk.cyan(`cd ${projectName}`));
    console.log(chalk.gray("    $ ") + chalk.cyan(installCmd));
    console.log(
      chalk.gray("    $ ") + chalk.cyan(`cd contract && ${runCmd} compact`)
    );
    console.log(
      chalk.gray("      (downloads ~500MB zk parameters on first run)")
    );
    console.log(chalk.gray("    $ ") + chalk.cyan(`${runCmd} build`));
    console.log(
      chalk.gray("    $ ") + chalk.cyan(`cd ../counter-cli && ${runCmd} build`)
    );
    console.log();

    console.log(chalk.bold("[" + chalk.magenta("i") + "] Proof Server\n"));
    console.log(
      chalk.gray("    $ ") +
        chalk.cyan(
          "docker run -p 6300:6300 midnightnetwork/proof-server -- 'midnight-proof-server --network testnet'"
        )
    );
    console.log(chalk.gray("      keep this terminal running"));
    console.log();

    console.log(chalk.bold("[" + chalk.green("▶") + "] Run Application\n"));
    console.log(
      chalk.gray("    $ ") +
        chalk.cyan(`cd counter-cli && ${runCmd} start-testnet-remote`)
    );
    console.log();

    console.log(chalk.bold("[" + chalk.yellow("!") + "] Important\n"));
    console.log(chalk.gray("    • create wallet and fund from faucet"));
    console.log(
      chalk.gray("    • testnet faucet: https://midnight.network/test-faucet")
    );
    console.log(chalk.gray("    • funding takes 2-3 minutes"));
    console.log(chalk.gray("    • see README.md for detailed guide"));
    console.log();
  }

  /**
   * Display post-clone message
   */
  static displayPostCloneMessage(templateName: string): void {
    const template = getTemplate(templateName);
    if (!template) return;

    console.log(chalk.bold("\n[" + chalk.green("✓") + "] Clone Complete\n"));

    if (template.requiresCompactCompiler) {
      console.log(chalk.gray("    compact compiler required"));
      console.log(chalk.gray("    follow setup instructions below"));
      console.log();
    }
  }
}

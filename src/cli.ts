import { Command } from "commander";
import chalk from "chalk";
import updateNotifier from "update-notifier";
import { createApp } from "./create-app";
import { ErrorHandler } from "./utils/error-handler";
import * as path from "path";
import * as fs from "fs";

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
);

// Check for updates
updateNotifier({ pkg, updateCheckInterval: 1000 * 60 * 60 * 24 }).notify({
  isGlobal: true,
});

const program = new Command();

// Check Node.js version before anything else (require 22+)
ErrorHandler.checkNodeVersion(22);

program
  .name("create-mn-app")
  .description("Create a new Midnight Network application")
  .version("0.3.1")
  .argument("[project-directory]", "Directory name for your project")
  .option(
    "-t, --template <name>",
    "Template to use (hello-world, counter, bboard, dex, midnight-kitties)"
  )
  .option("--use-npm", "Use npm explicitly")
  .option("--use-yarn", "Use yarn explicitly")
  .option("--use-pnpm", "Use pnpm explicitly")
  .option("--use-bun", "Use bun explicitly")
  .option("--skip-install", "Skip package installation")
  .option("--skip-git", "Skip git repository initialization")
  .option("--verbose", "Show detailed output")
  .action(async (projectDirectory, options) => {
    console.log(chalk.bold.cyan("\ncreate-mn-app") + chalk.gray(" v0.3.1\n"));

    try {
      await createApp(projectDirectory, options);
    } catch (error) {
      console.error();
      console.error(
        ErrorHandler.formatError(
          error instanceof Error ? error : new Error(String(error)),
          "creating app"
        )
      );

      if (error instanceof Error) {
        ErrorHandler.suggestSolution(error);

        if (options.verbose && error.stack) {
          console.error(chalk.gray("Stack trace:"));
          console.error(chalk.gray(error.stack));
          console.error();
        }
      }

      process.exit(1);
    }
  });

program.parse();

import { Command } from "commander";
import chalk from "chalk";
import { createApp } from "./create-app.js";
import { ErrorHandler } from "./utils/error-handler.js";

const program = new Command();

// Check Node.js version before anything else (require 22+)
ErrorHandler.checkNodeVersion(22);

program
  .name("create-midnight-app")
  .description("Create a new Midnight Network application")
  .version("0.2.0")
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
    console.log(chalk.blue.bold("🌙 Create Midnight App\n"));

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

import { Command } from "commander";
import chalk from "chalk";
import { createApp } from "./create-app";

const program = new Command();

program
  .name("create-midnight-app")
  .description("Create a new Midnight Network application")
  .version("1.0.0")
  .argument("[project-directory]", "Directory name for your project")
  .option("-t, --template <name>", "Template to use", "hello-world")
  .option("--use-npm", "Use npm instead of yarn")
  .option("--use-pnpm", "Use pnpm instead of yarn")
  .option("--skip-install", "Skip package installation")
  .option("--skip-git", "Skip git repository initialization")
  .option("--verbose", "Show detailed output")
  .action(async (projectDirectory, options) => {
    console.log(chalk.blue.bold("🌙 Create Midnight App\n"));

    try {
      await createApp(projectDirectory, options);
    } catch (error) {
      console.error(
        chalk.red("✖ Error creating app:"),
        error instanceof Error ? error.message : error
      );
      if (options.verbose && error instanceof Error) {
        console.error(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

program.parse();

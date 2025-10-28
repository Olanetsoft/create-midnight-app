import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { validateProjectName } from "./utils/validation";
import { PackageInstaller } from "./installers/package-installer";
import { TemplateManager } from "./utils/template-manager";
import { WalletGenerator } from "./installers/wallet-generator";
import { ProofServerSetup } from "./installers/proof-server-setup";
import { GitUtils } from "./utils/git-utils";

export interface CreateAppOptions {
  template: string;
  useNpm?: boolean;
  usePnpm?: boolean;
  skipInstall?: boolean;
  skipGit?: boolean;
  verbose?: boolean;
}

export async function createApp(
  projectDirectory: string | undefined,
  options: CreateAppOptions
): Promise<void> {
  let projectName = projectDirectory;

  // Interactive mode if no project name provided
  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What is your project named?",
      initial: "my-midnight-app",
      validate: (value) => {
        const validation = validateProjectName(value);
        return validation.valid || validation.problems![0];
      },
    });

    if (!response.projectName) {
      console.log(chalk.yellow("\n✖ Operation cancelled."));
      process.exit(0);
    }

    projectName = response.projectName;
  }

  const validation = validateProjectName(projectName!);
  if (!validation.valid) {
    console.error(
      chalk.red(`✖ Invalid project name: ${validation.problems![0]}`)
    );
    process.exit(1);
  }

  const projectPath = path.resolve(projectName!);

  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: `Directory ${chalk.cyan(
        projectName
      )} already exists. Overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow("✖ Operation cancelled."));
      process.exit(0);
    }

    await fs.remove(projectPath);
  }

  console.log(`Creating a new Midnight app in ${chalk.green(projectPath)}.\n`);

  // Main creation process
  await createProject(projectPath, projectName!, options);

  // Success message and instructions
  console.log();
  console.log(chalk.green.bold("━".repeat(60)));
  console.log(chalk.green.bold("🎉 Success! Your Midnight app is ready."));
  console.log(chalk.green.bold("━".repeat(60)));
  console.log();
  console.log(chalk.white.bold("📂 Project created at:"));
  console.log(`   ${chalk.cyan(projectPath)}`);
  console.log();
  console.log(chalk.white.bold("🚀 Next Steps:"));
  console.log();
  console.log(chalk.yellow("  1.") + " Navigate to your project:");
  console.log(`     ${chalk.cyan(`cd ${projectName}`)}`);
  console.log();
  console.log(chalk.yellow("  2.") + " Start the development server:");
  console.log(`     ${chalk.cyan("npm run dev")}`);
  console.log(
    chalk.gray("     (Starts proof server + watches for file changes)")
  );
  console.log();
  console.log(chalk.white.bold("📚 Available Commands:"));
  console.log();
  console.log(`  ${chalk.cyan("npm run setup")}`);
  console.log(chalk.gray("    Compile contract, build, and deploy"));
  console.log();
  console.log(`  ${chalk.cyan("npm run cli")}`);
  console.log(chalk.gray("    Interactive CLI to test your contract"));
  console.log();
  console.log(`  ${chalk.cyan("npm run compile")}`);
  console.log(chalk.gray("    Compile Compact contracts"));
  console.log();
  console.log(`  ${chalk.cyan("npm run build")}`);
  console.log(chalk.gray("    Build TypeScript to JavaScript"));
  console.log();
  console.log(chalk.green.bold("━".repeat(60)));
  console.log();
  console.log(chalk.magenta("💡 Tips:"));
  console.log(
    chalk.gray("   • Make sure Docker is running for the proof server")
  );
  console.log(
    chalk.gray("   • Check .env for your wallet seed and network config")
  );
  console.log(
    chalk.gray("   • Visit https://docs.midnight.network for documentation")
  );
  console.log();
  console.log(chalk.white("Happy coding! ") + chalk.yellow("🌙✨"));
  console.log();
}

async function createProject(
  projectPath: string,
  projectName: string,
  options: CreateAppOptions
): Promise<void> {
  const packageManager = options.usePnpm
    ? "pnpm"
    : options.useNpm
    ? "npm"
    : "yarn";

  // Create project directory
  await fs.ensureDir(projectPath);
  process.chdir(projectPath);

  // Initialize template
  const templateSpinner = ora("Creating project structure...").start();
  try {
    const templateManager = new TemplateManager(options.template);
    await templateManager.scaffold(projectPath, projectName);
    templateSpinner.succeed("Project structure created");
  } catch (error) {
    templateSpinner.fail("Failed to create project structure");
    throw error;
  }

  // Generate wallet
  const walletSpinner = ora("Generating secure wallet...").start();
  try {
    const walletGenerator = new WalletGenerator();
    const walletSeed = await walletGenerator.generate(projectPath);
    walletSpinner.succeed(
      `Wallet generated (seed: ${walletSeed.substring(0, 8)}...)`
    );
  } catch (error) {
    walletSpinner.fail("Failed to generate wallet");
    throw error;
  }

  // Install dependencies
  if (!options.skipInstall) {
    const installSpinner = ora(
      `Installing dependencies with ${packageManager}...`
    ).start();
    try {
      const installer = new PackageInstaller(packageManager);
      await installer.install(projectPath);
      installSpinner.succeed("Dependencies installed");
    } catch (error) {
      installSpinner.fail("Failed to install dependencies");
      console.log(
        chalk.yellow("\n⚠ You can install dependencies manually by running:")
      );
      console.log(chalk.cyan(`  ${packageManager} install`));
    }
  }

  // Initialize git
  if (!options.skipGit) {
    const gitSpinner = ora("Initializing git repository...").start();
    try {
      await GitUtils.init(projectPath);
      gitSpinner.succeed("Git repository initialized");
    } catch (error) {
      gitSpinner.warn("Git repository initialization skipped");
    }
  }

  // Check Docker for proof server
  const proofSpinner = ora("Checking Docker for proof server...").start();
  try {
    const proofSetup = new ProofServerSetup();
    const isAvailable = await proofSetup.verify();
    if (isAvailable) {
      proofSpinner.succeed("Docker is ready for proof server");
    } else {
      proofSpinner.warn(
        "Docker not available - install it to use proof server"
      );
    }
  } catch (error) {
    proofSpinner.warn(
      "Docker check failed - install Docker to use proof server"
    );
  }

  // Compile initial contract
  if (!options.skipInstall) {
    const compileSpinner = ora("Compiling initial contract...").start();
    try {
      const installer = new PackageInstaller(packageManager);
      await installer.runScript(projectPath, "compile");
      compileSpinner.succeed("Contract compiled successfully");
    } catch (error) {
      compileSpinner.warn(
        'Contract compilation skipped - run "npm run compile" manually'
      );
    }
  }
}

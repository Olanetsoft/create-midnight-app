import { execSync } from "child_process";
import chalk from "chalk";

export interface RequirementCheck {
  name: string;
  required: boolean;
  found: boolean;
  version?: string;
  installUrl?: string;
  installCommand?: string;
}

export class RequirementChecker {
  /**
   * Check Node.js version
   */
  static checkNodeVersion(minVersion: number): RequirementCheck {
    const version = process.version;
    const major = parseInt(version.slice(1).split(".")[0]);

    return {
      name: "Node.js",
      required: true,
      found: major >= minVersion,
      version: version,
      installUrl: "https://nodejs.org/",
    };
  }

  /**
   * Check Docker availability
   */
  static checkDocker(): RequirementCheck {
    try {
      const version = execSync("docker --version", {
        encoding: "utf-8",
      }).trim();
      return {
        name: "Docker",
        required: true,
        found: true,
        version: version.split(" ")[2]?.replace(",", ""),
        installUrl: "https://docs.docker.com/desktop/",
      };
    } catch {
      return {
        name: "Docker",
        required: true,
        found: false,
        installUrl: "https://docs.docker.com/desktop/",
      };
    }
  }

  /**
   * Check Compact compiler availability
   */
  static checkCompactCompiler(): RequirementCheck {
    try {
      const version = execSync("compact compile --version", {
        encoding: "utf-8",
      }).trim();
      return {
        name: "Compact Compiler",
        required: true,
        found: true,
        version: version,
        installCommand:
          "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh",
      };
    } catch {
      return {
        name: "Compact Compiler",
        required: true,
        found: false,
        installCommand:
          "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh",
      };
    }
  }

  /**
   * Display requirement check results
   */
  static displayResults(checks: RequirementCheck[]): boolean {
    console.log(chalk.blue.bold("\n🔍 Checking Requirements\n"));

    let allPassed = true;

    for (const check of checks) {
      if (check.found) {
        console.log(
          `${chalk.green("✓")} ${check.name} ${
            check.version ? chalk.gray(`(${check.version})`) : ""
          }`
        );
      } else {
        allPassed = false;
        console.log(
          `${chalk.red("✗")} ${check.name} ${chalk.red("not found")}`
        );
      }
    }

    if (!allPassed) {
      console.log();
      console.log(chalk.yellow.bold("⚠ Missing Requirements:\n"));

      for (const check of checks.filter((c) => !c.found)) {
        console.log(chalk.white(`${check.name}:`));
        if (check.installCommand) {
          console.log(chalk.gray(`  Install: ${check.installCommand}`));
        }
        if (check.installUrl) {
          console.log(chalk.gray(`  Visit: ${check.installUrl}`));
        }
        console.log();
      }
    } else {
      console.log(chalk.green("\n✓ All requirements met!\n"));
    }

    return allPassed;
  }
}

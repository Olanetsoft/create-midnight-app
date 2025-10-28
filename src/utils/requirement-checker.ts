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
    console.log(chalk.bold("[" + chalk.cyan("✓") + "] Requirements Check\n"));

    let allPassed = true;

    for (const check of checks) {
      const name = check.name.toLowerCase().padEnd(16);
      if (check.found) {
        const version = check.version ? chalk.gray(`${check.version}`) : "";
        const status = chalk.green("[installed]");
        console.log(`    ${chalk.gray(name)} ${version} ${status}`);
      } else {
        allPassed = false;
        const status = chalk.red("[missing]");
        console.log(`    ${chalk.gray(name)} ${status}`);
      }
    }

    if (!allPassed) {
      console.log();
      console.log(
        chalk.bold("[" + chalk.yellow("!") + "] Missing Dependencies\n")
      );

      for (const check of checks.filter((c) => !c.found)) {
        console.log(chalk.white(`    ${check.name}:`));
        if (check.installCommand) {
          console.log(chalk.gray(`    $ ${check.installCommand}`));
        }
        if (check.installUrl) {
          console.log(chalk.gray(`    → ${check.installUrl}`));
        }
        console.log();
      }
    } else {
      console.log(chalk.gray("\n    all dependencies satisfied\n"));
    }

    return allPassed;
  }
}

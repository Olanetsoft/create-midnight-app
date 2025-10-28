import { spawn } from "cross-spawn";

export class ProofServerSetup {
  async verify(): Promise<boolean> {
    try {
      // Check if Docker is available
      const dockerAvailable = await this.isDockerAvailable();
      if (!dockerAvailable) {
        return false;
      }

      // Check if proof server image is available
      return await this.isProofServerImageAvailable();
    } catch {
      return false;
    }
  }

  private async isDockerAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const child = spawn("docker", ["--version"], {
        stdio: "pipe",
      });

      child.on("close", (code) => {
        resolve(code === 0);
      });

      child.on("error", () => {
        resolve(false);
      });
    });
  }

  private async isProofServerImageAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const child = spawn(
        "docker",
        ["images", "midnightnetwork/proof-server"],
        {
          stdio: "pipe",
        }
      );

      let output = "";
      child.stdout?.on("data", (data) => {
        output += data.toString();
      });

      child.on("close", (code) => {
        // Check if image exists in output
        const hasImage = output.includes("midnightnetwork/proof-server");
        resolve(code === 0 && hasImage);
      });

      child.on("error", () => {
        resolve(false);
      });
    });
  }
}

import fs from "fs";
import path from "path";
import { NetworkConfig } from "../providers/midnight-providers.js";

export class EnvironmentManager {
  static getNetworkConfig(): NetworkConfig {
    const network = process.env.MIDNIGHT_NETWORK || "testnet";

    const networks = {
      testnet: {
        indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
        indexerWS:
          "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
        node: "https://rpc.testnet-02.midnight.network",
        proofServer: process.env.PROOF_SERVER_URL || "http://127.0.0.1:6300",
        name: "Testnet",
      },
    };

    return networks[network as keyof typeof networks] || networks.testnet;
  }

  static validateEnvironment(): void {
    const required = ["WALLET_SEED"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`
      );
    }

    const walletSeed = process.env.WALLET_SEED!;
    if (!/^[a-fA-F0-9]{64}$/.test(walletSeed)) {
      throw new Error("WALLET_SEED must be a 64-character hexadecimal string");
    }
  }

  static checkContractCompiled(contractName: string): boolean {
    const contractPath = path.join(
      process.cwd(),
      "contracts",
      "managed",
      contractName
    );
    const keysPath = path.join(contractPath, "keys");
    const contractModulePath = path.join(contractPath, "contract", "index.cjs");

    return fs.existsSync(keysPath) && fs.existsSync(contractModulePath);
  }
}

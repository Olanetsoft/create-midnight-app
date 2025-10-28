import path from "path";
import fs from "fs-extra";
import crypto from "crypto";

export class WalletGenerator {
  async generate(projectPath: string): Promise<string> {
    // Generate 32 random bytes and convert to hex string
    const bytes = crypto.randomBytes(32);
    const walletSeed = bytes.toString("hex");

    // Create .env file
    const envPath = path.join(projectPath, ".env");
    const envContent = `# Midnight Network Configuration
# Generated on ${new Date().toISOString()}

# Network Configuration
MIDNIGHT_NETWORK=testnet
PROOF_SERVER_URL=http://127.0.0.1:6300

# Wallet Configuration (KEEP PRIVATE!)
WALLET_SEED=${walletSeed}

# Contract Configuration
CONTRACT_NAME=hello-world

# Development Settings
DEBUG_LEVEL=info
AUTO_START_PROOF_SERVER=true

# Security Warning:
# Keep your wallet seed private and secure!
# Never commit this file to version control.
# Add .env to your .gitignore file.
`;

    await fs.writeFile(envPath, envContent);

    // Also create .env.example for reference
    const envExamplePath = path.join(projectPath, ".env.example");
    const envExampleContent = `# Midnight Network Configuration
# Copy this file to .env and fill in your values

# Network Configuration
MIDNIGHT_NETWORK=testnet
PROOF_SERVER_URL=http://127.0.0.1:6300

# Wallet Configuration (KEEP PRIVATE!)
WALLET_SEED=your_64_character_wallet_seed_here

# Contract Configuration
CONTRACT_NAME=hello-world

# Development Settings
DEBUG_LEVEL=info
AUTO_START_PROOF_SERVER=true
`;

    await fs.writeFile(envExamplePath, envExampleContent);

    return walletSeed;
  }
}

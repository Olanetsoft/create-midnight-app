import fs from "fs-extra";
import path from "path";
import { createApp } from "./create-app";

async function testCreateApp() {
  console.log("🧪 Testing create-mn-app...\n");

  const testDir = path.join(process.cwd(), "test-app");

  // Clean up any existing test
  if (fs.existsSync(testDir)) {
    await fs.remove(testDir);
  }

  try {
    await createApp("test-app", {
      template: "hello-world",
      useNpm: true,
      skipInstall: false,
      skipGit: true,
      verbose: true,
    });

    console.log("\n✅ Test completed successfully!");

    // Verify structure
    const requiredFiles = [
      "package.json",
      "tsconfig.json",
      ".env",
      ".env.example",
      ".gitignore",
      "README.md",
      "contracts/hello-world.compact",
      "src/deploy.ts",
      "src/cli.ts",
      "src/providers/midnight-providers.ts",
      "src/utils/environment.ts",
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(testDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file: ${file}`);
      }
    }

    console.log("✅ All required files present");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testCreateApp();

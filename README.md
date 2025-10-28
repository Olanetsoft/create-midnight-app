# create-mn-app 🌙

Create Midnight Network applications with zero configuration.

[![npm version](https://img.shields.io/npm/v/create-mn-app.svg)](https://www.npmjs.com/package/create-mn-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash
npx create-mn-app my-app
cd my-app
npm run setup
```

## ✨ Features

- 🎯 **Interactive Setup** - Guided project creation with template selection
- 📦 **Smart Package Manager** - Auto-detects your preferred package manager (npm/yarn/pnpm/bun)
- 🏥 **Health Checks** - Verify your environment is ready before development
- ⚡ **Zero Configuration** - Works out of the box with sensible defaults
- 🔧 **Modern Tooling** - TypeScript, hot reloading, auto-compilation
- 🛡️ **Best Practices** - Secure wallet generation, proper project structure
- 🚀 **Fast Setup** - From zero to working app in 60 seconds
- � **Helpful Errors** - Clear error messages with actionable solutions
- 📦 **ES Modules** - Modern JavaScript module system
- 🐳 **Docker Integration** - Automated proof server setup

## 🚀 Quick Start

### Interactive Mode (Recommended)

```bash
npx create-mn-app
```

You'll be prompted to:

1. **Enter your project name** - Choose a descriptive name for your app
2. **Select a template** - Pick from available templates or see what's coming soon
3. **Choose configuration** - Package manager, git, and other options

### Command Line Mode

```bash
# Create with defaults
npx create-mn-app my-midnight-app

# Create with specific template
npx create-mn-app my-app --template hello-world

# Use specific package manager
npx create-mn-app my-app --use-pnpm

# Navigate and setup
cd my-app
npm run setup
```

## What's Included?

Your generated project includes:

- 📝 **Hello World Contract** - A simple Compact contract to get started
- 🔐 **Wallet Setup** - Auto-generated wallet with secure seed phrase
- 🛠️ **Development Environment** - Pre-configured TypeScript, nodemon, and build tools
- 📚 **Provider Setup** - Midnight network providers (indexer, proof, state, ZK config)
- 🎨 **Interactive CLI** - Test your contracts with a user-friendly command-line interface
- 📋 **Environment Config** - `.env` file with network configuration
- 🔄 **Git Ready** - Initialized git repository with proper `.gitignore`

## 📚 Available Commands

Once your project is created, you can run:

### `npm run setup`

Complete setup pipeline:

1. Compiles Compact contracts
2. Builds TypeScript to JavaScript
3. Deploys contracts to the network

### `npm run health-check`

🏥 Verify your development environment:

- ✓ Node.js version (18+)
- ✓ Docker availability
- ✓ Environment configuration
- ✓ Wallet setup
- ✓ Dependencies installed
- ✓ Project built correctly

Run this command before development to catch issues early!

### `npm run cli`

Opens an interactive command-line interface to:

- Connect your wallet
- Store messages in the contract
- Retrieve stored messages
- Test contract functionality

### `npm run check-balance`

Checks your wallet balance. Useful for verifying if test tokens from the faucet have arrived before deploying.

### `npm run compile`

Compiles your Compact smart contracts from `contracts/` to `contracts/managed/`

### `npm run build`

Builds your TypeScript source code to JavaScript in the `dist/` directory

### `npm run deploy`

Deploys your compiled contract to the Midnight testnet

## Project Structure

```
my-midnight-app/
├── contracts/
│   ├── hello-world.compact       # Your Compact smart contract
│   └── managed/                  # Compiled contract output
├── src/
│   ├── cli.ts                    # Interactive CLI application
│   ├── deploy.ts                 # Contract deployment script
│   ├── providers/
│   │   └── midnight-providers.ts # Network provider configuration
│   └── utils/
│       └── environment.ts        # Environment management
├── .env                          # Environment variables & wallet seed
├── .gitignore
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 🎨 Templates

Choose from various templates to kickstart your Midnight project:

### ✅ Available Now

#### **Hello World** (Default)

A simple message storage contract demonstrating:

- State management
- Public and private data
- Contract deployment
- Interactive testing

```bash
npx create-mn-app my-app --template hello-world
```

#### **Counter DApp**

Real-world example from midnightntwrk demonstrating:

- Increment/decrement state management
- Zero-knowledge proofs on testnet
- Compact compiler integration
- Full CLI interface

```bash
npx create-mn-app my-counter --template counter
```

_Automatically cloned from [midnightntwrk/example-counter](https://github.com/midnightntwrk/example-counter)_

**Requirements:** Node.js 22+, Docker, Compact compiler

### 🔜 Coming Soon

#### **Bulletin Board (Bboard)**

Bulletin board with multi-user interactions and privacy patterns

#### **Decentralized Exchange (DEX)**

Decentralized exchange using OpenZeppelin FungibleToken

#### **Midnight Kitties**

Full stack DApp using NFT smart contract library (Crypto Kitties on Midnight)

_These templates are under development. Star the repo to stay updated!_

## ⚙️ Requirements

- **Node.js** 22.0.0 or higher (required for all templates)
- **Docker** (for running the proof server)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Compact Compiler** (required for Counter and future templates - CLI will guide installation)

> **Note:** The CLI automatically checks Node.js version on startup and will guide you if an upgrade is needed.

## 📦 Package Manager Options

The CLI automatically detects your preferred package manager! It checks:

1. Lock files in your directory (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb)
2. Environment variables set by your package manager
3. Available package managers on your system

You can also explicitly specify:

```bash
# npm
npx create-mn-app my-app --use-npm

# Yarn
npx create-mn-app my-app --use-yarn

# pnpm
npx create-mn-app my-app --use-pnpm

# Bun
npx create-mn-app my-app --use-bun
```

All commands in the success message will use your chosen package manager! 🎉

## ⚙️ CLI Options

```bash
npx create-mn-app [project-name] [options]

Arguments:
  project-name              Name of your project (interactive prompt if omitted)

Options:
  -t, --template <name>     Template to use (hello-world, counter, bboard, dex, midnight-kitties)
  --use-npm                 Use npm as package manager
  --use-yarn                Use Yarn as package manager
  --use-pnpm                Use pnpm as package manager
  --use-bun                 Use bun as package manager
  --skip-install            Skip dependency installation
  --skip-git                Skip git initialization
  --verbose                 Show detailed output including stack traces
  -h, --help                Display help information
  -V, --version             Display version number
```

### Examples

```bash
# Interactive mode (recommended)
npx create-mn-app

# With project name
npx create-mn-app my-midnight-dapp

# Specific template and package manager
npx create-mn-app my-dex --template dex --use-pnpm

# Skip installation (for CI/CD)
npx create-mn-app my-app --skip-install --skip-git

# Verbose output for debugging
npx create-mn-app my-app --verbose
```

## Environment Configuration

Your `.env` file contains important configuration:

```env
# Wallet Configuration
WALLET_SEED=your-generated-seed-phrase

# Network Configuration
MIDNIGHT_NETWORK=testnet
INDEXER_URL=https://indexer.testnet.midnight.network
INDEXER_WS_URL=wss://indexer.testnet.midnight.network
PROOF_SERVER_URL=http://localhost:6300
```

⚠️ **Important**: Never commit your `.env` file or share your wallet seed phrase!

## 🔧 Troubleshooting

### Node.js version error

If you see "Node.js Version Error":

```bash
# Check your version
node --version

# Install Node.js 22+ from https://nodejs.org
# Or use nvm:
nvm install 22
nvm use 22
```

The CLI automatically checks for Node.js 22+ before running!

### Environment issues

Run the health check to diagnose problems:

```bash
cd my-app
npm run health-check
```

This will show you exactly what needs to be fixed. ✨

### Waiting for faucet funds

If your deployment is waiting for funds from the testnet faucet:

```bash
# Option 1: Let the script wait (it will auto-detect funds)
# Just leave it running after requesting from the faucet

# Option 2: Stop and check manually
# Press Ctrl+C to stop, then:
npm run check-balance

# Once funded, deploy:
npm run deploy
```

💡 **Note**: Faucet transactions typically take 2-5 minutes to process.

### Port 6300 already in use

If you see "Bind for 0.0.0.0:6300 failed: port is already allocated":

```bash
# Stop the existing proof server
docker ps
docker stop <container-id>

# Or run on a different port (update .env accordingly)
```

### Module resolution errors

Make sure you're using Node.js 18+ and the project was created with the latest version:

```bash
node --version
npx create-mn-app@latest my-app
```

### Docker not running

Ensure Docker Desktop is running before starting the development server:

```bash
docker --version

# If not installed, get it from:
# https://docker.com
```

### Permission errors

If you encounter EACCES errors:

```bash
# Fix npm permissions (recommended)
# See: https://docs.npmjs.com/resolving-eacces-permissions-errors

# Or use a version manager like nvm (better solution)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

## Learn More

- 📖 [Midnight Documentation](https://docs.midnight.network)
- 🚀 [Getting Started Guide](https://docs.midnight.network/getting-started)
- 💬 [Midnight Discord Community](https://discord.gg/midnight)
- 🐙 [GitHub Repository](https://github.com/Olanetsoft/create-mn-app)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Olanetsoft](https://github.com/Olanetsoft)

---

Built with ❤️ for the Midnight Network community 🌙✨

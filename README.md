# create-mn-app 🌙

Create Midnight Network applications with zero configuration.

[![npm version](https://img.shields.io/npm/v/create-mn-app.svg)](https://www.npmjs.com/package/create-mn-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash
npx create-mn-app my-app
cd my-app
npm run dev
```

## Features

- ⚡ **Zero configuration** - Works out of the box with sensible defaults
- 🔧 **Modern tooling** - TypeScript, hot reloading, auto-compilation
- 🛡️ **Best practices** - Secure wallet generation, proper project structure
- 🚀 **Fast setup** - From zero to working app in 60 seconds
- 🎯 **Developer friendly** - Clear error messages, helpful guides
- 📦 **ES Modules** - Modern JavaScript module system
- 🐳 **Docker integration** - Automated proof server setup

## Quick Start

```bash
# Create a new Midnight app
npx create-mn-app my-midnight-app

# Navigate to your project
cd my-midnight-app

# Start development server with hot reloading
npm run dev
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

## Available Commands

Once your project is created, you can run:

### `npm run dev`

Starts the development server with:

- Docker-based proof server on port 6300
- File watcher for automatic recompilation
- Hot reloading for contract changes

### `npm run setup`

Complete setup pipeline:

1. Compiles Compact contracts
2. Builds TypeScript to JavaScript
3. Deploys contracts to the network

### `npm run cli`

Opens an interactive command-line interface to:

- Connect your wallet
- Store messages in the contract
- Retrieve stored messages
- Test contract functionality

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

## Templates

### Hello World (Default)

A simple message storage contract demonstrating:

- State management
- Public and private data
- Contract deployment
- Interactive testing

**More templates coming soon!**

## Requirements

- **Node.js** 18.0.0 or higher
- **Docker** (for running the proof server)
- **npm**, **yarn**, or **pnpm** package manager

## Package Manager Options

You can use your preferred package manager:

```bash
# npm (default)
npx create-mn-app my-app

# Yarn
npx create-mn-app my-app --yarn

# pnpm
npx create-mn-app my-app --pnpm
```

## Usage Options

```bash
npx create-mn-app [project-name] [options]

Options:
  --template <name>    Specify a template (default: hello-world)
  --yarn              Use Yarn as package manager
  --pnpm              Use pnpm as package manager
  --npm               Use npm as package manager
  --skip-install      Skip dependency installation
  --skip-git          Skip git initialization
  -h, --help          Display help information
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

## Troubleshooting

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
```

## Learn More

- 📖 [Midnight Documentation](https://docs.midnight.network)
- 🚀 [Getting Started Guide](https://docs.midnight.network/getting-started)
- 💬 [Midnight Discord Community](https://discord.gg/midnight)
- 🐙 [GitHub Repository](https://github.com/Olanetsoft/create-midnight-app)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Olanetsoft](https://github.com/Olanetsoft)

---

Built with ❤️ for the Midnight Network community 🌙✨

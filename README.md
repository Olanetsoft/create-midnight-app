# create-mn-app

Scaffold Midnight Network applications.

[![npm version](https://img.shields.io/npm/v/create-mn-app.svg)](https://www.npmjs.com/package/create-mn-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash
npx create-mn-app my-app
cd my-app
npm run setup
```

## Features

- Interactive project setup with template selection
- Auto-detects package manager (npm/yarn/pnpm/bun)
- Environment health checks
- TypeScript with hot reloading
- Pre-configured Compact contracts
- Secure wallet generation

## Quick Start

### Interactive Mode

```bash
npx create-mn-app
```

### CLI Mode

```bash
npx create-mn-app my-app --template hello-world
cd my-app
npm run setup
```

## Templates

### Hello World (Default)

Basic message storage contract demonstrating state management and deployment.

```bash
npx create-mn-app my-app
```

### Counter DApp

Real-world example from midnightntwrk with increment/decrement state and zkProofs.

```bash
npx create-mn-app my-app --template counter
```

Cloned from [midnightntwrk/example-counter](https://github.com/midnightntwrk/example-counter). Requires Node.js 22+, Docker, and Compact compiler.

After creation:

```bash
cd my-app
npm install
# Follow setup instructions displayed
```

### Coming Soon

- Bulletin Board - Multi-user interactions with privacy patterns
- DEX - Decentralized exchange using FungibleToken
- Midnight Kitties - NFT-based full stack DApp

## Requirements

- Node.js 22+
- Docker (for proof server)
- npm/yarn/pnpm/bun
- Compact Compiler (for Counter template - auto-guided installation)

## CLI Options

```bash
npx create-mn-app [project-name] [options]

Options:
  -t, --template <name>     Template: hello-world, counter
  --use-npm                 Use npm
  --use-yarn                Use Yarn
  --use-pnpm                Use pnpm
  --use-bun                 Use bun
  --skip-install            Skip dependency installation
  --skip-git                Skip git initialization
  --verbose                 Show detailed output
  -h, --help                Help
  -V, --version             Version
```

## Project Structure

```
my-app/
├── contracts/
│   ├── hello-world.compact
│   └── managed/
├── src/
│   ├── cli.ts
│   ├── deploy.ts
│   ├── providers/
│   └── utils/
├── .env
├── package.json
└── tsconfig.json
```

## Troubleshooting

### Node.js version error

```bash
node --version  # Check version
nvm install 22 && nvm use 22  # Install Node.js 22+
```

### Port 6300 in use

```bash
docker ps
docker stop <container-id>
```

### Waiting for faucet funds

Testnet faucet typically takes 2-5 minutes. The deploy script will auto-detect when funds arrive.

## Links

- [Midnight Docs](https://docs.midnight.network)
- [Discord Community](https://discord.com/invite/midnightnetwork)
- [GitHub](https://github.com/midnightntwrk/create-mn-app)

## License

MIT ©

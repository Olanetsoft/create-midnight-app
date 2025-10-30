# create-mn-app

Scaffold Midnight Network applications.

[![npm version](https://img.shields.io/npm/v/create-mn-app.svg)](https://www.npmjs.com/package/create-mn-app)
[![npm downloads](https://img.shields.io/npm/dw/create-mn-app.svg)](https://www.npmjs.com/package/create-mn-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/node/v/create-mn-app.svg)](https://nodejs.org/)

## Installation

**Recommended (no install needed):**

```bash
npx create-mn-app my-app
cd my-app
npm run setup
```

**Or install globally:**

```bash
npm i -g create-mn-app
create-mn-app my-app
```

> Using `npx` is recommended - it always runs the latest version without needing updates.

## Why create-mn-app?

- **Zero Configuration**: Start building immediately without complex setup
- **Best Practices**: Pre-configured TypeScript, hot reloading, and project structure
- **Production Ready**: Includes wallet generation, environment management, and deployment scripts
- **Developer Experience**: Interactive prompts, health checks, and helpful error messages
- **Stay Updated**: Built-in update notifier keeps you on the latest version

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

Real-world example with increment/decrement state and zkProofs.

```bash
npx create-mn-app my-app --template counter
```

Cloned from [Midnight Network's example-counter](https://github.com/midnightntwrk/example-counter). Requires Node.js 22+, Docker, and Compact compiler.

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Links

- [Midnight Docs](https://docs.midnight.network)
- [Discord Community](https://discord.com/invite/midnightnetwork)
- [GitHub](https://github.com/Olanetsoft/create-mn-app)

## License

MIT ©

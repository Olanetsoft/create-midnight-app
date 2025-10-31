# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.4] - 2025-10-31

### Added

- Apache 2.0 LICENSE file for open source compliance
- SECURITY.md with vulnerability reporting process
- CONTRIBUTING.md with comprehensive contribution guidelines
- CODE_OF_CONDUCT.md based on Contributor Covenant 1.4
- CHANGELOG.md following Keep a Changelog format
- Issue templates for bug reports, feature requests, and documentation
- Pull request template for standardized PR process
- SPDX license headers to all source files
- Enhanced README badges (npm version, downloads, license, Node.js)
- Expanded npm keywords for better discoverability

### Changed

- Updated README with improved installation section
- Enhanced README with "Why create-mn-app" section
- Fixed README Project Structure to show tool structure
- Improved CI/CD workflows to use Node.js 22.x consistently
- Removed strikethrough formatting from coming soon templates

### Removed

- Troubleshooting section from README for conciseness

## [0.3.3] - 2025-10-30

### Fixed

- Repository URLs corrected to Olanetsoft/create-mn-app
- Discord invite link updated to official Midnight Network
- Package metadata consistency across all files

## [0.3.2] - 2025-10-30

### Reverted

- Repository transfer from midnightntwrk back to Olanetsoft due to permissions

## [0.3.1] - 2025-10-30

### Changed

- Attempted repository migration to midnightntwrk organization

## [0.3.0] - 2025-10-30

### Added

- Update notifier with daily version checks
- Typo suggestions using fuzzy matching (Levenshtein distance)
- Debug mode with `--verbose` flag for troubleshooting
- Enhanced error messages with command suggestions

### Changed

- Improved error handling throughout the application
- Better user feedback for invalid template names

## [0.2.4] - 2025-10-29

### Changed

- Refined README for conciseness and clarity
- Updated branding and terminology consistency

## [0.2.3] - 2025-10-29

### Fixed

- Terminal output formatting improvements
- Color coding consistency across all messages

## [0.2.2] - 2025-10-29

### Changed

- Enhanced git-style output with technical brackets
- Improved status indicators and visual hierarchy

## [0.2.1] - 2025-10-29

### Added

- Git-style CLI output with color coding
- Technical bracket formatting for command output
- Developer-focused terminal aesthetics

### Changed

- Modernized all output messages
- Updated CLI header with git-style format
- Redesigned requirement checker display
- Refactored setup guide with arrows and command format

## [0.2.0] - 2025-10-28

### Added

- Node.js 22+ requirement enforcement across all templates
- Hybrid template system (bundled + remote)
- Hello World template (bundled in package)
- Counter template (remote from GitHub)
- Template placeholders for BBoard, DEX, Midnight Kitties

### Changed

- Unified Node.js version requirement to 22+ everywhere
- Improved template selection interface
- Enhanced template deployment logic

## [0.1.0] - 2025-10-27

### Added

- Interactive CLI prompts for project configuration
- Automatic package manager detection (npm/yarn/pnpm/bun)
- System requirements health check
- Enhanced error handling with clear messages
- Template scaffolding system
- Git repository initialization
- Dependency installation automation

### Changed

- Improved user experience with guided setup
- Better error messages and recovery suggestions
- Streamlined project creation workflow

## [0.0.6] - 2025-10-26

### Added

- Initial release of create-mn-app
- Basic CLI scaffolding functionality
- TypeScript support with CommonJS modules
- Commander.js for CLI argument parsing
- Chalk for terminal styling
- Basic project structure generation

### Changed

- Project setup and configuration

[Unreleased]: https://github.com/Olanetsoft/create-mn-app/compare/v0.3.4...HEAD
[0.3.4]: https://github.com/Olanetsoft/create-mn-app/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/Olanetsoft/create-mn-app/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/Olanetsoft/create-mn-app/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/Olanetsoft/create-mn-app/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Olanetsoft/create-mn-app/compare/v0.2.4...v0.3.0
[0.2.4]: https://github.com/Olanetsoft/create-mn-app/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/Olanetsoft/create-mn-app/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/Olanetsoft/create-mn-app/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/Olanetsoft/create-mn-app/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/Olanetsoft/create-mn-app/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Olanetsoft/create-mn-app/compare/v0.0.6...v0.1.0
[0.0.6]: https://github.com/Olanetsoft/create-mn-app/releases/tag/v0.0.6

# ConfigArc Launcher

Visual configuration manager and launcher for arcade titles. Built with Tauri (Rust backend) and React + TypeScript (Vite) frontend.

## Features

- **Visual Configuration Editor**: Edit configuration files with a user-friendly interface.
- **Profile Management**: Create and switch between different configuration profiles for various games or environments.
- **Game Launcher**: Launch games directly from the application with your selected profile settings.
- **Modern UI**: Built with React and styled for a clean, modern experience.
- **Internationalization**: Support for English and Chinese (Simplified).

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Rust, Tauri
- **State Management**: React Hooks / Context
- **Styling**: CSS

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI](https://v2.tauri.app/start/prerequisites/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Gl0w1amp/ConfigArcLauncher.git
    cd ConfigArcLauncher
    ```

2.  Install frontend dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server and the Tauri application:

```bash
npm run tauri dev
```

This command starts the Vite dev server and opens the Tauri window. You can edit configs, manage profiles, and launch games in this mode.

### Build

To build the application for production:

```bash
npm run tauri build
```

The executable will be located in `src-tauri/target/release/`.

## Project Structure

- `src/`: Frontend React source code.
    - `api/`: API integration with Tauri backend.
    - `components/`: Reusable UI components.
    - `context/`: React Context providers.
    - `routes/`: Application pages/routes.
    - `state/`: State management hooks.
    - `types/`: TypeScript type definitions.
    - `locales/`: i18n translation files.
- `src-tauri/`: Rust backend source code.
    - `src/config/`: Configuration file handling logic.
    - `src/games/`: Game launching and management logic.

## Disclaimer

This software is a utility tool intended for legitimate arcade hardware owners or authorized operators. It is **not** affiliated with, endorsed by, or connected to any game manufacturer.

**Use at your own risk.** The authors are not responsible for any misuse of this software.

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).

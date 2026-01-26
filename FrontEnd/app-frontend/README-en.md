# React Frontend Project

This project is the frontend of a web application, built with React and Vite. It allows you to add Students and Courses, and then enroll a Student in a Course.

## Technologies Used

* **React:** Library for building user interfaces.
* **React DOM:** Provides DOM-specific methods for React.
* **React Router DOM:** For routing in the application.
* **Axios:** HTTP client for making requests to the backend.
* **UnoCSS:** Atomic CSS framework.
* **Vite:** Build tool that provides a fast development environment.
* **@vitejs/plugin-react:** Vite plugin for using React.
* **@unocss/preset-wind3:** UnoCSS preset for using Tailwind CSS syntax.
* **ESLint:** Linter to ensure code quality.

## Dependencies

Project dependencies are managed with npm. Here is a summary of the main ones:

### Production Dependencies

* `axios`: HTTP client for making requests to the backend.
* `react`: Main React library for building the user interface.
* `react-dom`: Provides DOM-specific methods for React.
* `react-router-dom`: Routing for the web application.

### Development Dependencies

* `@eslint/js`: Recommended ESLint rules.
* `@types/react`: TypeScript types for React.
* `@types/react-dom`: TypeScript types for React DOM.
* `@unocss/preset-wind3`: UnoCSS preset for using Tailwind CSS syntax.
* `@vitejs/plugin-react`: Vite plugin for React.
* `eslint`: JavaScript linter.
* `eslint-plugin-react-hooks`: ESLint rules for React Hooks.
* `eslint-plugin-react-refresh`: ESLint plugin to prevent issues with React Fast Refresh.
* `globals`: Defines JavaScript global variables for ESLint.
* `unocss`: The atomic CSS engine.
* `vite`: Build tool.

## Scripts

The `package.json` file defines the following scripts:

* `dev`: Starts the Vite development server.
* `build`: Builds the application for production.
* `lint`: Runs ESLint to analyze the code.
* `preview`: Starts a local server to preview the production build.

## UnoCSS Configuration

This project uses UnoCSS with the `@unocss/preset-wind3` preset, allowing you to use Tailwind CSS-like syntax for styling the application. UnoCSS is an atomic CSS engine that generates styles on demand, resulting in a smaller bundle size compared to traditional CSS frameworks.

The UnoCSS configuration is in the `vite.config.js` file. The Vite plugin and preset are added to the Vite configuration as follows:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import presetWind from '@unocss/preset-wind';

export default defineConfig({
    plugins: [
        react(),
        UnoCSS({
            presets: [
                presetWind(),
            ],
        }),
    ],
});
```

## Requirements

Before starting, make sure you have the following installed:

* [Node.js](https://nodejs.org/): JavaScript runtime environment.
* [npm](https://www.npmjs.com/): Node.js package manager.

## Installation

1.  Clone the repository.
2.  Navigate to the project directory:

    ```bash
    cd your-project
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

## Development

To start the development server:

```bash
npm run dev
```

# HOT Nerds Web App

This application is a web app for HOT Nerds.

## Running in Production

To run the application in production mode, follow these steps:

1. Ensure you have all dependencies installed:
    ```bash
    npm install
    ```

2. Build the project:
    ```bash
    npm run build
    ```

3. Start the application:
    ```bash
    npm run start:prod
    ```

## Running in Development

To run the application in development mode, follow these steps:

1. Ensure you have all dependencies installed:
    ```bash
    npm install
    ```

2. Start the development server:
    ```bash
    npm start
    ```

## npm Scripts

- `npm install` — Installs all dependencies listed in `package.json`.
- `npm start` — Starts the development server using Webpack Dev Server.
- `npm run build` — Creates an optimized production build.
- `npm run start:prod` — Starts the application in production mode (configurable in `package.json`).

## Environment Variables

Environment variables are configured using `.env` files:

- `.env.development` — Environment variables for development mode.
- `.env.production` — Environment variables for production mode.

## Webpack Configuration

The `webpack.config.js` file is configured to use different settings based on the mode (development or production).

## Additional Information

For more information and help with using the application, please refer to the documentation or contact the support team.

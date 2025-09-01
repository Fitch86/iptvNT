export const AppConfig = {
    production: true,
    environment: 'PROD',
    version: '1.0.0', // Hardcoded to avoid require() in browser
    BACKEND_URL: '', // Will be loaded at runtime from config.json
};

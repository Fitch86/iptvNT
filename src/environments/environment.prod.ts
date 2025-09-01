export const AppConfig = {
    production: true,
    environment: 'PROD',
    version: require('../../package.json').version,
    BACKEND_URL: (globalThis as any).process?.env?.['BACKEND_URL'] || 'http://localhost:3001',
};

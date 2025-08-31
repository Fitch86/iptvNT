export const AppConfig = {
    production: true,
    environment: 'WEB',
    version: require('../../package.json').version,
    BACKEND_URL: process.env['BACKEND_URL'] || 'https://your-proxy-domain.com',
};

// const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Static export only for production builds (GitHub Pages).
  // In dev, leave this unset so API routes and other server features work.
  output: isProd ? 'export' : undefined,
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true
};

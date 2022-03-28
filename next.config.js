const Crypto = require('crypto')
const envConfig = require("./lib/config/envConfig")

const nextConfig = {
  reactStrictMode: true,
  env: envConfig,
  images: {
    loader: 'akamai',
    path: '',
    domains: []
  },
  generateBuildId: async () => {
    return process.env.CI_COMMIT_SHORT_SHA !== undefined ? process.env.CI_COMMIT_SHORT_SHA : Crypto.randomBytes(10).toString('base64').slice(0, 10)
  },
}

module.exports = nextConfig
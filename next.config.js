const path = require('path')
const pkg = require('./package')

const nextConfig = {
  env: {
    APP_NAME: pkg.name,
    APP_DESCRIPTION: pkg.description,
    REACT_APP_AWS_REGION: process.env.REACT_APP_AWS_REGION,
    REACT_APP_AWS_ACCESS_KEY_ID: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    REACT_APP_AWS_SECRET_ACCESS_KEY:
      process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    REACT_APP_AWS_WEBSOCKET_URL: process.env.REACT_APP_AWS_WEBSOCKET_URL,
  },
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  typescript: {
    // ビルド時のTypescriptエラーを無視する
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

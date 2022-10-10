const path = require('path')
const pkg = require('./package')
const fs = require('fs')
const USE_AWS_AMPLIFY = fs.existsSync( './src/aws-exports.js' ) 

const nextConfig = {
  env: {
    APP_NAME: pkg.name,
    APP_DESCRIPTION: pkg.description,
    USE_AWS_AMPLIFY
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

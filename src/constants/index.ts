import { isDevelopment, isNode } from '@/utils/general/context'

//  ----------------------------------------------------------------------------
//  System const values
//  ----------------------------------------------------------------------------

/** システム アプリ名 */
const APP_NAME = process.env.APP_NAME

/** システム デフォルトロケール */
const LOCALE = process.env.NEXT_PUBLIC_LOCALE as 'ja' | 'en'

/** システム モード */
const APP_MODE = process.env.NODE_ENV

/** システム APP URL */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL

/** Dateオブジェクト 文字列表現デフォルトフォーマット */
const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss'

/** システム API URL */
const API_URL = (
  isNode() && isDevelopment()
    ? process.env.NEXT_PUBLIC_API_URL?.replace('xxxxxxxxxx', 'localhost')
    : process.env.NEXT_PUBLIC_API_URL
) as string

/** AWS Config */
const awsConfig = {
  region: process.env.NEXT_AWS_REGION,
  accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  websocketUrl: process.env.NEXT_AWS_WEBSOCKET_URL,
} as const

console.log('ENV', {
  APP_NAME,
  LOCALE,
  APP_MODE,
  APP_URL,
  DATE_FORMAT,
  API_URL,
  awsConfig,
})
export { APP_NAME, LOCALE, APP_MODE, APP_URL, DATE_FORMAT, API_URL, awsConfig }

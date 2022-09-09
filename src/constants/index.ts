import { isDevelopment, isNode } from '@/utils/general/context'

//  ----------------------------------------------------------------------------
//  System const values
//  ----------------------------------------------------------------------------

/** システム アプリ名 */
export const APP_NAME = process.env.APP_NAME

/** システム デフォルトロケール */
export const LOCALE = process.env.NEXT_PUBLIC_LOCALE as 'ja' | 'en'

/** システム モード */
export const APP_MODE = process.env.NODE_ENV

/** システム APP URL */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL

/** システム API URL */
export const API_URL = (
  isNode() && isDevelopment()
    ? process.env.NEXT_PUBLIC_API_URL?.replace('localhost', 'xxx')
    : process.env.NEXT_PUBLIC_API_URL
) as string

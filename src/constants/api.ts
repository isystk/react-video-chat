import { API_URL } from './index'

/**
 * BFF（バックエンドフォーフロントエンド）用の URL を作成する
 */

type API_TYPE = {
  HELLO_WORLD: string
}
export type API_TYPES = keyof API_TYPE

/** API のエンドポイント */
export const Api: API_TYPE = {
  HELLO_WORLD: [API_URL, '/helloWorld'].join(''),
}

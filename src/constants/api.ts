/**
 * BFF（バックエンドフォーフロントエンド）用の URL を作成する
 */
const getBffUrl = (path: string): string => {
  return ['', path].join('')
}

type API_TYPE = {
  HELLO_WORLD: string
}
export type API_URL = keyof API_TYPE

/** API のエンドポイント */
export const Api: API_TYPE = {
  HELLO_WORLD: getBffUrl('/helloWorld'),
}

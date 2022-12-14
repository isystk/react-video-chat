import React, { Children, FC, useState } from 'react'
import { connect } from '@/components/hoc'
import { ContainerProps, WithChildren } from 'types'
import useAppRoot from '@/stores/useAppRoot'
import Header from '@/components/04_organisms/Header'
import SideMenu from '@/components/04_organisms/SideMenu'
import Title, { TitleProps } from './Title'
import Head from 'next/head'
import { isReactElement } from '@/utils/general/object'
import { CssBaseline } from '@mui/material'
import { APP_NAME, APP_DESCRIPTION } from '@/constants'

/** HtmlSkeleton Props */
export type HtmlSkeletonProps = WithChildren
/** Presenter Props */
export type PresenterProps = HtmlSkeletonProps & {
  title?: TitleProps['children']
  description: string
}

/** Presenter Component */
const HtmlSkeletonPresenter: FC<PresenterProps> = ({
  main,
  title,
  description,
  isMenuOpen,
  setMenuOpen,
  children,
  ...props
}) => (
  <>
    <Head>
      {/* タイトル */}
      <title>{title}</title>
      {/* favicon */}
      <link rel="icon" href="/favicon.ico" />
      {/* ブラウザテーマカラー */}
      <meta name="theme-color" content="#ffffff" />
      {/* サイト概要 */}
      <meta name="description" content={description} />
      {/* OGP 画像URL */}
      <meta property="og:image" content={'/ogp-image.png'} />
      {/* OGP タイトル */}
      <meta name="og:title" content={title} />
      {/* OGP サイト概要 */}
      <meta name="og:description" content={description} />
      {/* OGP Twitterカード */}
      <meta name="twitter:card" content="summary" />
      {/* apple ポータブル端末 アイコン */}
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      {/* manifest.json */}
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <Context.Provider value={main}>
      <CssBaseline />
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <div>{children}</div>
      <SideMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </Context.Provider>
  </>
)

/** Container Component */
const HtmlSkeletonContainer: React.FC<
  ContainerProps<HtmlSkeletonProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  let title: TitleProps['children'] | undefined = undefined
  const main = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (!main) return <></>

  children = Children.map(children, (child) =>
    isReactElement(child) && child.type === Title
      ? (title = `${child.props.children} | ${APP_NAME}`) && undefined
      : child
  )
  if (!title) title = APP_NAME

  const description = APP_DESCRIPTION
  return presenter({
    main,
    title,
    description,
    isMenuOpen,
    setMenuOpen,
    children,
    ...props,
  })
}

export const Context = React.createContext(null)

export default connect<HtmlSkeletonProps, PresenterProps>(
  'HtmlSkeleton',
  HtmlSkeletonPresenter,
  HtmlSkeletonContainer
)

// Sub Component
export type { TitleProps }
export { Title }

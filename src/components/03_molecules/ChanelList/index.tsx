import * as React from 'react'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { FC, useContext } from 'react'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** ChanelListProps Props */
export type ChanelListProps = WithChildren
/** Presenter Props */
export type PresenterProps = ChanelListProps & {
  main
}

/** Presenter Component */
const ChanelListPresenter: FC<PresenterProps> = ({ main, ...props }) => (
  <>
    <div className={styles.chanelList}>
      {_.map(main.chanels, (chanel, index) => (
        <div
          className={`tag ${main.selectChanelId === chanel.id ? 'active' : ''}`}
          key={index}
          onClick={async () => await main.setChanelId(chanel.id)}
        >
          <div className="head">
            <img src={chanel.photo} alt="" />
          </div>
          <div className="text">
            <div className="name">{chanel.name}</div>
            <div className="dec">{chanel.detail}</div>
          </div>
          {0 < chanel.chat.getUnreadCount() && (
            <div className="num">{chanel.chat.getUnreadCount()}</div>
          )}
        </div>
      ))}
    </div>
  </>
)

/** Container Component */
const ChanelListContainer: React.FC<
  ContainerProps<ChanelListProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  return presenter({
    children,
    main,
    ...props,
  })
}

export default connect<ChanelListProps, PresenterProps>(
  'ChanelList',
  ChanelListPresenter,
  ChanelListContainer
)

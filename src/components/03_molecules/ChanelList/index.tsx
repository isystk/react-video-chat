import * as React from 'react'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { FC, useContext } from 'react'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** ChanelListProps Props */
export type ChanelListProps = WithChildren
/** Presenter Props */
export type PresenterProps = ChanelListProps & {
  classes
  main 
}

/** Presenter Component */
const ChanelListPresenter: FC<PresenterProps> = ({
  classes,
  main,
  ...props
}) => (
  <>
    <div id="myChatList" className="chat_list">
      {_.map(main.chanels, (chanel, index) => (
        <div
          className={`chatListTag ${
            main.selectChanelId === chanel.id ? 'active' : ''
          }`}
          key={index}
          onClick={async () => await main.setChanelId(chanel.id)}
        >
          <div className="head">
            <img src={chanel.photo} alt="" />
          </div>
          <div className="mytext">
            <div className="name">{chanel.name}</div>
            <div className="dec">{chanel.detail}</div>
          </div>
          <div className="msg_num">7</div>
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
  const classes = useStyles()
  return presenter({
    children,
    main,
    classes,
    ...props,
  })
}

export default connect<ChanelListProps, PresenterProps>(
  'ChanelList',
  ChanelListPresenter,
  ChanelListContainer
)

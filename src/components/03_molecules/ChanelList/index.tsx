import * as React from 'react'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { FC } from 'react'
import { connect } from '@/components/hoc'

/** ChanelListProps Props */
export type ChanelListProps = WithChildren & { main }
/** Presenter Props */
export type PresenterProps = ChanelListProps & { classes }

/** Presenter Component */
const ChanelListPresenter: FC<PresenterProps> = ({
  main,
  classes,
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
> = ({ presenter, children, main, ...props }) => {
  const classes = useStyles()
  return presenter({ children, main, classes, ...props })
}

export default connect<ChanelListProps, PresenterProps>(
  'ChanelList',
  ChanelListPresenter,
  ChanelListContainer
)

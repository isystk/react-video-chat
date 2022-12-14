import * as React from 'react'
import { Stamps } from '@/services/chat'
import { FC, useContext, useEffect, useState } from 'react'
import * as _ from 'lodash'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { dateFormat, parseDate } from '@/utils/general/date'
import { Virtuoso } from 'react-virtuoso'

/** ChatMessagesProps Props */
export type ChatMessagesProps = WithChildren
/** Presenter Props */
export type PresenterProps = ChatMessagesProps & {
  main
  windowHeight
  appStyle
}

/** Presenter Component */
const ChatMessagesPresenter: FC<PresenterProps> = ({
  main,
  windowHeight,
  appStyle,
  messages,
  ...props
}) => (
  <div>
    <Virtuoso
      className={styles.chatMessage}
      style={appStyle(windowHeight)}
      data={messages}
      initialTopMostItemIndex={messages.length}
      totalCount={messages.length}
      itemContent={(index, message) => {
        const isMe = message.sendId === main.self.connectionId
        const member = main.members[message.sendId]
        const isStamp = 'stamp' === message.type
        return (
          <div
            key={index}
            className={`message_row ${isMe ? 'you-message' : 'other-message'}`}
          >
            <div className="message-content">
              {!isMe && <img className="head" src={member.photo} alt="" />}
              {isStamp ? (
                <img className="head" src={Stamps[message.data]} alt="" />
              ) : (
                <div className="message-text">{message.data}</div>
              )}
              <div className="message-user">{!isMe && member.name}</div>
              <div className="message-time">
                {dateFormat(parseDate(message.datetime), 'M/d HH:mm')}
              </div>
            </div>
          </div>
        )
      }}
    />
  </div>
)

/** Container Component */
const ChatMessagesContainer: React.FC<
  ContainerProps<ChatMessagesProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  if (_.size(main.chanels) === 0) return <></>

  const appStyle = (vh) => {
    return {
      height: vh - 64 - 69,
      overflowY: 'scroll',
    }
  }

  const { messages } = main.chanels[main.selectChanelId].chat

  return presenter({
    children,
    main,
    windowHeight,
    appStyle,
    messages,
    ...props,
  })
}

export default connect<ChatMessagesProps, PresenterProps>(
  'ChatMessages',
  ChatMessagesPresenter,
  ChatMessagesContainer
)

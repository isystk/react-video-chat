import * as React from 'react'
import Main from '@/services/main'
import { Stamps } from '@/services/Chat'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import moment from 'moment'
import InputFormChat from '@/components/03_molecules/InputFormChat'

// ↓ 表示用のデータ型
interface IProps {
  main: Main
}

const Chat = ({ main }: IProps) => {
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  if (_.size(main.chanels) === 0) return <></>

  return (
    <div className="chat_box">
      <div
        id="chatRoom"
        className="chat_message"
        style={appStyle(windowHeight)}
      >
        {main.chanels[main.selectChanelId].chat.messages.map(
          (message, index) => {
            const isMe = message.sendId === main.self.connectionId
            const member = main.members[message.sendId]
            const isStamp = 'stamp' === message.type
            return (
              <div
                key={index}
                className={`message_row ${
                  isMe ? 'you-message' : 'other-message'
                }`}
              >
                <div className="message-content">
                  {!isMe && <img className="head" src={member.photo} alt="" />}
                  {isStamp ? (
                    <img className="head" src={Stamps[message.data]} alt="" />
                  ) : (
                    <div className="message-text">{message.data}</div>
                  )}
                  <div className="message-time">
                    {moment(message.datetime).format('MM/DD HH:mm')}
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
      <InputFormChat main={main} />
    </div>
  )
}

const appStyle = (vh) => {
  return {
    height: vh - 64 - 69,
    overflowY: 'scroll',
  }
}

export default Chat

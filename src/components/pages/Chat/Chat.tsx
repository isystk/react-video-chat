import * as React from 'react'
import Main from '@/services/main'
import {Stamps} from '@/services/RoomChat'
import { Button, TextField } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import * as _ from 'lodash'
import moment from 'moment'

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const Chat = ({ rtcClient }: IProps) => {
  const label = 'メッセージを入力してください'
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [isComposed, setIsComposed] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    const disabled = message === ''
    setDisabled(disabled)
  }, [message])

  const initializeLocalPeer = useCallback(
    async (e) => {
      e.persist()
      await rtcClient.chat.sendChat(message)
      setMessage('')
      e.preventDefault()
    },
    [message, rtcClient]
  )

  return (
    <div className="chat_box">
      <div
        id="chatRoom"
        className="chat_message"
        style={appStyle(windowHeight)}
      >
        {rtcClient.chat.messages.map((message, index) => {
          const isMe = message.connectionId === rtcClient.self.connectionId
          const isStamp = 'stamp' === message.type
          return (
            <div
              key={index}
              className={`message_row ${
                isMe ? 'you-message' : 'other-message'
              }`}
            >
              <div className="message-content">
                {!isMe && (
                  <img className="head" src="images/friends/David.png" alt="" />
                )}
                {isStamp ? (
                  <img className="head" src={Stamps[message.data]} alt="" />
                ) : (
                  <div className="message-text">{message.data}</div>
                )}
                <div className="message-time">{moment(message.datetime).format('MM/DD HH:mm')}</div>
              </div>
            </div>
          )
        })}

      </div>
      <div className="chat_input">
        <div className="myIcon2 iconTag">
          <TagFacesIcon color="action" />
          <div className="icon_block">
            {_.map(Stamps, (stamp, key) => (
              <div className="emoji_icon" key={key} onClick={(e) => rtcClient.chat.sendStamp(key)}>
                <img src={stamp} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="myIcon2">
          <AttachFileIcon color="action" />
        </div>
        <TextField
          className="sendMsg"
          autoFocus
          fullWidth
          label={label}
          name="message"
          size="small"
          onChange={(e) => setMessage(e.target.value)}
          onCompositionEnd={() => setIsComposed(false)}
          onCompositionStart={() => setIsComposed(true)}
          onKeyDown={async (e) => {
            if (isComposed) return
            if (e.target.value === '') return
            if (e.key === 'Enter') await initializeLocalPeer(e)
          }}
          required
          value={message}
          variant="outlined"
        />
        <Button
          onClick={async (e) => await initializeLocalPeer(e)}
          type="submit"
        >
          <SendIcon color="primary" />
        </Button>
      </div>
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

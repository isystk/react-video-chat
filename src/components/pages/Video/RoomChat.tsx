import * as React from 'react'
import Main from '@/services/main'
import { Button, TextField } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { makeStyles } from '@material-ui/core/styles'

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const RoomChat = ({ rtcClient }: IProps) => {
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
                <div className="message-text">{message.text}</div>
                <div className="message-time">09/23 10:00</div>
              </div>
            </div>
          )
        })}

        <div className="message_row other-message">
          <div className="message-content">
            <img className="head" src="images/friends/David.png" alt="" />
            <img className="ejIcon" src="images/photo/423893.jpg" alt="" />
            <div className="message-time">09/23 10:19</div>
          </div>
        </div>
        <div className="message_row other-message">
          <div className="message-content">
            <img className="head" src="images/friends/David.png" alt="" />
            <img className="ejIcon" src="images/emoji/like.png" alt="" />
            <div className="message-time">09/23 10:16</div>
          </div>
        </div>
      </div>
      <div className="chat_input">
        <div className="myIcon2 iconTag">
          <TagFacesIcon color="action" />
          <div className="icon_block">
            <div className="emoji_icon">
              <img src="images/emoji/cry.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/cry2.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/I_dont_know.jpg" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/like.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/like2.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/omg.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/robot-face.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/smile.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/strange.png" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/what.jpg" alt="" />
            </div>
            <div className="emoji_icon">
              <img src="images/emoji/wow.png" alt="" />
            </div>
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

export default RoomChat

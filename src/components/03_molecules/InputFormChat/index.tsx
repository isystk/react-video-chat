import TextField from '@mui/material/TextField'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import { Stamps } from '@/services/chat'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** InputFormChatProps Props */
export type InputFormChatProps = WithChildren
/** Presenter Props */
export type PresenterProps = InputFormChatProps & {
  main
  Stamps
  label
  setMessage
  message
  setIsComposed
  isComposed
  initializeLocalPeer
  isHover
  handleMouseEnter
  handleMouseLeave
}

/** Presenter Component */
const InputFormChatPresenter: FC<PresenterProps> = ({
  main,
  Stamps,
  label,
  setMessage,
  message,
  setIsComposed,
  isComposed,
  initializeLocalPeer,
  isHover,
  handleMouseEnter,
  handleMouseLeave,
  ...props
}) => (
  <>
    <div className={styles.chatInput}>
      <div
        className={styles.myIcon2}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <TagFacesIcon color="action" />
        {isHover && (
          <div className={styles.iconBlock}>
            {_.map(Stamps, (stamp, key) => (
              <div
                key={key}
                onClick={(e) =>
                  main.chanels[main.selectChanelId].chat.sendStamp(key)
                }
              >
                <img src={stamp} alt="" className={styles.myIcon2Img} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.myIcon2}>
        <a href="#" onClick={() => alert('作成中')}>
          <AttachFileIcon color="action" />
        </a>
      </div>
      <TextField
        className={styles.sendMsg}
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
      <Button onClick={async (e) => await initializeLocalPeer(e)} type="submit">
        <SendIcon color="primary" />
      </Button>
    </div>
  </>
)

/** Container Component */
const InputFormChatContainer: React.FC<
  ContainerProps<InputFormChatProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  const label = 'メッセージを入力してください'
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [isComposed, setIsComposed] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  useEffect(() => {
    const disabled = message === ''
    setDisabled(disabled)
  }, [message])

  const initializeLocalPeer = useCallback(
    async (e) => {
      e.persist()
      await main.chanels[main.selectChanelId].chat.sendChat(message)
      setMessage('')
      e.preventDefault()
    },
    [message, main]
  )

  return presenter({
    children,
    main,
    Stamps,
    label,
    setMessage,
    message,
    setIsComposed,
    isComposed,
    initializeLocalPeer,
    isHover,
    handleMouseEnter,
    handleMouseLeave,
    ...props,
  })
}

export default connect<InputFormChatProps, PresenterProps>(
  'InputFormChat',
  InputFormChatPresenter,
  InputFormChatContainer
)

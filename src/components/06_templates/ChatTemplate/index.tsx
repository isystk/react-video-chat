import Grid from '@material-ui/core/Grid'
import React, { useEffect, FC, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import ChatMessages from '@/components/03_molecules/ChatMessages'
import InputFormChat from '@/components/03_molecules/InputFormChat'
import RecorderModal from '@/components/04_organisms/RecorderModal'
import { URL } from '@/constants/url'
import ChanelList from '@/components/03_molecules/ChanelList'
import ChanelInfo from '@/components/03_molecules/ChanelInfo'
import SendCallModal from '@/components/04_organisms/SendCallModal'
import ReceiveCallModal from '@/components/04_organisms/ReceiveCallModal'
import VideoTemplate from '@/components/06_templates/VideoTemplate'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** ChatTemplateProps Props */
export type ChatTemplateProps = WithChildren
/** Presenter Props */
export type PresenterProps = ChatTemplateProps & { main; classes; windowHeight }

/** Presenter Component */
const ChatTemplatePresenter: FC<PresenterProps> = ({
  main,
  classes,
  windowHeight,
  ...props
}) => (
  <>
    <div className="area">
      <Grid container spacing={0}>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide" style={appStyle(windowHeight)}>
            <ChanelList main={main} />
          </div>
        </Grid>
        <Grid item {...{ xs: 12, md: 6 }}>
          <div className="chat_box">
            <ChatMessages main={main} />
            <InputFormChat main={main} />
          </div>
        </Grid>
        <Grid item {...{ xs: 12, md: 3 }} style={{ backgroundColor: '#fff' }}>
          <div className="sp-hide">
            <ChanelInfo main={main} />
          </div>
        </Grid>
      </Grid>
      <RecorderModal main={main} />
      {main.video.nowCallSending && <SendCallModal main={main} />}
      {main.video.nowCallReceiving && <ReceiveCallModal main={main} />}
    </div>
  </>
)

/** Container Component */
const ChatTemplateContainer: React.FC<
  ContainerProps<ChatTemplateProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()
  const main = useContext(Context)
  const router = useRouter()
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      main.setRoomId(router.query.id + '')
    }
  }, [router])

  useEffect(() => {
    if (main.self.name === '') {
      router.push(URL.HOME)
    }
  }, [main.self.name])

  useEffect(() => {
    if (main.self.name !== '' && main.room.name !== '') {
      ;(async () => {
        // await main.mediaDevice.setMediaStream()
        await main.join()
      })()
    }
  }, [main.self.name, main.room.name])

  if (main.self.name === '') return <></>
  if (main.room.name === '') return <></>
  if (main.video.isPeerConnected) return <VideoTemplate main={main} />
  return presenter({ children, main, classes, windowHeight, ...props })
}

const appStyle = (vh) => {
  return {
    height: vh - 64,
  }
}

export default connect<ChatTemplateProps, PresenterProps>(
  'ChatTemplate',
  ChatTemplatePresenter,
  ChatTemplateContainer
)

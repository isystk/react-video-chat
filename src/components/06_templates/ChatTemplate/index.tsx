import Grid from '@mui/material/Grid'
import React, { useEffect, FC, useState } from 'react'
import { useRouter } from 'next/router'
import ChatMessages from '@/components/03_molecules/ChatMessages'
import InputFormChat from '@/components/03_molecules/InputFormChat'
import RecorderModal from '@/components/04_organisms/RecorderModal'
import { Url } from '@/constants/url'
import ChanelList from '@/components/03_molecules/ChanelList'
import ChanelInfo from '@/components/03_molecules/ChanelInfo'
import SendCallModal from '@/components/04_organisms/SendCallModal'
import ReceiveCallModal from '@/components/04_organisms/ReceiveCallModal'
import VideoTemplate from '@/components/06_templates/VideoTemplate'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import HtmlSkeleton, { Title } from '@/components/05_layouts/HtmlSkeleton'
import * as _ from 'lodash'

/** ChatTemplateProps Props */
export type ChatTemplateProps = WithChildren & { main }
/** Presenter Props */
export type PresenterProps = ChatTemplateProps & { main; classes; windowHeight }

/** Presenter Component */
const ChatTemplatePresenter: FC<PresenterProps> = ({
  main,
  classes,
  windowHeight,
  appStyle,
  ...props
}) => (
  <HtmlSkeleton>
    <Title>{main.room.name}</Title>
    <div style={appStyle(windowHeight)}>
      <Grid container spacing={0}>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide">
            <ChanelList />
          </div>
        </Grid>
        <Grid item {...{ xs: 12, md: 6 }}>
          <ChatMessages />
          <InputFormChat />
        </Grid>
        <Grid item {...{ xs: 12, md: 3 }} style={{ backgroundColor: '#fff' }}>
          <div className="sp-hide">
            <ChanelInfo />
          </div>
        </Grid>
      </Grid>
      <RecorderModal />
      {main.video.nowCallSending && <SendCallModal />}
      {main.video.nowCallReceiving && <ReceiveCallModal />}
    </div>
  </HtmlSkeleton>
)

/** Container Component */
const ChatTemplateContainer: React.FC<
  ContainerProps<ChatTemplateProps, PresenterProps>
> = ({ presenter, children, main, ...props }) => {
  const classes = useStyles()
  const router = useRouter()
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    if (process.env.USE_AWS_AMPLIFY) {
      main.room.readRooms()
    }
  }, [])

  useEffect(() => {
    if (process.env.USE_AWS_AMPLIFY) {
      if (_.size(main.room.rooms) === 0) {
        return
      }
      // idがqueryで利用可能になったら処理される
      if (router.asPath !== router.route) {
        main.room.setRoomId(router.query.id + '')
      }
    } else {
      // idがqueryで利用可能になったら処理される
      if (router.asPath !== router.route) {
        main.room.setRoomName(router.query.id + '')
      }
    }
  }, [router, main.room.rooms])

  useEffect(() => {
    if (main.self.name === '') {
      router.push(Url.TOP)
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

  const appStyle = (vh) => {
    return {
      height: vh - 64,
    }
  }
  return presenter({
    children,
    main,
    classes,
    windowHeight,
    appStyle,
    ...props,
  })
}

export default connect<ChatTemplateProps, PresenterProps>(
  'ChatTemplate',
  ChatTemplatePresenter,
  ChatTemplateContainer
)

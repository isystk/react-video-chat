import Grid from '@material-ui/core/Grid'
import React, { useEffect, FC, useState } from 'react'
import Main from '@/services/main'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Chat from '@/components/pages/Chat/Chat'
import Recorder from '@/components/widgets/Recorder'
import { URL } from '@/constants/url'
import ChanelList from '@/components/pages/Chat/ChanelList'
import ChanelDetail from '@/components/pages/Chat/ChanelDetail'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

type Props = {
  rtcClient: Main
}

const ChatArea: FC<Props> = ({ rtcClient }) => {
  const router = useRouter()
  const classes = useStyles()
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      rtcClient.setRoomId(router.query.id + '')
    }
  }, [router])

  useEffect(() => {
    if (rtcClient.self.name === '') {
      router.push(URL.HOME)
    }
  }, [rtcClient.self.name])

  useEffect(() => {
    if (rtcClient.self.name !== '' && rtcClient.room.name !== '') {
      ;(async () => {
        await rtcClient.mediaDevice.setMediaStream()
        await rtcClient.join()
      })()
    }
  }, [rtcClient.self.name, rtcClient.room.name])

  if (rtcClient.self.name === '') return <></>
  if (rtcClient.room.name === '') return <></>

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide" style={appStyle(windowHeight)}>
            <ChanelList rtcClient={rtcClient} />
          </div>
        </Grid>
        <Grid item {...{ xs: 12, md: 6 }}>
          <Chat rtcClient={rtcClient} />
        </Grid>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide">
            <ChanelDetail rtcClient={rtcClient} />
          </div>
        </Grid>
      </Grid>
      <Recorder rtcClient={rtcClient} />
    </div>
  )
}

const appStyle = (vh) => {
  return {
    height: vh - 64,
  }
}

export default ChatArea

import Grid from '@material-ui/core/Grid'
import React, { useEffect, FC } from 'react'
import Main from '@/services/main'
import VideoLocal from './VideoLocal'
import VideoRemote from './VideoRemote'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import RoomChat from '@/components/pages/Video/RoomChat'
import DisplayShare from '@/components/widgets/DisplayShare'
import Recorder from '@/components/widgets/Recorder'
import { URL } from '@/constants/url'
import ChanelList from '@/components/pages/Video/ChanelList'
import ChanelDetail from '@/components/pages/Video/ChanelDetail'

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

const VideoArea: FC<Props> = ({ rtcClient }) => {
  const router = useRouter()
  const classes = useStyles()

  // この部分を追加
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
        <Grid item {...{ xs: 12, lg: 3 }}>
          <ChanelList rtcClient={rtcClient} />
        </Grid>
        <Grid item {...{ xs: 12, lg: 6 }}>
          <RoomChat rtcClient={rtcClient} />
        </Grid>
        <Grid item {...{ xs: 12, lg: 3 }}>
          <ChanelDetail rtcClient={rtcClient} />
        </Grid>
      </Grid>
      <DisplayShare rtcClient={rtcClient} />
      <Recorder rtcClient={rtcClient} />
    </div>
  )
}

export default VideoArea

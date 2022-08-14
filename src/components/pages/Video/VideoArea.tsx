import Grid from '@material-ui/core/Grid'
import React, { useEffect, VFC } from 'react'
import Main from '@/services/main'
import VideoLocal from './VideoLocal'
import VideoRemote from './VideoRemote'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import FloatingBtn from '@/components/pages/FloatingBtn'
import MenuBtn from '@/components/pages/MenuBtn'
import RoomChat from '@/components/pages/Video/RoomChat'
import DisplayShare from '@/components/widgets/DisplayShare'
import Recorder from '@/components/widgets/Recorder'
import { URL } from '@/constants/url'

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

const VideoArea: VFC<Props> = ({ rtcClient }) => {
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

  const grids = {
    0: { xs: 12, sm: 6, md: 6 },
    1: { xs: 12, sm: 6, md: 6 },
    2: { xs: 12, sm: 6, md: 6 },
    3: { xs: 12, sm: 6, md: 6 },
    4: { xs: 12, sm: 4, md: 4 },
    5: { xs: 12, sm: 4, md: 4 },
    6: { xs: 12, sm: 3, md: 3 },
    7: { xs: 12, sm: 3, md: 3 },
  }
  const grid = grids[Math.min(Object.keys(rtcClient.members).length, 7)]

  if (rtcClient.self.name === '') return <></>
  if (rtcClient.room.name === '') return <></>

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item {...{ xs: 12, sm: 8, md: 8 }}>
          <VideoLocal rtcClient={rtcClient} />
        </Grid>
        <Grid item {...{ xs: 12, sm: 4, md: 4 }}>
          <RoomChat rtcClient={rtcClient} />
        </Grid>
      </Grid>
      <DisplayShare rtcClient={rtcClient} />
      <MenuBtn rtcClient={rtcClient} />
      <Recorder rtcClient={rtcClient} />
    </div>
  )
}

export default VideoArea

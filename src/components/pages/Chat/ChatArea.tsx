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
import Notion from '@/components/widgets/Notion'

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
  main: Main
}

const ChatArea: FC<Props> = ({ main }) => {
  const router = useRouter()
  const classes = useStyles()
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

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide" style={appStyle(windowHeight)}>
            <ChanelList main={main} />
          </div>
        </Grid>
        <Grid item {...{ xs: 12, md: 6 }}>
          <Chat main={main} />
        </Grid>
        <Grid item {...{ xs: 12, md: 3 }}>
          <div className="sp-hide">
            <ChanelDetail main={main} />
          </div>
        </Grid>
      </Grid>
      <Recorder main={main} />
      <Notion main={main} />
    </div>
  )
}

const appStyle = (vh) => {
  return {
    height: vh - 64,
  }
}

export default ChatArea

import Grid from '@material-ui/core/Grid'
import React, { FC } from 'react'
import VideoLocal from './VideoLocal'
import VideoRemote from './VideoRemote'
import { makeStyles } from '@material-ui/core/styles'
import Main from '@/services/main'

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

const VideoArea: FC<Props> = ({ main }) => {
  const classes = useStyles()

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
  const grid = grids[Math.min(main.video.members.length, 7)]

  if (!main.video.isPeerConnected) return <></>

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item {...grid}>
          <VideoLocal main={main} />
        </Grid>
        {main.video.members.map(function (member, idx) {
          return member.status === 'online' ? (
            <Grid item {...grid} key={idx}>
              <VideoRemote main={main} member={member} />
            </Grid>
          ) : (
            <div key={idx}></div>
          )
        })}
      </Grid>
    </div>
  )
}

export default VideoArea

import Grid from '@material-ui/core/Grid'
import React, { FC } from 'react'
import VideoLocal from '../../04_organisms/VideoLocal'
import VideoRemote from '../../04_organisms/VideoRemote'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** VideoTemplateProps Props */
export type VideoTemplateProps = WithChildren & { main }
/** Presenter Props */
export type PresenterProps = VideoTemplateProps & { classes; grid }

/** Presenter Component */
const VideoTemplatePresenter: FC<PresenterProps> = ({
  main,
  classes,
  grid,
  ...props
}) => (
  <>
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
  </>
)

/** Container Component */
const VideoTemplateContainer: React.FC<
  ContainerProps<VideoTemplateProps, PresenterProps>
> = ({ presenter, children, main, ...props }) => {
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
  return presenter({ children, main, classes, grid, ...props })
}

export default connect<VideoTemplateProps, PresenterProps>(
  'VideoTemplate',
  VideoTemplatePresenter,
  VideoTemplateContainer
)

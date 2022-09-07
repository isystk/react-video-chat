import React, { FC, useRef } from 'react'
import Video from '../../03_molecules/Video'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** VideoRemoteProps Props */
export type VideoRemoteProps = WithChildren & { member }
/** Presenter Props */
export type PresenterProps = VideoRemoteProps & { classes; member; videoRef }

/** Presenter Component */
const VideoRemotePresenter: FC<PresenterProps> = ({
  classes,
  member,
  videoRef,
  ...props
}) => (
  <>
    <Video isLocal={false} member={member} videoRef={videoRef} />
  </>
)

/** Container Component */
const VideoRemoteContainer: React.FC<
  ContainerProps<VideoRemoteProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const classes = useStyles()

  const videoRef = useRef(null)

  return presenter({ children, classes, videoRef, ...props })
}

export default connect<VideoRemoteProps, PresenterProps>(
  'VideoRemote',
  VideoRemotePresenter,
  VideoRemoteContainer
)

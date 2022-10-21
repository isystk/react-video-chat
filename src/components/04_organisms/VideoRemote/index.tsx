import React, { FC, useRef } from 'react'
import Video from '../../03_molecules/Video'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'

/** VideoRemoteProps Props */
export type VideoRemoteProps = WithChildren & { member }
/** Presenter Props */
export type PresenterProps = VideoRemoteProps & { member; videoRef }

/** Presenter Component */
const VideoRemotePresenter: FC<PresenterProps> = ({
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
  const videoRef = useRef(null)

  return presenter({ children, videoRef, ...props })
}

export default connect<VideoRemoteProps, PresenterProps>(
  'VideoRemote',
  VideoRemotePresenter,
  VideoRemoteContainer
)

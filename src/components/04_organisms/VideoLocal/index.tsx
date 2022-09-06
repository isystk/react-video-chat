import React, { FC, useEffect, useRef } from 'react'

import Video from '../../03_molecules/Video'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** VideoLocalProps Props */
export type VideoLocalProps = WithChildren & { main }
/** Presenter Props */
export type PresenterProps = VideoLocalProps & { classes; videoRef }

/** Presenter Component */
const VideoLocalPresenter: FC<PresenterProps> = ({
  main,
  classes,
  videoRef,
  ...props
}) => (
  <>
    <Video isLocal={true} member={main.self} main={main} videoRef={videoRef} />
  </>
)

/** Container Component */
const VideoLocalContainer: React.FC<
  ContainerProps<VideoLocalProps, PresenterProps>
> = ({ presenter, children, main, ...props }) => {
  const classes = useStyles()

  const videoRef = useRef(null)
  const currentVideoRef = videoRef.current
  const mediaStream = main.mediaDevice.mediaStream

  useEffect(() => {
    if (currentVideoRef === null) return

    const getMedia = () => {
      try {
        // ローカルのVideoタグに自分を投影する
        currentVideoRef.srcObject = mediaStream
      } catch (err) {
        console.error(err)
      }
    }

    getMedia()
  }, [currentVideoRef, mediaStream])

  return presenter({ children, main, classes, videoRef, ...props })
}

export default connect<VideoLocalProps, PresenterProps>(
  'VideoLocal',
  VideoLocalPresenter,
  VideoLocalContainer
)

import React, { FC, useContext, useEffect, useRef } from 'react'

import Video from '../../03_molecules/Video'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** VideoLocalProps Props */
export type VideoLocalProps = WithChildren
/** Presenter Props */
export type PresenterProps = VideoLocalProps & { main; classes; videoRef }

/** Presenter Component */
const VideoLocalPresenter: FC<PresenterProps> = ({
  self,
  classes,
  videoRef,
  ...props
}) => (
  <>
    <Video isLocal={true} member={self} videoRef={videoRef} />
  </>
)

/** Container Component */
const VideoLocalContainer: React.FC<
  ContainerProps<VideoLocalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
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

  return presenter({ children, self: main.self, classes, videoRef, ...props })
}

export default connect<VideoLocalProps, PresenterProps>(
  'VideoLocal',
  VideoLocalPresenter,
  VideoLocalContainer
)

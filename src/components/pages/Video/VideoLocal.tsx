import React, { FC, useEffect, useRef } from 'react'

import Video from './Video'
import Main from '@/services/main'

type Props = {
  main: Main
}

const VideoLocal: FC<Props> = ({ main }) => {
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

  if (main.self.name === '' || main.room.name === '') return <></>

  return (
    <>
      <Video
        isLocal={true}
        member={main.self}
        main={main}
        videoRef={videoRef}
      />
    </>
  )
}

export default VideoLocal

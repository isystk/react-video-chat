import React, { FC, useRef } from 'react'

import Button from '@material-ui/core/Button'
import Video from './Video'
import Main, { Member } from '@/services/main'

type Props = {
  main: Main
  member: Member
}

const VideoRemote: FC<Props> = ({ main, member }) => {
  const videoRef = useRef(null)

  if (main.room.name === '') return <></>

  return (
    <>
      <Video isLocal={false} member={member} main={main} videoRef={videoRef} />
    </>
  )
}

export default VideoRemote

import React, { FC, useEffect, useRef, MutableRefObject } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import Main, { Member } from '@/services/main'
import AudioAnalyser from './AudioAnalyser'
import VolumeButton from './VolumeButton'
import useDimensions from '@/stores/useDimentions'

type Props = {
  isLocal: boolean
  member: Member
  main: Main
  videoRef: MutableRefObject<null>
}

const Video: FC<Props> = ({ isLocal, member, main, videoRef }) => {
  const refCard = useRef(null)
  // ブラウザの表示サイズに応じてビデオを表示する幅を取得する
  const dimensionsCard = useDimensions(refCard)
  const refVolumeButton = useRef(null)
  const dimensionsVolumeButton = useDimensions(refVolumeButton)

  // if (videoRef.current)
  //   console.log({ isLocal, muted, srcObject: videoRef.current.srcObject });

  useEffect(() => {
    window.setTimeout(() => {
      main.setAppRoot()
    }, 500)
  }, [])

  return (
    <Card ref={refCard}>
      <CardActionArea className="video-wrapper">
        <img
          src="/images/user.png"
          width={dimensionsCard.width}
          style={{ display: main.self.videoOff ? 'block' : 'none' }}
        />
        <video
          autoPlay
          muted={isLocal || main.self.muted}
          ref={videoRef}
          width={dimensionsCard.width}
          id={`video-${member.connectionId}`}
          style={{ display: !main.self.videoOff ? 'block' : 'none' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {member.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton
          isLocal={isLocal}
          refVolumeButton={refVolumeButton}
          main={main}
        />
        {videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser
            audio={videoRef.current.srcObject}
            width={dimensionsCard.width - dimensionsVolumeButton.width - 40}
          />
        )}
      </CardActions>
    </Card>
  )
}

export default Video

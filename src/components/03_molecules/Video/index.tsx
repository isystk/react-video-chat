import React, { FC, useEffect, useRef } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import AudioAnalyser from '../../01_atoms/AudioAnalyser'
import VolumeButton from '../../01_atoms/VolumeButton'
import useDimensions from '@/stores/useDimentions'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** VideoProps Props */
export type VideoProps = WithChildren & { main; isLocal; videoRef; member }
/** Presenter Props */
export type PresenterProps = VideoProps & {
  classes
  refCard
  dimensionsCard
  isLocal
  videoRef
  member
  refVolumeButton
  dimensionsVolumeButton
}

/** Presenter Component */
const VideoPresenter: FC<PresenterProps> = ({
  main,
  classes,
  refCard,
  dimensionsCard,
  isLocal,
  videoRef,
  member,
  refVolumeButton,
  dimensionsVolumeButton,
  ...props
}) => (
  <>
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
  </>
)

/** Container Component */
const VideoContainer: React.FC<ContainerProps<VideoProps, PresenterProps>> = ({
  presenter,
  children,
  main,
  ...props
}) => {
  const classes = useStyles()

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
  return presenter({
    children,
    main,
    classes,
    refCard,
    dimensionsCard,
    refVolumeButton,
    dimensionsVolumeButton,
    ...props,
  })
}

export default connect<VideoProps, PresenterProps>(
  'Video',
  VideoPresenter,
  VideoContainer
)

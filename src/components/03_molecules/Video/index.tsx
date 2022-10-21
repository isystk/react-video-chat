import React, { FC, useContext, useEffect, useRef } from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import AudioAnalyser from '../../01_atoms/AudioAnalyser'
import VolumeButton from '../../01_atoms/VolumeButton'
import useDimensions from './useDimentions'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { promiseSetTimeout } from '@/utils/general'

/** VideoProps Props */
export type VideoProps = WithChildren & { isLocal; videoRef; member }
/** Presenter Props */
export type PresenterProps = VideoProps & {
  main
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
      <CardActionArea className={styles.videoWrapper}>
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
          isMute={isLocal && main.self.muted}
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
  ...props
}) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  const refCard = useRef(null)
  // ブラウザの表示サイズに応じてビデオを表示する幅を取得する
  const dimensionsCard = useDimensions(refCard)
  const refVolumeButton = useRef(null)
  const dimensionsVolumeButton = useDimensions(refVolumeButton)

  useEffect(() => {
    ;(async () => {
      await promiseSetTimeout(() => {
        main.setAppRoot()
      }, 500)
    })()
  }, [])
  return presenter({
    children,
    main,
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

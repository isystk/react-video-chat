import React, { FC } from 'react'

import IconButton from '@mui/material/IconButton'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'

/** VolumeButtonProps Props */
export type VolumeButtonProps = WithChildren & {
  isMute
  isLocal
  refVolumeButton
  color
}
/** Presenter Props */
export type PresenterProps = VolumeButtonProps & {
  isLocal
  refVolumeButton
  color
  Icon
}

/** Presenter Component */
const VolumeButtonPresenter: FC<PresenterProps> = ({
  isLocal,
  refVolumeButton,
  color,
  Icon,
  ...props
}) => (
  <>
    <IconButton
      aria-label="switch mute"
      onClick={async () => {
        if (isLocal) {
          // 音声のオン・オフを切り替える
          alert('todo')
        }
      }}
      ref={refVolumeButton}
      className={styles.volumeButton}
    >
      <Icon style={{ fill: color }} />
    </IconButton>
  </>
)

/** Container Component */
const VolumeButtonContainer: React.FC<
  ContainerProps<VolumeButtonProps, PresenterProps>
> = ({
  presenter,
  children,
  isMute,
  refVolumeButton,
  color = 'black',
  ...props
}) => {
  const Icon = isMute ? VolumeOffIcon : VolumeUpIcon
  return presenter({
    children,
    refVolumeButton,
    color,
    Icon,
    ...props,
  })
}

export default connect<VolumeButtonProps, PresenterProps>(
  'VolumeButton',
  VolumeButtonPresenter,
  VolumeButtonContainer
)

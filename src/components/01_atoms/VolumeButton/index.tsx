import React, { FC } from 'react'

import IconButton from '@material-ui/core/IconButton'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** VolumeButtonProps Props */
export type VolumeButtonProps = WithChildren & {
  main
  isLocal
  refVolumeButton
  color
}
/** Presenter Props */
export type PresenterProps = VolumeButtonProps & { classes }

/** Presenter Component */
const VolumeButtonPresenter: FC<PresenterProps> = ({
  main,
  classes,
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
  main,
  isLocal,
  refVolumeButton,
  color = 'black',
  ...props
}) => {
  const classes = useStyles()
  const Icon = isLocal && main.self.muted ? VolumeOffIcon : VolumeUpIcon
  return presenter({
    children,
    main,
    isLocal,
    refVolumeButton,
    color,
    classes,
    Icon,
    ...props,
  })
}

export default connect<VolumeButtonProps, PresenterProps>(
  'VolumeButton',
  VolumeButtonPresenter,
  VolumeButtonContainer
)

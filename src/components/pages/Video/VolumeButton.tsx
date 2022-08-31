import React, { MutableRefObject, FC } from 'react'

import IconButton from '@material-ui/core/IconButton'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'
import Main from '@/services/main'

type Props = {
  isLocal: boolean
  muted: OverridableComponent<SvgIconTypeMap>
  refVolumeButton: MutableRefObject<null>
  main: Main
  setMuted: (value: ((prevState: boolean) => boolean) | boolean) => void
}

const VolumeButton: FC<Props> = ({
  isLocal,
  refVolumeButton,
  main,
  color = 'black',
}) => {
  const Icon = isLocal && main.self.muted ? VolumeOffIcon : VolumeUpIcon

  return (
    <IconButton
      aria-label="switch mute"
      onClick={async () => {
        if (isLocal) {
          // 音声のオン・オフを切り替える
          await main.toggleAudio()
        }
      }}
      ref={refVolumeButton}
    >
      <Icon style={{ fill: color }} />
    </IconButton>
  )
}

export default VolumeButton

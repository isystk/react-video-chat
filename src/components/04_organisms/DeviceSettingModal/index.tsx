import React, { FC, useContext, useEffect, useState } from 'react'
import Select from '@material-ui/core/Select'
import Modal from '@/components/01_atoms/Modal'
import { InputLabel, MenuItem } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import { connect } from '@/components/hoc'
import MainService from '@/services/main'

/** DeviceSettingModalProps Props */
export type DeviceSettingModalProps = WithChildren
/** Presenter Props */
export type PresenterProps = DeviceSettingModalProps & {
  main
  classes
  videoInputDefault
  changeDevice
  videoInput
  audioInputDefault
  audioInput
  audioOutputDefault
  audioOutput
}

/** Presenter Component */
const DeviceSettingModalPresenter: FC<PresenterProps> = ({
  main,
  classes,
  videoInputDefault,
  changeDevice,
  videoInput,
  audioInputDefault,
  audioInput,
  audioOutputDefault,
  audioOutput,
  ...props
}) => (
  <>
    <Modal
      isOpen={main.mediaDevice.isOpen}
      handleClose={() => main.mediaDevice.closeMediaDevice()}
    >
      <Container component="main" maxWidth="xs">
        <form className={classes.form}>
          <InputLabel style={{ textAlign: 'left', marginTop: '20px' }}>
            カメラ入力
          </InputLabel>
          <Select
            fullWidth
            defaultValue={videoInputDefault}
            value={main.mediaDevice.videoInput?.deviceId}
            onChange={(e) => changeDevice(e, 'videoinput')}
          >
            {videoInput.map((item) => (
              <MenuItem value={item.deviceId} key={item.deviceId}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <InputLabel style={{ textAlign: 'left', marginTop: '20px' }}>
            音声入力
          </InputLabel>
          <Select
            fullWidth
            defaultValue={audioInputDefault}
            value={main.mediaDevice.audioInput?.deviceId}
            onChange={(e) => changeDevice(e, 'audioinput')}
          >
            {audioInput.map((item) => (
              <MenuItem value={item.deviceId} key={item.deviceId}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <InputLabel style={{ textAlign: 'left', marginTop: '20px' }}>
            音声出力
          </InputLabel>
          <Select
            fullWidth
            defaultValue={audioOutputDefault}
            value={main.mediaDevice.audioOutput?.deviceId}
            onChange={(e) => changeDevice(e, 'audiooutput')}
          >
            {audioOutput.map((item) => (
              <MenuItem value={item.deviceId} key={item.deviceId}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </form>
      </Container>
    </Modal>
  </>
)

/** Container Component */
const DeviceSettingModalContainer: React.FC<
  ContainerProps<DeviceSettingModalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const [videoInput, setVideoInput] = useState([])
  const [videoInputDefault, setVideoInputDefault] = useState('')
  const [audioInput, setAudioInput] = useState([])
  const [audioInputDefault, setAudioInputDefault] = useState('')
  const [audioOutput, setAudioOutput] = useState([])
  const [audioOutputDefault, setAudioOutputDefault] = useState('')

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        const videoinput = devices.filter((e) => e.kind === 'videoinput')
        const audioinput = devices.filter((e) => e.kind === 'audioinput')
        const audiooutput = devices.filter((e) => e.kind === 'audiooutput')

        devices.forEach((e) => {
          if (e.deviceId === 'default') {
            if (e.kind === 'videoinput') setVideoInputDefault(e.deviceId)
            if (e.kind === 'audioinput') setAudioInputDefault(e.deviceId)
            if (e.kind === 'audiooutput') setAudioOutputDefault(e.deviceId)
          }
        })

        setVideoInput(videoinput)
        setAudioInput(audioinput)
        setAudioOutput(audiooutput)
      })
      .catch(function (err) {
        // エラー発生時
        console.error('enumerateDevide ERROR:', err)
      })
  }, [])

  const changeDevice = async (e, kind) => {
    await main.mediaDevice.setMediaDevice(e.target.value, kind)
  }

  return presenter({
    children,
    main,
    classes,
    videoInputDefault,
    changeDevice,
    videoInput,
    audioInputDefault,
    audioInput,
    audioOutputDefault,
    audioOutput,
    ...props,
  })
}

export default connect<DeviceSettingModalProps, PresenterProps>(
  'DeviceSettingModal',
  DeviceSettingModalPresenter,
  DeviceSettingModalContainer
)

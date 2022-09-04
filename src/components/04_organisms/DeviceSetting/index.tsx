import React, { FC, useEffect, useState } from 'react'

import Select from '@material-ui/core/Select'
import Main from '@/services/main'
import Modal from '@/components/01_atoms/Modal'
import {
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

type Props = {
  main: Main
}

const DeviceSetting: FC<Props> = ({ main }) => {
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

  return (
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
  )
}

export default DeviceSetting

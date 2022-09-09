import Main from '@/services/main'

export type Device = {
  deviceId: string
}

export default class MediaDeviceService {
  main: Main

  mediaStream: MediaStream | null
  isOpen: boolean
  videoInput: Device | null
  audioInput: Device | null
  audioOutput: Device | null

  constructor(main: Main) {
    this.main = main

    this.mediaStream = null
    this.isOpen = false
    this.videoInput = null
    this.audioInput = null
    this.audioOutput = null
  }

  async openMediaDevice() {
    this.isOpen = true
    await this.main.setAppRoot()
  }

  async closeMediaDevice() {
    this.isOpen = false
    await this.main.setAppRoot()
  }

  async setMediaDevice(deviceId: string, kind: string) {
    if (kind === 'videoinput') {
      this.videoInput = { deviceId }
    }
    if (kind === 'audioinput') {
      this.audioInput = { deviceId }
    }
    if (kind === 'audiooutput') {
      this.audioOutput = { deviceId }
    }

    await this.setMediaStream()

    await this.main.setAppRoot()
  }

  // カメラの使用許可を取得する
  async setMediaStream() {
    let constraint = { audio: true, video: true } as {
      audio: boolean | { deviceId: string }
      video: boolean | { deviceId: string }
    }
    if (this.audioInput) {
      constraint = {
        ...constraint,
        audio: { deviceId: this.audioInput.deviceId },
      }
    }
    if (this.videoInput) {
      constraint = {
        ...constraint,
        video: { deviceId: this.videoInput.deviceId },
      }
    }
    try {
      if (this.mediaStream) {
        // 既にメディアストリームがある場合は停止させる
        this.mediaStream.getTracks().forEach((track) => track.stop())
        this.mediaStream = null
      }
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraint)
    } catch (error) {
      console.error(error)
    }
    await this.main.setAppRoot()
  }
}

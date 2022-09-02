import Main from '@/services/main'

export default class VideoService {
  main: Main

  nowCallSending: boolean
  nowCallReceiving: boolean
  connectionId: string

  callingSound: Audio

  constructor(main: Main) {
    this.main = main
    this.nowCallSending = false
    this.nowCallReceiving = false
    this.connectionId = ''
    const audio = new Audio()
    audio.preload = 'auto'
    audio.src = '/sounds/calling.mp3'
    audio.load()
    this.callingSound = audio
  }

  sendRequestCall(connectionId) {
    this.nowCallSending = true
    this.playSound()
    this.connectionId = connectionId

    this.main.ws?.unicast(connectionId, {
      type: 'request_call',
      data: {},
    })

    this.main.setAppRoot()
  }

  receiveCall(connectionId) {
    this.nowCallReceiving = true
    this.playSound()
    this.connectionId = connectionId
    this.main.setAppRoot()
  }

  sendAcceptCall(connectionId) {
    this.nowCallReceiving = false
    this.pauseSound()
    this.main.ws?.unicast(connectionId, {
      type: 'accept_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  sendRejectCall(connectionId) {
    this.nowCallReceiving = false
    this.pauseSound()
    this.main.ws?.unicast(connectionId, {
      type: 'reject_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  sendCancelCall(connectionId) {
    this.nowCallSending = false
    this.pauseSound()
    this.main.ws?.unicast(connectionId, {
      type: 'cancel_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  acceptCall() {
    this.nowCallSending = false
    this.pauseSound()
    // ビデオ通話の開始
    console.log('success')
    this.main.setAppRoot()
  }

  rejectCall() {
    this.nowCallSending = false
    this.pauseSound()
    this.main.setAppRoot()
  }

  cancelCall() {
    this.nowCallReceiving = false
    this.pauseSound()
    this.main.setAppRoot()
  }

  playSound() {
    this.callingSound.loop = true
    this.callingSound.play()
  }

  pauseSound() {
    this.callingSound.pause()
    this.callingSound.currentTime = 0
  }
}

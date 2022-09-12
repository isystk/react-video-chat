import Main, { Member } from '@/services/main'
import { startMaster } from '@/services/video/master'
import { startViewer } from '@/services/video/viewer'
import { promiseSetTimeout } from '@/utils/general'
import { createSignalingChannel } from '@/services/video/createSignalChannel'
export type NatTraversal = 'STUN/TURN' | 'TURN' | 'DISABLED'

export default class VideoService {
  main: Main

  nowCallSending: boolean
  nowCallReceiving: boolean
  members: Member[]

  callingSound: Audio
  isPeerConnected: boolean

  constructor(main: Main) {
    this.main = main
    this.nowCallSending = false
    this.nowCallReceiving = false
    this.members = []
    const audio = new Audio()
    audio.preload = 'auto'
    audio.src = '/sounds/calling.mp3'
    this.callingSound = audio
    this.isPeerConnected = false
  }

  sendRequestCall(connectionId) {
    ;(async () => {
      // シグナリングチャネルを作成する
      // TODO チャネルが増えるとコストがかかるので 固定で"test" としておく
      await createSignalingChannel('test')
    })()
    this.nowCallSending = true
    this.playSound()
    this.members = [...this.members, this.main.members[connectionId]]
    this.main.ws?.unicast(connectionId, {
      type: 'request_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  receiveCall(connectionId) {
    this.nowCallReceiving = true
    this.playSound()
    this.members = [...this.members, this.main.members[connectionId]]
    this.main.setAppRoot()
  }

  sendAcceptCall(connectionId) {
    this.nowCallReceiving = false
    this.pauseSound()
    this.main.ws?.unicast(connectionId, {
      type: 'accept_call',
      data: {},
    })
    // ビデオ通話の開始
    this.isPeerConnected = true
    this.main.setAppRoot()
    ;(async () => {
      await this.main.mediaDevice.setMediaStream()
      const result = await promiseSetTimeout(true, 500)
      if (result) {
        // メディアストリームを取得
        await startViewer({
          channelName: 'test',
          natTraversal: 'STUN/TURN',
          widescreen: false,
          useTrickleICE: true,
          localConnectionId: this.main.self.connectionId,
          remoteConnectionId: this.members[0].connectionId,
          mediaStream: this.main.mediaDevice.mediaStream,
        })
        await this.main.setAppRoot()
      }
    })()
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

  receiveAcceptCall() {
    this.nowCallSending = false
    this.pauseSound()
    // ビデオ通話の開始
    this.isPeerConnected = true
    this.main.setAppRoot()
    ;(async () => {
      await this.main.mediaDevice.setMediaStream()
      const result = await promiseSetTimeout(true, 800)
      if (result) {
        await startMaster({
          channelName: 'test',
          natTraversal: 'STUN/TURN',
          widescreen: false,
          useTrickleICE: true,
          localConnectionId: this.main.self.connectionId,
          remoteConnectionId: this.members[0].connectionId,
          mediaStream: this.main.mediaDevice.mediaStream,
        })
        await this.main.setAppRoot()
      }
    })()
  }

  receiveRejectCall() {
    this.nowCallSending = false
    this.pauseSound()
    this.main.setAppRoot()
  }

  receiveCancelCall() {
    this.nowCallReceiving = false
    this.pauseSound()
    this.main.setAppRoot()
  }

  playSound() {
    this.callingSound.load()
    this.callingSound.loop = true
    this.callingSound.play()
  }

  pauseSound() {
    this.callingSound.pause()
    this.callingSound.currentTime = 0
  }
}

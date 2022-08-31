import Main from '@/services/main'

export default class VideoService {
  main: Main

  nowCallSending: boolean
  nowCallReceiving: boolean
  connectionId: string

  constructor(main: Main) {
    this.main = main
    this.nowCallSending = false
    this.nowCallReceiving = false
    this.connectionId = ''
  }

  sendRequestCall(connectionId) {
    this.nowCallSending = true
    this.connectionId = connectionId

    this.main.ws?.unicast(connectionId, {
      type: 'request_call',
      data: {},
    })

    this.main.setAppRoot()
  }

  receiveCall(connectionId) {
    this.nowCallReceiving = true
    this.connectionId = connectionId
    this.main.setAppRoot()
  }

  sendAcceptCall(connectionId) {
    this.nowCallReceiving = false
    this.main.ws?.unicast(connectionId, {
      type: 'accept_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  sendRejectCall(connectionId) {
    this.nowCallReceiving = false
    this.main.ws?.unicast(connectionId, {
      type: 'reject_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  sendCancelCall(connectionId) {
    this.nowCallSending = false
    this.main.ws?.unicast(connectionId, {
      type: 'cancel_call',
      data: {},
    })
    this.main.setAppRoot()
  }

  acceptCall() {
    this.nowCallSending = false
    // ビデオ通話の開始
    console.log('success')
    this.main.setAppRoot()
  }

  rejectCall() {
    this.nowCallSending = false
    this.main.setAppRoot()
  }

  cancelCall() {
    this.nowCallReceiving = false
    this.main.setAppRoot()
  }
}

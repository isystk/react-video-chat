import React, { FC, useEffect } from 'react'

import Main from '@/services/main'
import Modal from '@/components/widgets/Modal'

type Props = {
  main: Main
}

const Recorder: FC<Props> = ({ main }) => {
  useEffect(() => {
    if (!main.recorder.isOpen) return

    window.setTimeout(() => {
      const videoBlob = new Blob(main.recorder.chunks, {
        type: 'video/webm',
      })
      const blobUrl = window.URL.createObjectURL(videoBlob)

      const playbackVideo = document.getElementById('recorder-play')
      if (playbackVideo) {
        console.log('playing', playbackVideo)
        if (playbackVideo.src) {
          window.URL.revokeObjectURL(playbackVideo.src) // 解放
          playbackVideo.src = null
        }
        playbackVideo.src = blobUrl
        playbackVideo.play()
      }
      const downloadVideo = document.getElementById('recorder-download')
      if (downloadVideo) {
        downloadVideo.download = 'recorded.webm'
        downloadVideo.href = blobUrl
      }
    }, 1000)
  }, [main.recorder.isOpen])

  return (
    <Modal
      isOpen={main.recorder.isOpen}
      handleClose={() => main.recorder.closeRecorder()}
    >
      <video controls width="100%" id="recorder-play" />
      <a href="#" id="recorder-download">
        download
      </a>
    </Modal>
  )
}

export default Recorder

import React, { FC, useContext, useEffect } from 'react'
import Modal from '@/components/01_atoms/Modal'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** RecorderModalProps Props */
export type RecorderModalProps = WithChildren
/** Presenter Props */
export type PresenterProps = RecorderModalProps & { main; classes }

/** Presenter Component */
const RecorderModalPresenter: FC<PresenterProps> = ({
  main,
  classes,
  ...props
}) => (
  <>
    <Modal
      isOpen={main.recorder.isOpen}
      handleClose={() => main.recorder.closeRecorder()}
    >
      <video controls width="100%" id="recorder-play" />
      <a href="#" id="recorder-download">
        download
      </a>
    </Modal>
  </>
)

/** Container Component */
const RecorderModalContainer: React.FC<
  ContainerProps<RecorderModalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  useEffect(() => {
    if (!main.recorder.isOpen) return

    window.setTimeout(() => {
      const videoBlob = new Blob(main.recorder.chunks, {
        type: 'video/webm',
      })
      const blobUrl = window.URL.createObjectURL(videoBlob)

      const playbackVideo = document.getElementById('recorder-play')
      if (playbackVideo) {
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
  return presenter({ children, main, classes, ...props })
}

export default connect<RecorderModalProps, PresenterProps>(
  'RecorderModal',
  RecorderModalPresenter,
  RecorderModalContainer
)

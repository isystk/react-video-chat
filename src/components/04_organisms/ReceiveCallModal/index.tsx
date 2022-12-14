import React, { FC, useContext } from 'react'
import Modal from '@/components/01_atoms/Modal'
import DotPulse from '@/components/01_atoms/DotPulse'
import { Button } from '@mui/material'
import Container from '@mui/material/Container'
import { ContainerProps, WithChildren } from 'types'
import * as styles from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import * as _ from 'lodash'

/** ReceiveCallModalProps Props */
export type ReceiveCallModalProps = WithChildren
/** Presenter Props */
export type PresenterProps = ReceiveCallModalProps & {
  main
  isOpen
  connectionId
  name
  photo
}

/** Presenter Component */
const ReceiveCallModalPresenter: FC<PresenterProps> = ({
  main,
  isOpen,
  connectionId,
  name,
  photo,
  ...props
}) => (
  <>
    <Modal isOpen={isOpen} hideCloseBtn={true}>
      <Container component="main">
        <div className={styles.notion}>
          <div className="myHeadPhoto">
            <img src={photo} alt="" />
          </div>
          <div className="myName">{name}</div>
          <div className="btn">
            <Button
              color="secondary"
              onClick={(e) => main.video.sendRejectCall(connectionId)}
              type="submit"
              variant="contained"
            >
              また後で
            </Button>
            <Button
              color="primary"
              onClick={(e) => main.video.sendAcceptCall(connectionId)}
              type="submit"
              variant="contained"
            >
              いいよ！
            </Button>
          </div>
          <div className="loading">
            <div className="snippet" data-title=".dot-pulse">
              <div className="stage">
                <DotPulse />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Modal>
  </>
)

/** Container Component */
const ReceiveCallModalContainer: React.FC<
  ContainerProps<ReceiveCallModalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>

  if (_.size(main.video.members) === 0) return <></>

  const isOpen = main.video.nowCallReceiving

  const { connectionId, name, photo } = main.video.members[0]
  return presenter({
    children,
    main,
    isOpen,
    connectionId,
    name,
    photo,
    ...props,
  })
}

export default connect<ReceiveCallModalProps, PresenterProps>(
  'ReceiveCallModal',
  ReceiveCallModalPresenter,
  ReceiveCallModalContainer
)

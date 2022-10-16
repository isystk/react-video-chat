import React, { FC, useContext } from 'react'
import Modal from '@/components/01_atoms/Modal'
import DotPulse from '@/components/01_atoms/DotPulse'
import { Button } from '@mui/material'
import Container from '@mui/material/Container'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import * as _ from 'lodash'

/** SendCallModalProps Props */
export type SendCallModalProps = WithChildren
/** Presenter Props */
export type PresenterProps = SendCallModalProps & {
  main
  classes
  isOpen
  connectionId
  name
  photo
}

/** Presenter Component */
const SendCallModalPresenter: FC<PresenterProps> = ({
  main,
  classes,
  isOpen,
  connectionId,
  name,
  photo,
  ...props
}) => (
  <>
    <Modal isOpen={isOpen} hideCloseBtn={true}>
      <Container component="main">
        <div className={classes.notion}>
          <div className="myHeadPhoto">
            <img src={photo} alt="" />
          </div>
          <div className="myName">{name}</div>
          <div className="btn">
            <Button
              color="secondary"
              onClick={(e) => main.video.sendCancelCall(connectionId)}
              type="submit"
              variant="contained"
            >
              キャンセル
            </Button>
          </div>
          <div className="loading">
            <DotPulse />
          </div>
        </div>
      </Container>
    </Modal>
  </>
)

/** Container Component */
const SendCallModalContainer: React.FC<
  ContainerProps<SendCallModalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  if (_.size(main.video.members) === 0) return <></>

  const isOpen = main.video.nowCallSending

  const { connectionId, name, photo } = main.video.members[0]
  return presenter({
    children,
    main,
    classes,
    isOpen,
    connectionId,
    name,
    photo,
    ...props,
  })
}

export default connect<SendCallModalProps, PresenterProps>(
  'SendCallModal',
  SendCallModalPresenter,
  SendCallModalContainer
)

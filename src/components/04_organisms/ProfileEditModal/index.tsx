import React, { FC, useContext } from 'react'
import Modal from '@/components/01_atoms/Modal'
import { Button } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import * as _ from 'lodash'

/** ProfileEditModalProps Props */
export type ProfileEditModalProps = WithChildren
/** Presenter Props */
export type PresenterProps = ProfileEditModalProps & {
  main
  classes
  isOpen
  connectionId
  name
  photo
}

/** Presenter Component */
const ProfileEditModalPresenter: FC<PresenterProps> = ({
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
            <a href="#" className="photoEditBtn">編集</a>
          </div>
          <div className="myName">{name}</div>
          <div className="btn">
            <Button
              color="secondary"
              onClick={(e) => main.closeProfileEdit()}
              type="submit"
              variant="contained"
            >
              キャンセル
            </Button>
            <Button
              color="primary"
              onClick={(e) => main.storeProfile({})}
              type="submit"
              variant="contained"
            >
              保存する
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  </>
)

/** Container Component */
const ProfileEditModalContainer: React.FC<
  ContainerProps<ProfileEditModalProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const { connectionId, name, photo, isOpen } = main.self
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

export default connect<ProfileEditModalProps, PresenterProps>(
  'ProfileEditModal',
  ProfileEditModalPresenter,
  ProfileEditModalContainer
)

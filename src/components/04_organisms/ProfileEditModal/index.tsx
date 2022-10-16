import React, { FC, useContext, useState } from 'react'
import Modal from '@/components/01_atoms/Modal'
import { Button } from '@mui/material'
import Container from '@mui/material/Container'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import {
  imageCompression,
  fileToDataURL,
  imageCrop,
  promiseSetTimeout,
  base64ToImg,
} from '@/utils/general'

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
  handleClose,
  editProfilePhoto,
  ...props
}) => (
  <>
    <Modal isOpen={isOpen} hideCloseBtn={true}>
      <Container component="main">
        <div className={classes.notion}>
          <div className="myHeadPhoto">
            <img src={photo} alt="" id="profilePhoto" />
            <label className="photoEditBtn" onChange={editProfilePhoto}>
              <input type="file" />
              編集
            </label>
          </div>
          <div className="myName">{name}</div>
          <div className="btn">
            <Button
              color="secondary"
              onClick={handleClose}
              type="submit"
              variant="contained"
            >
              キャンセル
            </Button>
            <Button
              color="primary"
              onClick={(e) => main.storeProfile({ photo })}
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

  const [photo, setPhoto] = useState<string>(main.self.photo)

  const editProfilePhoto = async (e) => {
    const file = e.target.files[0]
    // 画像を圧縮する
    const cfile = await imageCompression(file)
    // 画像をBase64に変換する
    const base64 = await fileToDataURL(cfile)
    setPhoto(base64)
    // const image = await base64ToImg(base64);
    await promiseSetTimeout(true, 500)
    const image = document.getElementById('profilePhoto') as HTMLImageElement
    // 画像を中央でトリミングする
    const cropImage = await imageCrop(image)
    setPhoto(cropImage)
  }

  const handleClose = () => {
    setPhoto(main.self.photo)
    main.closeProfileEdit()
  }

  const { connectionId, name, isOpen } = main.self
  return presenter({
    children,
    main,
    classes,
    isOpen,
    connectionId,
    name,
    photo,
    handleClose,
    editProfilePhoto,
    ...props,
  })
}

export default connect<ProfileEditModalProps, PresenterProps>(
  'ProfileEditModal',
  ProfileEditModalPresenter,
  ProfileEditModalContainer
)

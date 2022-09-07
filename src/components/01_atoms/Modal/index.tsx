import React, { FC, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Fab } from '@material-ui/core'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'

/** ModalProps Props */
export type ModalProps = WithChildren & { isOpen, hideCloseBtn, handleClose }
/** Presenter Props */
export type PresenterProps = ModalProps & { classes, onClose, Portal }

/** Presenter Component */
const ModalPresenter: FC<PresenterProps> = ({
  children,
  classes,
  isOpen,
  hideCloseBtn,
  handleClose,
  onClose,
  Portal,
  ...props
}) => (
  <>
    <Portal>
      {isOpen && (
        <>
          <div className={classes.overlayBackground}></div>
          <div className={classes.overlay}>
            {!hideCloseBtn && (
              <Fab
                color="default"
                aria-label="add"
                className={classes.closeBtn}
              >
                <CloseIcon onClick={onClose}>
                  <span aria-hidden="true">&times;</span>
                </CloseIcon>
              </Fab>
            )}
            <div className={classes.wrap}>{children}</div>
          </div>
        </>
      )}
    </Portal>
  </>
)

/** Container Component */
const ModalContainer: React.FC<ContainerProps<ModalProps, PresenterProps>> = ({
  presenter,
  children,
  handleClose,
  ...props
}) => {
  const classes = useStyles()
  const onClose = (e) => {
    e.preventDefault()
    handleClose()
  }

  const Portal: FC = ({ children }) => {
    const ref = useRef<HTMLElement>()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      const current = document.querySelector<HTMLElement>('body')
      if (current) {
        ref.current = current
      }
      setMounted(true)
    }, [])

    return mounted
      ? ReactDOM.createPortal(
          <>{children}</>,
          ref.current ? ref.current : new Element()
        )
      : null
  }
  return presenter({ children, classes, onClose, Portal, ...props })
}

export default connect<ModalProps, PresenterProps>(
  'Modal',
  ModalPresenter,
  ModalContainer
)

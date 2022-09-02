import React, { FC, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Fab } from '@material-ui/core'

type Props = {
  isOpen: boolean
  hideCloseBtn?: boolean
  handleClose: () => void
}

const Modal: FC<Props> = ({ children, isOpen, hideCloseBtn, handleClose }) => {
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

  return (
    <Portal>
      {isOpen && <div id="overlay-background"></div>}
      <div className={`overlay ${isOpen ? 'open' : ''}`}>
        {!hideCloseBtn && (
          <Fab
            color="default"
            aria-label="add"
            style={{
              position: 'absolute',
              top: '5px',
              right: '10px',
              width: '35px',
              height: '20px',
            }}
          >
            <CloseIcon onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </CloseIcon>
          </Fab>
        )}
        <div className="wrap">{children}</div>
      </div>
    </Portal>
  )
}

export default Modal

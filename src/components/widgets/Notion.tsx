import React, { FC, useEffect, useState } from 'react'

import Main from '@/services/main'
import Modal from '@/components/widgets/Modal'
import { Button, CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'

type Props = {
  main: Main
}

const Notion: FC<Props> = ({ main }) => {

  if (main.video.connectionId == '') return <></>

  const isOpen = main.video.nowCallSending || main.video.nowCallReceiving

  const { connectionId, name, photo } = main.members[main.video.connectionId]

  return (
    <Modal isOpen={isOpen} hideCloseBtn={true}>
      <Container component="main" width="100px">
        <CssBaseline />
        <div className="notion">
          <div className="myHeadPhoto">
            <img src={photo} alt="" />
          </div>
          <div className="myName">{name}</div>
          {main.video.nowCallReceiving ? (
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
          ) : (
            <Button
              color="secondary"
              onClick={(e) => main.video.sendCancelCall(connectionId)}
              type="submit"
              variant="contained"
            >
              キャンセル
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  )
}

export default Notion

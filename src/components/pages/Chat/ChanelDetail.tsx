import * as React from 'react'
import Main from '@/services/main'
import { Button, TextField } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import VideocamIcon from '@material-ui/icons/Videocam'

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const ChanelDetail = ({ rtcClient }: IProps) => {
  return (
    <div className="me_block">
      <div className="myHeadPhoto">
        <img src="images/friends/David.png" alt="" />
      </div>
      <div className="myName">David</div>
      <div className="myVideo">
        <a href="#">
          <VideocamIcon />
        </a>
      </div>
    </div>
  )
}

export default ChanelDetail

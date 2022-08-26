import * as React from 'react'
import Main from '@/services/main'
import { Button, TextField } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const ChanelList = ({ rtcClient }: IProps) => {
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <div id="myChatList" className="chat_list" style={appStyle(windowHeight)}>
      <div className="chatListTag">
        <div className="head">
          <img src="images/friends/Alpha_Team.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">Alpha_Team</div>
          <div className="dec">Alpha チーム</div>
        </div>
        <div className="msg_num">3</div>
      </div>

      <div className="chatListTag active">
        <div className="head">
          <img src="images/friends/Beta_Team.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">Beta_Team</div>
          <div className="dec">Beta チーム</div>
        </div>
        <div className="msg_num">2</div>
      </div>

      <div className="chatListTag">
        <div className="head">
          <img src="images/friends/BigBoss.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">Big Boss</div>
          <div className="dec">管理者</div>
        </div>
      </div>

      <div className="chatListTag">
        <div className="head">
          <img src="images/friends/David.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">David</div>
          <div className="dec">エンジニア</div>
        </div>
        <div className="msg_num">7</div>
      </div>
    </div>
  )
}

const appStyle = (vh) => {
  return {
    height: vh - 64,
    overflowY: 'scroll',
  }
}

export default ChanelList

import * as React from 'react'
import Main from '@/services/main'
import * as _ from 'lodash'

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const ChanelList = ({ rtcClient }: IProps) => {
  return (
    <div id="myChatList" className="chat_list">

      {_.map(rtcClient.chanels, (chanel, index) => (
        <div className="chatListTag" key={index}>
          <div className="head">
            <img src={chanel.photo} alt="" />
          </div>
          <div className="mytext">
            <div className="name">{chanel.name}</div>
            <div className="dec">{chanel.detail}</div>
          </div>
          <div className="msg_num">7</div>
        </div>
      ))}
    </div>
  )
}

export default ChanelList

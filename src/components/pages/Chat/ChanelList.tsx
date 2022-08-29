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
      <div className="chatListTag">
        <div className="head">
          <img src="images/friends/Alpha_Team.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">すべて</div>
          <div className="dec">ルーム内のすべてのメンバー</div>
        </div>
        <div className="msg_num">3</div>
      </div>

      <div className="chatListTag">
        <div className="head">
          <img src="images/friends/BigBoss.png" alt="" />
        </div>
        <div className="mytext">
          <div className="name">{rtcClient.self.name}</div>
          <div className="dec">自分</div>
        </div>
      </div>

      {_.map(rtcClient.members, (member, index) => (
        <div className="chatListTag" key={index}>
          <div className="head">
            <img src="images/friends/David.png" alt="" />
          </div>
          <div className="mytext">
            <div className="name">{member.name}</div>
            <div className="dec"></div>
          </div>
          <div className="msg_num">7</div>
        </div>
      ))}
    </div>
  )
}

export default ChanelList

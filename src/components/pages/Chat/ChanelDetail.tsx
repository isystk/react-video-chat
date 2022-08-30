import * as React from 'react'
import Main from '@/services/main'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import * as _ from "lodash";

// ↓ 表示用のデータ型
interface IProps {
  rtcClient: Main
}

const ChanelDetail = ({ rtcClient }: IProps) => {
  
  if (_.size(rtcClient.chanels) === 0) return <></> 
  
  const {name, type, photo, detail} = rtcClient.chanels[rtcClient.selectChanelId]

  return (
    <div className="me_block">
      <div className="myHeadPhoto">
        <img src={photo} alt="" />
      </div>
      <div className="myName">{name}</div>
      <div className="myTitle">{detail}</div>
      <div className="myVideo">
        <a href="#">
          { 'other' === type ? <VideocamIcon />: <VideocamOffIcon /> }
        </a>
      </div>
    </div>
  )
}

export default ChanelDetail

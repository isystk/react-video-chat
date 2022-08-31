import * as React from 'react'
import Main from '@/services/main'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import * as _ from 'lodash'

// ↓ 表示用のデータ型
interface IProps {
  main: Main
}

const ChanelDetail = ({ main }: IProps) => {
  if (_.size(main.chanels) === 0) return <></>

  const { id, name, type, photo, detail } = main.chanels[main.selectChanelId]

  return (
    <div className="me_block">
      <div className="myHeadPhoto">
        <img src={photo} alt="" />
      </div>
      <div className="myName">{name}</div>
      <div className="myTitle">{detail}</div>
      <div className="myVideo">
        {'other' === type ? (
          <a href="#" onClick={() => main.video.sendRequestCall(id)}>
            <VideocamIcon />
          </a>
        ) : (
          <VideocamOffIcon />
        )}
      </div>
    </div>
  )
}

export default ChanelDetail

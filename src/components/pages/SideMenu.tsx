import React, { Dispatch, SetStateAction, VFC } from 'react'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import StopIcon from '@material-ui/icons/Stop'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import Main from '@/services/main'
import { URL } from '@/constants/url'
import ChanelList from '@/components/pages/Chat/ChanelList'
import Grid from '@material-ui/core/Grid'
import Chat from '@/components/pages/Chat/Chat'
import ChanelDetail from '@/components/pages/Chat/ChanelDetail'

type Props = {
  isMenuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  rtcClient: Main
}

const SideMenu: VFC<Props> = ({ isMenuOpen, setMenuOpen, rtcClient }) => {
  const router = useRouter()

  const RecoderIcon = rtcClient.recorder.isRecording
    ? StopIcon
    : FiberManualRecordIcon

  const joined = rtcClient.self.name !== '' && rtcClient.room.name !== ''

  const menu = {
    全画面: [
      <FullscreenIcon key={0} />,
      () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          }
        }
        setMenuOpen(!isMenuOpen)
      },
      false,
    ],
    デバイス設定: [
      <SettingsIcon key={0} />,
      async () => {
        if (!rtcClient.mediaDevice.isOpen) {
          await rtcClient.mediaDevice.openMediaDevice()
        }
        setMenuOpen(!isMenuOpen)
      },
      joined,
    ],
    退出: [
      <ExitToAppIcon key={0} />,
      async () => {
        await rtcClient.leave()
        await router.push(URL.HOME)
        setMenuOpen(!isMenuOpen)
      },
      !joined,
    ],
    録画: [
      <RecoderIcon key={0} />,
      async () => {
        if (rtcClient.recorder.isRecording) {
          await rtcClient.recorder.stopRecorder()
        } else {
          await rtcClient.recorder.startRecorder()
        }
        setMenuOpen(!isMenuOpen)
      },
      !joined,
    ],
    画面共有: [
      <ScreenShareIcon key={0} />,
      async () => {
        await rtcClient.share.startShare()
        setMenuOpen(!isMenuOpen)
      },
      !joined,
    ],
  }
  return (
    <Drawer open={isMenuOpen} onClose={() => setMenuOpen(!isMenuOpen)}>
      <div style={{ marginLeft: 'auto' }}>
        <IconButton onClick={() => setMenuOpen(!isMenuOpen)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className="pc-hide">
        <ChanelList rtcClient={rtcClient} />
        <Divider />
        <ChanelDetail rtcClient={rtcClient} />
        <Divider />
      </div>
      <List>
        {Object.keys(menu).map((key, index) => {
          const [icon, func, disabled] = menu[key]
          return (
            <ListItem button key={index} onClick={func} disabled={disabled}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={key} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default SideMenu

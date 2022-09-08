import React, { FC, useContext } from 'react'
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
import SettingsIcon from '@material-ui/icons/Settings'
import { useRouter } from 'next/router'
import { Url } from '@/constants/url'
import ChanelList from '@/components/03_molecules/ChanelList'
import ChanelInfo from '@/components/03_molecules/ChanelInfo'
import { ContainerProps, WithChildren } from 'types'
import { useStyles } from './styles'
import { connect } from '@/components/hoc'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

/** SideMenuProps Props */
export type SideMenuProps = WithChildren & { setMenuOpen; isMenuOpen }
/** Presenter Props */
export type PresenterProps = SideMenuProps & {
  main
  classes
  menu
  setMenuOpen
  isMenuOpen
}

/** Presenter Component */
const SideMenuPresenter: FC<PresenterProps> = ({
  main,
  classes,
  menu,
  setMenuOpen,
  isMenuOpen,
  ...props
}) => (
  <>
    <Drawer open={isMenuOpen} onClose={() => setMenuOpen(!isMenuOpen)}>
      <div style={{ marginLeft: 'auto' }}>
        <IconButton onClick={() => setMenuOpen(!isMenuOpen)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className="pc-hide">
        <ChanelList />
        <Divider />
      </div>
      <div className="pc-hide">
        <ChanelInfo />
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
  </>
)

/** Container Component */
const SideMenuContainer: React.FC<
  ContainerProps<SideMenuProps, PresenterProps>
> = ({ presenter, children, setMenuOpen, isMenuOpen, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()

  const router = useRouter()

  const RecoderIcon = main.recorder.isRecording
    ? StopIcon
    : FiberManualRecordIcon

  const joined = main.self.name !== '' && main.room.name !== ''

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
        if (!main.mediaDevice.isOpen) {
          await main.mediaDevice.openMediaDevice()
        }
        setMenuOpen(!isMenuOpen)
      },
      joined,
    ],
    退出: [
      <ExitToAppIcon key={0} />,
      async () => {
        await main.leave()
        await router.push(Url.TOP)
        setMenuOpen(!isMenuOpen)
      },
      !joined,
    ],
    録画: [
      <RecoderIcon key={0} />,
      async () => {
        if (main.recorder.isRecording) {
          await main.recorder.stopRecorder()
        } else {
          await main.recorder.startRecorder()
        }
        setMenuOpen(!isMenuOpen)
      },
      !joined,
    ],
  }
  return presenter({
    children,
    main,
    classes,
    menu,
    setMenuOpen,
    isMenuOpen,
    ...props,
  })
}

export default connect<SideMenuProps, PresenterProps>(
  'SideMenu',
  SideMenuPresenter,
  SideMenuContainer
)

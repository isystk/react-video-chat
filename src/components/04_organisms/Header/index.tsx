import React, { FC, useContext } from 'react'
import { ContainerProps, WithChildren } from 'types'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { useState } from 'react'
import * as _ from 'lodash'
import { connect } from '@/components/hoc'
import Logo from '@/components/01_atoms/Logo'
import { useStyles } from './styles'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import ProfileEditModal from '@/components/04_organisms/ProfileEditModal'

/** HeaderProps Props */
export type HeaderProps = WithChildren & { isMenuOpen; setMenuOpen }
/** Presenter Props */
export type PresenterProps = HeaderProps & { classes; anchorEl; setAnchorEl }

/** Presenter Component */
const HeaderPresenter: FC<PresenterProps> = ({
  main,
  isMenuOpen,
  setMenuOpen,
  classes,
  anchorEl,
  setAnchorEl,
}) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setMenuOpen(!isMenuOpen)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Logo name={main.room.name} />
        <Typography variant="h6" component="div" className={classes.title}>
          {main.self.name !== '' && main.room.name !== '' && (
            <div className={classes.members}>
              <PeopleAltIcon></PeopleAltIcon>
              <span>{_.size(_.filter(main.members, (e) => e.online)) + 1}</span>
            </div>
          )}
        </Typography>
        {main.self.name === '' ? (
          <></>
        ) : (
          <>
            <Button
              color="inherit"
              aria-owns={anchorEl ? 'user-menu' : undefined}
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {main.self.name} さん
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClick={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={async () => {
                  await main.openProfileEdit()
                }}
              >
                プロフィール編集
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await main.signOut()
                }}
              >
                ログアウト
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
    <ProfileEditModal />
  </>
)

/** Container Component */
const HeaderContainer: React.FC<
  ContainerProps<HeaderProps, PresenterProps>
> = ({ presenter, children, ...props }) => {
  const main = useContext<MainService | null>(Context)
  if (!main) return <></>
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  return presenter({
    children,
    main,
    classes,
    ...props,
    anchorEl,
    setAnchorEl,
  })
}

export default connect<HeaderProps, PresenterProps>(
  'Header',
  HeaderPresenter,
  HeaderContainer
)

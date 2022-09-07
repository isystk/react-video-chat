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
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { useState } from 'react'
import * as _ from 'lodash'
import { connect } from '@/components/hoc'
import Logo from '@/components/01_atoms/Logo'
import { useStyles } from './styles'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

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
        <Logo />
        <Typography variant="h6" component="div" className={classes.title}>
          {main.self.name !== '' && main.room.name !== '' && (
            <div className="Room-joins">
              <PeopleAltIcon></PeopleAltIcon>
              <span>{_.size(main.members) + 1}</span>
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

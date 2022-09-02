import React, { Dispatch, SetStateAction, useContext, FC } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Grid,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { useState } from 'react'
import Main from '@/services/main'
import { makeStyles } from '@material-ui/core/styles'
import * as _ from 'lodash'

type Props = {
  isMenuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  main: Main
}

const useStyles = makeStyles(() => ({
  noTransform: {
    textTransform: 'none', // #1
  },
}))

const CommonHeader: FC<Props> = ({ isMenuOpen, setMenuOpen, main }) => {
  const DEAULT_TITLE = process.env.APP_NAME
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" className="App-header">
        <Toolbar>
          <Grid container>
            <IconButton
              color="inherit"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
            <div className="App-logo">{main.room.name || DEAULT_TITLE}</div>
            {main.self.name !== '' && main.room.name !== '' && (
              <div className="Room-joins">
                <PeopleAltIcon></PeopleAltIcon>
                <span>{_.size(main.members) + 1}</span>
              </div>
            )}
          </Grid>
          {main.self.name === '' ? (
            <></>
          ) : (
            <Grid container justifyContent="flex-end">
              <Button
                color="inherit"
                aria-owns={anchorEl ? 'user-menu' : undefined}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                className={classes.noTransform}
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
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default CommonHeader

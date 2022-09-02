import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '@/stores/useAppRoot'
import Header from '@/components/pages/Header'
import SideMenu from '@/components/pages/SideMenu'

export const Context = React.createContext(null)

const Layout: FC = ({ children }) => {
  const main = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  if (!main) return <></>

  const newProps = { children, main }
  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => React.cloneElement(child, { ...newProps })
  )

  return (
    <>
      <Context.Provider value={main}>
        <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} main={main} />
        <div style={appStyle(windowHeight)}>{childrenWithProps}</div>
        <SideMenu
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          main={main}
        />
      </Context.Provider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
}

const appStyle = (vh) => {
  return {
    //   height: vh,
    //   width: '100vw',
    //   overflow: 'scroll',
    //   display: 'flex',
    //   justifyContent: 'center',
  }
}
export default Layout

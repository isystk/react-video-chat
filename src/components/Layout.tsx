import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '@/stores/useAppRoot'
import Header from '@/components/pages/Header'
import SideMenu from '@/components/pages/SideMenu'

const Layout: FC = ({ children }) => {
  const main = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (!main) return <></>

  const newProps = { children, main }
  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => React.cloneElement(child, { ...newProps })
  )

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} main={main} />
      <div>{childrenWithProps}</div>
      <SideMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} main={main} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
}

export default Layout

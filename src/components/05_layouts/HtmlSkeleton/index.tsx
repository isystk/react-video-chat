import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import useAppRoot from '@/stores/useAppRoot'
import Header from '@/components/pages/Header'
import SideMenu from '@/components/pages/SideMenu'

const HtmlSkeleton: FC = ({ children }) => {
  const main = useAppRoot()
  const [isMenuOpen, setMenuOpen] = useState(false)

  if (!main) return <></>

  const childrenWithProps = React.Children.map(
    children,
    (child: React.ReactElement) => React.cloneElement(child, children)
  )

  return (
    <>
      <Context.Provider value={main}>
        <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} main={main} />
        <div>{childrenWithProps}</div>
        <SideMenu
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          main={main}
        />
      </Context.Provider>
    </>
  )
}

HtmlSkeleton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
}

export const Context = React.createContext(null)

export default HtmlSkeleton 

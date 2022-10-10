import { Meta, Story } from '@storybook/react'
import React from 'react'
import SideMenu from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/SideMenu',
  component: SideMenu,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = { '1': { id: '1', name: 'test', description: 'test' } }
  main.room.setRoomId('1')
  return (
    <Context.Provider value={main}>
      <SideMenu
        setMenuOpen={(isOpen) => console.log(isOpen)}
        isMenuOpen={true}
      />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

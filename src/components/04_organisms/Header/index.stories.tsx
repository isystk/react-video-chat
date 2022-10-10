import { Meta, Story } from '@storybook/react'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import React from 'react'
import Header from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/Header',
  component: Header,
} as Meta

const Template: Story = ({ name = '', roomId = '' }) => {
  const main = new MainService(() => ({}))
  main.setName(name)
  main.room.rooms = { '1': { id: '1', name: 'test', description: 'test' } }
  main.room.setRoomId('1')
  return (
    <Context.Provider value={main}>
      <Header
        isMenuOpen={false}
        setMenuOpen={(isOpen) => console.log(isOpen)}
      />
    </Context.Provider>
  )
}

export const Logout = Template.bind({})
Logout.storyName = 'ログアウト'
Logout.args = {}

export const Login = Template.bind({})
Login.storyName = 'ログイン'
Login.args = {
  name: 'isystk',
  roomId: 'test',
}

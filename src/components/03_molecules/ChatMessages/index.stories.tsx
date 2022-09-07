import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChatMessages from './index'
import MainService from '@/services/main'
import ChanelService from '@/services/Chanel'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '03_molecules/ChatMessages',
  component: ChatMessages,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.setRoomId('test')
  main.addChanel(
    new ChanelService(
      main,
      'all',
      'すべて',
      'all',
      'images/friends/Alpha_Team.png',
      'ルーム内のすべてのメンバー'
    )
  )
  main.setChanelId('all')
  main.addMember({
    connectionId: 'bbb',
    name: 'bbb',
    photo: 'images/friends/David.png',
  })
  main.self.connectionId = 'aaa'
  main.chanels['all'].chat.messages = [
    {
      type: 'text',
      data: 'hello',
      chanelId: 'all',
      sendId: 'aaa',
      datetime: '2022-09-07 12:00:00',
    },
    {
      type: 'stamp',
      data: 'smile',
      chanelId: 'all',
      sendId: 'aaa',
      datetime: '2022-09-07 13:00:00',
    },
    {
      type: 'text',
      data: 'see you',
      chanelId: 'all',
      sendId: 'bbb',
      datetime: '2022-09-07 14:00:00',
    },
  ]

  return (
    <Context.Provider value={main}>
      <ChatMessages />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

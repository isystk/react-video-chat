import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChatTemplate from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import ChanelService from '@/services/Chanel'

export default {
  title: '06_templates/ChatTemplate',
  component: ChatTemplate,
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

  return (
    <Context.Provider value={main}>
      <ChatTemplate />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChatTemplate, { ChatTemplateProps } from './index'
import MainService from '@/services/main'
import ChanelService from '@/services/Chanel'

export default {
  title: '06_templates/ChatTemplate',
  component: ChatTemplate,
} as Meta

const Template: Story = () => {
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
  main.setChanelId('all')
  main.setAppRoot()
  const props: ChatTemplateProps = { main }
  return <ChatTemplate {...props} />
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

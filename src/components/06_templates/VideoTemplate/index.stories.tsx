import { Meta, Story } from '@storybook/react'
import React from 'react'
import VideoTemplate from './index'
import MainService, { Member } from '@/services/main'
import ChanelService from '@/services/Chanel'

export default {
  title: '06_templates/VideoTemplate',
  component: VideoTemplate,
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
  main.addMember({
    connectionId: 'aaa',
    name: 'aaa',
    photo: 'images/friends/BigBoss.png',
  } as Member)
  main.setChanelId('all')
  main.video.isPeerConnected = true
  main.video.members = [
    {
      connectionId: 'aaa',
      name: 'aaa',
      photo: 'images/friends/BigBoss.png',
    } as Member,
  ]
  const props: VideoTemplate = {main}
  return (
    <VideoTemplate {...props}/>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

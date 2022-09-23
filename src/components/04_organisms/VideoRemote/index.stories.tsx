import { Meta, Story } from '@storybook/react'
import React from 'react'
import VideoRemote from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/VideoRemote',
  component: VideoRemote,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.setRoomId('test')
  main.addMember({
    connectionId: 'bbb',
    name: 'bbb',
    photo: 'images/friends/David.png',
  })

  return (
    <Context.Provider value={main}>
      <VideoRemote member={main.members['bbb']} />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

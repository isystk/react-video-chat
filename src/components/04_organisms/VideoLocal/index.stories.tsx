import { Meta, Story } from '@storybook/react'
import React from 'react'
import VideoLocal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/VideoLocal',
  component: VideoLocal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = [{ id: 1, name: 'test', description: 'test' }]
  main.room.setRoomId(1)
  return (
    <Context.Provider value={main}>
      <VideoLocal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

import { Meta, Story } from '@storybook/react'
import React from 'react'
import SendCallModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/SendCallModal',
  component: SendCallModal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = [{ id: 1, name: 'test', description: 'test' }]
  main.room.setRoomId(1)
  main.addMember({
    connectionId: 'bbb',
    name: 'bbb',
    photo: 'images/friends/David.png',
  })
  main.video.members = [
    {
      connectionId: 'bbb',
      name: 'bbb',
      photo: 'images/friends/David.png',
    },
  ]
  main.video.nowCallSending = true
  return (
    <Context.Provider value={main}>
      <SendCallModal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

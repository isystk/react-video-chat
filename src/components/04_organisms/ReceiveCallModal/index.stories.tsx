import { Meta, Story } from '@storybook/react'
import React from 'react'
import ReceiveCallModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/ReceiveCallModal',
  component: ReceiveCallModal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.setRoomId('test')
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
  main.video.nowCallReceiving= true
  return (
    <Context.Provider value={main}>
      <ReceiveCallModal/>
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

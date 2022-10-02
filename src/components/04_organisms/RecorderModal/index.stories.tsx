import { Meta, Story } from '@storybook/react'
import React from 'react'
import RecorderModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/RecorderModal',
  component: RecorderModal,
} as Meta

const Template: Story = () => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = [{ id: 1, name: 'test', description: 'test' }]
  main.room.setRoomId(1)
  main.recorder.isOpen = true
  return (
    <Context.Provider value={main}>
      <RecorderModal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

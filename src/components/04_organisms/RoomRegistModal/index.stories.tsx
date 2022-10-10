import { Meta, Story } from '@storybook/react'
import React from 'react'
import RoomRegistModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/RoomRegistModal',
  component: RoomRegistModal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.room.isOpen = true
  return (
    <Context.Provider value={main}>
      <RoomRegistModal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

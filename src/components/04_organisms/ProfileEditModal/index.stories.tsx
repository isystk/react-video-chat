import { Meta, Story } from '@storybook/react'
import React from 'react'
import ProfileEditModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/ProfileEditModal',
  component: ProfileEditModal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = { '1': { id: '1', name: 'test', description: 'test' } }
  main.room.setRoomId('1')
  main.self.isOpen = true
  return (
    <Context.Provider value={main}>
      <ProfileEditModal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

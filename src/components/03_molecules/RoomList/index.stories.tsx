import { Meta, Story } from '@storybook/react'
import React from 'react'
import RoomList from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '03_molecules/RoomList',
  component: RoomList,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.room.rooms = {
    '1': {
      id: '1',
      name: 'test1',
      description: 'this is test1',
      createdAt: '2022-10-01',
    },
    '2': {
      id: '2',
      name: 'test2',
      description: 'this is test2',
      createdAt: '2022-10-02',
    },
    '3': {
      id: '3',
      name: 'test3',
      description: 'this is test3',
      createdAt: '2022-10-03',
    },
  }

  return (
    <Context.Provider value={main}>
      <RoomList />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

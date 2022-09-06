import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChatMessages from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/ChatMessages',
  component: ChatMessages,
} as Meta

const main = {
  self: {
    connectionId: 'aaa',
    name: 'aaa',
    photo: 'images/friends/BigBoss.png',
  },
  members: {
    aaa: {
      connectionId: 'aaa',
      name: 'aaa',
      photo: 'images/friends/BigBoss.png',
    },
  },
  chanels: {
    all: {
      id: 'all',
      name: 'すべて',
      type: 'all',
      photo: 'images/friends/Alpha_Team.png',
      detail: 'ルーム内のすべてのメンバー',
      chat: {
        chanelId: 'test',
        messages: [
          {
            type: 'text',
            data: 'hello',
            sendId: 'aaa',
            datetime: Date(),
          },
        ],
      },
    },
  },
  selectChanelId: 'all',
} as MainService

const Template: Story = () => <ChatMessages main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

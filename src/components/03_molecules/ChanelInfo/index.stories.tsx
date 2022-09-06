import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChanelInfo from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/ChanelInfo',
  component: ChanelInfo,
} as Meta

const main = {
  chanels: {
    all: {
      id: 'all',
      name: 'すべて',
      type: 'all',
      photo: 'images/friends/Alpha_Team.png',
      detail: 'ルーム内のすべてのメンバー',
      chat: {
        chanelId: 'test',
        messages: [],
      },
    },
  },
  selectChanelId: 'all',
} as MainService

const Template: Story = () => <ChanelInfo main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

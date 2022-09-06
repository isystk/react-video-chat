import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChanelList from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/ChanelList',
  component: ChanelList,
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
    own: {
      id: 'own',
      name: '自分',
      type: 'own',
      photo: 'images/friends/BigBoss.png',
      detail: '自分',
      chat: {
        chanelId: 'test',
        messages: [],
      },
    },
  },
} as MainService

const Template: Story = () => <ChanelList main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

import { Meta, Story } from '@storybook/react'
import React from 'react'
import VideoRemote from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/VideoRemote',
  component: VideoRemote,
} as Meta

const main = {
  self: {
    name: 'isystk',
  },
  members: {
    aaa: {
      connectionId: 'aaa',
      name: 'aaa',
      photo: 'images/friends/BigBoss.png',
    },
    bbb: {
      connectionId: 'bbb',
      name: 'bbb',
      photo: 'images/friends/David.png',
    },
  },
} as MainService

const Template: Story = () => (
  <VideoRemote main={main} member={main.members['aaa']} />
)

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

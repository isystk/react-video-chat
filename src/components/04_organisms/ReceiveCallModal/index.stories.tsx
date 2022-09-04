import { Meta, Story } from '@storybook/react'
import React from 'react'
import ReceiveCallModal from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/ReceiveCallModal',
  component: ReceiveCallModal,
} as Meta

const main = {
  video: {
    members: [
      {
        name: 'aaa',
        photo: '/images/friends/David.png'
      },
    ],
    nowCallReceiving: true
  }
} as MainService

const Template: Story = () => <ReceiveCallModal main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

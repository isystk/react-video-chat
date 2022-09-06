import { Meta, Story } from '@storybook/react'
import React from 'react'
import SendCallModal from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/SendCallModal',
  component: SendCallModal,
} as Meta

const main = {
  video: {
    members: [
      {
        name: 'aaa',
        photo: '/images/friends/David.png',
      },
    ],
    nowCallSending: true,
  },
} as MainService

const Template: Story = () => <SendCallModal main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

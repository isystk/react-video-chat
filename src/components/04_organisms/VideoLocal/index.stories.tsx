import { Meta, Story } from '@storybook/react'
import React from 'react'
import VideoLocal from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/VideoLocal',
  component: VideoLocal,
} as Meta

const main = {
  self: {
    name: 'isystk',
  },
  mediaDevice: {
    mediaStream: navigator.mediaDevices.getUserMedia(),
  },
} as MainService

const Template: Story = () => {
  return <VideoLocal main={main} />
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

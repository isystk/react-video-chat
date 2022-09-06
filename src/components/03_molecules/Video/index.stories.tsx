import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'
import Video from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/Video',
  component: Video,
} as Meta

const main = {
  self: {
    name: 'isystk',
  },
} as MainService

const Template: Story = () => {
  const videoRef = useRef(null)
  return (
    <Video isLocal={true} member={main.self} main={main} videoRef={videoRef} />
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

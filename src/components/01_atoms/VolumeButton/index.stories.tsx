import { Meta, Story } from '@storybook/react'
import React from 'react'
import VolumeButton from './index'

export default {
  title: '01_atoms/VolumeButton',
  component: VolumeButton,
} as Meta

const Template: Story = (props) => {
  return <VolumeButton {...props} />
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = { isMute: false }

export const Mute = Template.bind({})
Mute.storyName = 'ミュート'
Mute.args = { isMute: true }

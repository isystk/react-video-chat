import { Meta, Story } from '@storybook/react'
import React from 'react'
import VolumeButton from './index'
import MainService from '@/services/main'

export default {
  title: '01_atoms/VolumeButton',
  component: VolumeButton,
} as Meta

const main = {} as MainService

const Template: Story = () => <VolumeButton main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

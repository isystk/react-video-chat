import { Meta, Story } from '@storybook/react'
import React from 'react'
import RecorderModal from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/RecorderModal',
  component: RecorderModal,
} as Meta

const main = {
  recorder: {
    isOpen: true
  }
} as MainService

const Template: Story = () => <RecorderModal main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

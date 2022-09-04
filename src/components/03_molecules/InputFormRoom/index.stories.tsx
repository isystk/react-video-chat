import { Meta, Story } from '@storybook/react'
import React from 'react'
import InputFormRoom from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/InputFormRoom',
  component: InputFormRoom,
} as Meta

const main = {
  self: {
    name: 'isystk',
  },
  room: {
    name: '',
  },
} as MainService

const Template: Story = () => <InputFormRoom main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

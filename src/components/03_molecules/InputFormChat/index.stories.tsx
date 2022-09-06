import { Meta, Story } from '@storybook/react'
import React from 'react'
import InputFormChat from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/InputFormChat',
  component: InputFormChat,
} as Meta

const main = {
  self: {
    name: '',
  },
} as MainService

const Template: Story = () => <InputFormChat main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

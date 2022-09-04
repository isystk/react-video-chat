import { Meta, Story } from '@storybook/react'
import React from 'react'
import InputFormName from './index'
import MainService from '@/services/main'

export default {
  title: '03_molecules/InputFormName',
  component: InputFormName,
} as Meta

const main = {
  self: {
    name: '',
  },
} as MainService

const Template: Story = () => <InputFormName main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

import { Meta, Story } from '@storybook/react'
import React from 'react'
import Logo from './index'
import MainService from "@/services/main";

export default {
  title: '01_atoms/Logo',
  component: Logo,
} as Meta

const main = {
  room: {
    name: 'test',
  }
} as MainService

const Template: Story = () => <Logo main={main} />

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

import { Meta, Story } from '@storybook/react'
import React from 'react'
import SideMenu from './index'
import MainService from '@/services/main'

export default {
  title: '04_organisms/SideMenu',
  component: SideMenu,
} as Meta

const main = {
  self: {
    name: 'isystk',
  },
  room: {
    name: 'test',
  },
  recorder: {
    isRecording: false,
  },
} as MainService

const Template: Story = () => (
  <SideMenu
    main={main}
    setMenuOpen={(isOpen) => console.log(isOpen)}
    isMenuOpen={true}
  />
)

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

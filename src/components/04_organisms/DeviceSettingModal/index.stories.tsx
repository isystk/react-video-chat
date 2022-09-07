import { Meta, Story } from '@storybook/react'
import React from 'react'
import DeviceSettingModal from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '04_organisms/DeviceSettingModal',
  component: DeviceSettingModal,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.mediaDevice.isOpen = true
  return (
    <Context.Provider value={main}>
      <DeviceSettingModal />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

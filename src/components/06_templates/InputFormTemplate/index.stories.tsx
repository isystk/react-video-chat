import { Meta, Story } from '@storybook/react'
import React from 'react'
import InputFormTemplate from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '06_templates/InputFormTemplate',
  component: InputFormTemplate,
} as Meta

const Template: Story = ({ name = '' }) => {
  const main = new MainService(() => ({}))
  main.setName(name)
  return (
    <Context.Provider value={main}>
      <InputFormTemplate />
    </Context.Provider>
  )
}

export const InputYourName = Template.bind({})
InputYourName.storyName = 'あなたのお名前を入力'
InputYourName.args = {}

export const InputRoomName = Template.bind({})
InputRoomName.storyName = '部屋の名前を入力'
InputRoomName.args = { name: 'isystk' }

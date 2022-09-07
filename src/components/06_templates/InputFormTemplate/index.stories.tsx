import { Meta, Story } from '@storybook/react'
import React from 'react'
import InputFormTemplate from './index'
import MainService from '@/services/main'

export default {
  title: '06_templates/InputFormTemplate',
  component: InputFormTemplate,
} as Meta

const Template: Story = ({ name = '' }) => {
  const main = new MainService(() => ({}))
  main.setName(name)
  const props: InputFormTemplate = {main}
  return (
    <InputFormTemplate {...props} />
  )
}

export const InputYourName = Template.bind({})
InputYourName.storyName = 'あなたのお名前を入力'
InputYourName.args = {}

export const InputRoomName = Template.bind({})
InputRoomName.storyName = '部屋の名前を入力'
InputRoomName.args = { name: 'isystk' }

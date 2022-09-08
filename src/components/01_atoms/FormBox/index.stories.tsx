import { Meta, Story } from '@storybook/react'
import React from 'react'
import FormBox from './index'

export default {
  title: '01_atoms/FormBox',
  component: FormBox,
} as Meta

const Template: Story = (props) => {
  return <FormBox title="sample" />
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

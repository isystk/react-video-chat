import { Meta, Story } from '@storybook/react'
import React from 'react'
import SelectRoom from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '03_molecules/SelectRoom',
  component: SelectRoom,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')

  return (
    <Context.Provider value={main}>
      <SelectRoom />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

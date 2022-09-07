import { Meta, Story } from '@storybook/react'
import React from 'react'
import Circles from './index'

export default {
  title: '01_atoms/Circles',
  component: Circles,
} as Meta

const Template: Story = (props) => {
  return (
    <Circles>
      <div
        style={{
          width: '100%',
          height: '600px',
          background: '#eee',
        }}
      ></div>
    </Circles>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

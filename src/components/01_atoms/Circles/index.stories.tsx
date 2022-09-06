import { Meta, Story } from '@storybook/react'
import React from 'react'
import Circles from './index'
import MainService from '@/services/main'

export default {
  title: '01_atoms/Circles',
  component: Circles,
} as Meta

const main = {
  room: {
    name: 'test',
  },
} as MainService

const Template: Story = () => (
      <Circles>
        <div style={{
          width: '100%',
          height: '600px',
          background: '#eee'
        }}>
        </div>
      </Circles>
)

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'

import { Meta, Story } from '@storybook/react'
import React from 'react'
import ErrorTemplate from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '06_templates/ErrorTemplate',
  component: ErrorTemplate,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  return (
    <Context.Provider value={main}>
      <ErrorTemplate statusCode="404" />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'
import Video from './index'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

export default {
  title: '03_molecules/Video',
  component: Video,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  const videoRef = useRef(null)
  return (
    <Context.Provider value={main}>
      <Video isLocal={true} member={main.self} videoRef={videoRef} />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

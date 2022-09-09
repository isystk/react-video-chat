import { Meta, Story } from '@storybook/react'
import React from 'react'
import ChanelList from './index'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import ChanelService from '@/services/chanel'

export default {
  title: '03_molecules/ChanelList',
  component: ChanelList,
} as Meta

const Template: Story = (props) => {
  const main = new MainService(() => ({}))
  main.setName('isystk')
  main.setRoomId('test')
  main.addChanel(
    new ChanelService(
      main,
      'all',
      'すべて',
      'all',
      'images/friends/Alpha_Team.png',
      'ルーム内のすべてのメンバー'
    )
  )
  main.addChanel(
    new ChanelService(
      main,
      'own',
      '自分',
      'all',
      'images/friends/BigBoss.png',
      'BigBoss'
    )
  )
  main.setChanelId('all')

  return (
    <Context.Provider value={main}>
      <ChanelList />
    </Context.Provider>
  )
}

export const Primary = Template.bind({})
Primary.storyName = 'プライマリ'
Primary.args = {}

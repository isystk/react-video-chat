import { Meta, Story } from '@storybook/react'
import React from 'react'
import Header from './index'

export default {
  title: '04_organisms/Header',
  component: Header,
} as Meta

const mainLogout = {
  room: { name: '' },
  self: { name: '' },
}
export const Logout: Story = () => (
  <Header isMenuOpen={false} setMenuOpen={() => ({})} main={mainLogout} />
)
Logout.storyName = 'ログアウト'

const mainLogin = {
  room: { name: 'test' },
  self: { name: 'isystk' },
}
export const Login: Story = () => (
  <Header isMenuOpen={false} setMenuOpen={() => ({})} main={mainLogin} />
)
Login.storyName = 'ログイン'

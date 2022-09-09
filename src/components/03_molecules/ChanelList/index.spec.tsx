import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import ChanelList from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import ChanelService from '@/services/chanel'

describe('ChanelList', () => {
  it('Match Snapshot', () => {
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

    const component = renderer.create(
      <Context.Provider value={main}>
        <ChanelList />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

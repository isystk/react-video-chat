import React from 'react'
import renderer from 'react-test-renderer'
import ChanelInfo from './index'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import ChanelService from '@/services/chanel'

describe('ChanelInfo', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.rooms = { '1': { id: '1', name: 'test', description: 'test' } }
    main.room.setRoomId('1')
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
    main.setChanelId('all')

    const component = renderer.create(
      <Context.Provider value={main}>
        <ChanelInfo />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

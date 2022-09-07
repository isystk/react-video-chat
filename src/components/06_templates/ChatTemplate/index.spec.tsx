import React from 'react'
import renderer from 'react-test-renderer'
import ChatTemplate from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import ChanelService from '@/services/Chanel'

describe('ChatTemplate', () => {
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
    main.setChanelId('all')

    const component = renderer.create(
      <Context.Provider value={main}>
        <ChatTemplate />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

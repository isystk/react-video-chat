import React from 'react'
import renderer from 'react-test-renderer'
import ChatMessages from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'
import ChanelService from '@/services/chanel'

describe('ChatMessages', () => {
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
    main.addMember({
      connectionId: 'bbb',
      name: 'bbb',
      photo: 'images/friends/David.png',
    })
    main.self.connectionId = 'aaa'
    main.chanels['all'].chat.messages = [
      {
        type: 'text',
        data: 'hello',
        chanelId: 'all',
        sendId: 'aaa',
        datetime: new Date('2022-09-07 12:00:00'),
      },
      {
        type: 'stamp',
        data: 'smile',
        chanelId: 'all',
        sendId: 'aaa',
        datetime: new Date('2022-09-07 13:00:00'),
      },
      {
        type: 'text',
        data: 'see you',
        chanelId: 'all',
        sendId: 'bbb',
        datetime: new Date('2022-09-07 14:00:00'),
      },
    ]

    const component = renderer.create(
      <Context.Provider value={main}>
        <ChatMessages />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

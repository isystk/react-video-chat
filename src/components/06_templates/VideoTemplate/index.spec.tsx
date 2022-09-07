import React from 'react'
import renderer from 'react-test-renderer'
import VideoTemplate from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService, { Member } from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import ChanelService from '@/services/Chanel'

describe('VideoTemplate', () => {
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
    main.addMember({
      connectionId: 'aaa',
      name: 'aaa',
      photo: 'images/friends/BigBoss.png',
    } as Member)
    main.setChanelId('all')
    main.video.isPeerConnected = true
    main.video.members = [
      {
        connectionId: 'aaa',
        name: 'aaa',
        photo: 'images/friends/BigBoss.png',
      } as Member,
    ]

    const component = renderer.create(
      <Context.Provider value={main}>
        <VideoTemplate />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

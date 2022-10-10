import React from 'react'
import renderer from 'react-test-renderer'
import VideoTemplate, { VideoTemplateProps } from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService, { Member } from '@/services/main'
import ChanelService from '@/services/chanel'
import { Provider } from 'react-redux'
import { store } from '@/stores'

describe('VideoTemplate', () => {
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

    const props: VideoTemplateProps = { main }
    const component = renderer.create(
      <Provider store={store}>
        <VideoTemplate {...props} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

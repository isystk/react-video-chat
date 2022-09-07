import React from 'react'
import renderer from 'react-test-renderer'
import VideoTemplate, {VideoTemplateProps} from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService, { Member } from '@/services/main'
import ChanelService from '@/services/Chanel'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import reducers from '@/stores'

describe('VideoTemplate', () => {
  it('Match Snapshot', () => {
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, enhancer)
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

    const props: VideoTemplateProps = {main}
    const component = renderer.create(
      <Provider store={store}>
        <VideoTemplate {...props} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

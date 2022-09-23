import React from 'react'
import renderer from 'react-test-renderer'
import ChatTemplate, { ChatTemplateProps } from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import ChanelService from '@/services/chanel'
import { Provider } from 'react-redux'
import { store } from '@/stores'

describe('ChatTemplate', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.setRoomId('test')
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
    const props: ChatTemplateProps = { main }
    const component = renderer.create(
      <Provider store={store}>
        <ChatTemplate {...props} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import ChatTemplate, { ChatTemplateProps } from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import ChanelService from '@/services/Chanel'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from '@/stores'

describe('ChatTemplate', () => {
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

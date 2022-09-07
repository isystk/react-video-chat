import React from 'react'
import renderer from 'react-test-renderer'
import SendCallModal from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

describe('SendCallModal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.setRoomId('test')
    main.addMember({
      connectionId: 'bbb',
      name: 'bbb',
      photo: 'images/friends/David.png',
    })
    main.video.members = [
      {
        connectionId: 'bbb',
        name: 'bbb',
        photo: 'images/friends/David.png',
      },
    ]
    main.video.nowCallSending = true
    const component = renderer.create(
      <Context.Provider value={main}>
        <SendCallModal />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

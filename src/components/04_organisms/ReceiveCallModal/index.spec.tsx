import React from 'react'
import renderer from 'react-test-renderer'
import ReceiveCallModal from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

describe('ReceiveCallModal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.rooms = [{ id: 1, name: 'test', description: 'test' }]
    main.room.setRoomId(1)
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
    main.video.nowCallReceiving = true
    const component = renderer.create(
      <Context.Provider value={main}>
        <ReceiveCallModal />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

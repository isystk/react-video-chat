import React from 'react'
import renderer from 'react-test-renderer'
import VideoRemote from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

describe('VideoRemote', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.setRoomId('test')
    main.addMember({
      connectionId: 'bbb',
      name: 'bbb',
      photo: 'images/friends/David.png',
    })

    const component = renderer.create(
      <Context.Provider value={main}>
        <VideoRemote member={main.members['bbb']} />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

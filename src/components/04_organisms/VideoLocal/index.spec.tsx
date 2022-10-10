import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import VideoLocal from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

describe('VideoLocal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.rooms = { '1': { id: '1', name: 'test', description: 'test' } }
    main.room.setRoomId('1')
    const component = renderer.create(
      <Context.Provider value={main}>
        <VideoLocal />
      </Context.Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import VideoLocal from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from "@/services/main";

describe('VideoLocal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.setRoomId('test')
    const component = renderer.create(
      <Context.Provider value={main}>
        <VideoLocal />
      </Context.Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

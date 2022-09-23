import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import RecorderModal from './index'
import '@testing-library/jest-dom/extend-expect'
import { renderHook } from '@testing-library/react-hooks'
import Main from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

describe('RecorderModal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.room.setRoomId('test')
    main.recorder.isOpen = true
    const component = renderer.create(
      <Context.Provider value={main}>
        <RecorderModal />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

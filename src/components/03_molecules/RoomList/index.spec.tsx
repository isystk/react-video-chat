import React from 'react'
import renderer from 'react-test-renderer'
import RoomList from './index'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'

describe('RoomList', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')

    const component = renderer.create(
      <Context.Provider value={main}>
        <RoomList />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

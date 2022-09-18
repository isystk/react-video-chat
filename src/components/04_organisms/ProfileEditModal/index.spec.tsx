import React from 'react'
import renderer from 'react-test-renderer'
import ProfileEditModal from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

describe('ProfileEditModal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    main.setRoomId('test')
    main.self.isOpen = true
    const component = renderer.create(
      <Context.Provider value={main}>
        <ProfileEditModal />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

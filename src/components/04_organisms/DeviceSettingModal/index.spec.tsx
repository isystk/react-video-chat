import React from 'react'
import renderer from 'react-test-renderer'
import DeviceSettingModal from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

describe('DeviceSettingModal', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.mediaDevice.isOpen = true
    const component = renderer.create(
      <Context.Provider value={main}>
        <DeviceSettingModal />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

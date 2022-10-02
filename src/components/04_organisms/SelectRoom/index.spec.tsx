import React from 'react'
import renderer from 'react-test-renderer'
import SelectRoom from './index'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'

describe('SelectRoom', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')

    const component = renderer.create(
      <Context.Provider value={main}>
        <SelectRoom />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

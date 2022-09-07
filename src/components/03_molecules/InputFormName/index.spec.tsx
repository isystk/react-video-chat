import React from 'react'
import renderer from 'react-test-renderer'
import InputFormName from './index'
import '@testing-library/jest-dom/extend-expect'
import { Context } from '@/components/05_layouts/HtmlSkeleton'
import MainService from '@/services/main'

describe('InputFormName', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))

    const component = renderer.create(
      <Context.Provider value={main}>
        <InputFormName />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

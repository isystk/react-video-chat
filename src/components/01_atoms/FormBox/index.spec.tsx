import React from 'react'
import renderer from 'react-test-renderer'
import FormBox from './index'
import '@testing-library/jest-dom/extend-expect'

describe('FormBox', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(<FormBox title="sample" />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

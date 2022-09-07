import React from 'react'
import renderer from 'react-test-renderer'
import VolumeButton from './index'
import '@testing-library/jest-dom/extend-expect'

describe('VolumeButton', () => {
  it('Match Snapshot', () => {
    const component = renderer.create(<VolumeButton isMute={false} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

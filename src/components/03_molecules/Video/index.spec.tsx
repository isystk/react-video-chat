import React from 'react'
import renderer from 'react-test-renderer'
import Video from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'

describe('Video', () => {
  it('Match Snapshot', () => {
    const main = {
      self: {
        name: 'isystk',
      },
    } as MainService
    const videoRef = jest.fn()
    const component = renderer.create(
      <Video
        isLocal={true}
        member={main.self}
        main={main}
        videoRef={videoRef}
      />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

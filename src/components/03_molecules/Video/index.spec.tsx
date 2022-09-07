import React from 'react'
import renderer from 'react-test-renderer'
import Video from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { Context } from '@/components/05_layouts/HtmlSkeleton'

describe('Video', () => {
  it('Match Snapshot', () => {
    const main = new MainService(() => ({}))
    main.setName('isystk')
    const videoRef = jest.fn()
    const component = renderer.create(
      <Context.Provider value={main}>
        <Video isLocal={true} member={main.self} videoRef={videoRef} />
      </Context.Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

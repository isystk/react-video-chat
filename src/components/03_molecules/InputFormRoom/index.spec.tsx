import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import InputFormRoom from './index'
import '@testing-library/jest-dom/extend-expect'
import { renderHook } from '@testing-library/react-hooks'
import Main from '@/services/main'

describe('InputFormRoom', () => {
  it('Match Snapshot', () => {
    const stateMain = renderHook(() => useState<Main | null>(null))
    const [, setAppRoot] = stateMain.result.current
    const main = new Main(setAppRoot)
    if (main === null) return
    const component = renderer.create(<InputFormRoom main={main} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

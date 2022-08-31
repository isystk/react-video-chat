import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import Header from '@/components/pages/Header'
import '@testing-library/jest-dom/extend-expect'
import { renderHook } from '@testing-library/react-hooks'
import Main from '@/services/main'

describe('Header', () => {
  it('Match Snapshot', () => {
    const stateMain = renderHook(() => useState<Main | null>(null))
    const [, setAppRoot] = stateMain.result.current
    const main = new Main(setAppRoot)
    const stateMenuOpen = renderHook(() => useState<boolean>(false))
    const [isMenuOpen, setMenuOpen] = stateMenuOpen.result.current
    if (main === null) return
    const component = renderer.create(
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} main={main} />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

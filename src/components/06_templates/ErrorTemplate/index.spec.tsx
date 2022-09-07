import React from 'react'
import renderer from 'react-test-renderer'
import ErrorTemplate from './index'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from '@/stores'

describe('ErrorTemplate', () => {
  it('Match Snapshot', () => {
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, enhancer)

    const component = renderer.create(
      <Provider store={store}>
        <ErrorTemplate statusCode={404} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

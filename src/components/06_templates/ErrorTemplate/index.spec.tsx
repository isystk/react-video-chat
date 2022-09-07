import React from 'react'
import renderer from 'react-test-renderer'
import ErrorTemplate, { ErrorTemplateProps } from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from '@/stores'

describe('ErrorTemplate', () => {
  it('Match Snapshot', () => {
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, enhancer)
    const main = new MainService(() => ({}))
    const props: ErrorTemplateProps = { main, statusCode: '404' }
    const component = renderer.create(
      <Provider store={store}>
        <ErrorTemplate {...props} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

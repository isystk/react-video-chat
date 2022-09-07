import React from 'react'
import renderer from 'react-test-renderer'
import InputFormTemplate, {InputFormTemplateProps} from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import reducers from '@/stores'

describe('InputFormTemplate', () => {
  it('Match Snapshot', () => {
    const enhancer = applyMiddleware(thunk)
    const store = createStore(reducers, enhancer)
    const main = new MainService(() => ({}))
    const props: InputFormTemplateProps = {main}
    const component = renderer.create(
      <Provider store={store}>
        <InputFormTemplate {...props} />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})

import '../src/assets/sass/app.scss';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from '../src/stores'
import createStorybookListener from 'storybook-addon-redux-listener'
import thunk from "redux-thunk";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const withProvider = (StoryFn, context) => {
  const middlewares = []
  const reduxListener = createStorybookListener()
  middlewares.push(reduxListener)
  middlewares.push(thunk)
  const enhancer =
          applyMiddleware(...middlewares)
  const store = createStore(reducers, enhancer)
  return (
    <Provider store={store}>
      <StoryFn />
    </Provider>
  )
}

/** Decorators */
export const decorators = [withProvider]
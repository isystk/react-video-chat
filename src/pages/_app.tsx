import '@/assets/sass/app.scss'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import reducers from '@/stores'
import thunk from 'redux-thunk'
import type { AppProps } from 'next/app'

// 開発環境の場合は、redux-devtools-extension を利用できるようにする
const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)
const store = createStore(reducers, enhancer)

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MuiThemeProvider>
  )
}

export default App

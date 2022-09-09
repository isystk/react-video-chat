import '@/assets/sass/app.scss'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import reducers from '@/stores'
import thunk from 'redux-thunk'
import type { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core/styles'

// 開発環境の場合は、redux-devtools-extension を利用できるようにする
const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)
const store = createStore(reducers, enhancer)

// テーマを設定
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#19857b',
    },
    success: {
      main: '#69A06F',
    },
    error: {
      main: '#ff1744',
    },
  },
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}

export default App

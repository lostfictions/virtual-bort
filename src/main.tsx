import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

// Render the bortground
import './bort'

const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
)

render()

if(module.hot) {
  module.hot.accept('./App', render)
}

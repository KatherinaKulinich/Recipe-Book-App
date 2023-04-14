import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import {App} from './App'
import './index.scss'
import { ThemeProvider } from './ThemeProvider'
import store from "./rdx/store";
import './firebase';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <HashRouter>
              <App />
          </HashRouter>
        </Provider>
      </ThemeProvider>
  </React.StrictMode>,
)

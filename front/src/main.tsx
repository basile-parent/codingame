import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {WSProvider} from "./common/context/WSContext";
import {DisplayMode} from "./types/DisplayMode";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <WSProvider mode={DisplayMode.PLAYER}>
          <App />
      </WSProvider>
  </React.StrictMode>
)

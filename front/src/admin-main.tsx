import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from "./App";
import {DisplayMode} from "./types/DisplayMode";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App mode={DisplayMode.ADMIN} />
  </React.StrictMode>
)

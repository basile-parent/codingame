import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import store from './common/store'
import {Provider} from 'react-redux'
import {DisplayMode} from "./types/DisplayMode";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App mode={DisplayMode.PLAYER}/>
    </Provider>
    // </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from "./App"
import store from "./common/store"
import {Provider} from "react-redux"
import {DisplayMode} from "./types/DisplayMode";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App mode={DisplayMode.PRESENTATION}/>
    </Provider>
    // </React.StrictMode>
)

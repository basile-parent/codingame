import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {DisplayMode} from "./types/DisplayMode";
import {WSProvider} from "./common/context/WSContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <WSProvider mode={DisplayMode.PRESENTATION}>
            <App />
        </WSProvider>
    // </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from "./App";
import {DisplayMode} from "./types/DisplayMode";
import {WSProvider} from "./common/context/WSContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <WSProvider mode={DisplayMode.ADMIN}>
            <App/>
        </WSProvider>
    </React.StrictMode>
)

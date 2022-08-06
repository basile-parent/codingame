import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {DisplayMode} from "./types/DisplayMode";
import {WSProvider} from "./common/context/WSContext";
import AdminApp from "./AdminApp";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <WSProvider mode={DisplayMode.ADMIN}>
            <AdminApp/>
        </WSProvider>
    </React.StrictMode>
)

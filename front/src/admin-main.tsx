import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import AdminApp from "./AdminApp"
import {AdminContextProvider} from "./common/context/AdminContext"
import store from "./common/store"
import {Provider} from "react-redux"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <AdminContextProvider>
            <AdminApp/>
        </AdminContextProvider>
    </Provider>
    // </React.StrictMode>
)

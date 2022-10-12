/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_WEBSOCKET_URL: string
    readonly VITE_WS_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
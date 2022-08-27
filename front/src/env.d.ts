/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly SERVER_URL: string
    readonly WS_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
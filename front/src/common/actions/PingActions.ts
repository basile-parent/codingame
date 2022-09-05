const { VITE_SERVER_URL } = import.meta.env

const ping = (): Promise<boolean> => {
    return fetch(VITE_SERVER_URL, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => data.success && data.message === "PING OK")
        .catch(_ => false)
}

export default {
    ping
}
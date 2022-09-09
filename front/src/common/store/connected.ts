import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const connectedSlice = createSlice({
    name: 'connected',
    initialState: false,
    reducers: {
        connect: () => true,
        disconnect: () => false,
    },
})

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectedSlice.actions

export default connectedSlice.reducer
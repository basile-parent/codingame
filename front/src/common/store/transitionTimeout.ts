import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const transitionTimeoutSlice = createSlice({
    name: 'transitionTimeout',
    initialState: 0,
    reducers: {
        setTransitionTimeout: (state, action: PayloadAction<number>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setTransitionTimeout } = transitionTimeoutSlice.actions

export default transitionTimeoutSlice.reducer
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./index";

export const transitionTimeoutSlice = createSlice({
    name: 'transitionTimeout',
    initialState: 0,
    reducers: {
        setTransitionTimeout: (state, action: PayloadAction<number>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.transitionTimeout
        )
    },
})

// Action creators are generated for each case reducer function
export const { setTransitionTimeout } = transitionTimeoutSlice.actions

export default transitionTimeoutSlice.reducer
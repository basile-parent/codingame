import {createAction, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./index";

export const transitionTimeoutSlice = createSlice({
    name: 'transitionTimeout',
    initialState: 0,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.transitionTimeout
        )
    },
})

export default transitionTimeoutSlice.reducer
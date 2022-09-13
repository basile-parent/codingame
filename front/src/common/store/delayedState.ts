import {createAction, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./index"

export const delayedStateSlice = createSlice({
    name: 'delayedState',
    initialState: null as RootState | null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.delayedState
        )
    },
})

export default delayedStateSlice.reducer
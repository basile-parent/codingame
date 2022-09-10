import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./index"

export const delayedStateSlice = createSlice({
    name: 'delayedState',
    initialState: null as RootState | null,
    reducers: {
        setDelayedState: (state, action: PayloadAction<RootState>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.delayedState
        )
    },
})

// Action creators are generated for each case reducer function
export const { setDelayedState } = delayedStateSlice.actions

export default delayedStateSlice.reducer
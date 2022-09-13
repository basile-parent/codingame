import {createAction, createSlice} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"
import {RootState} from "./index";

export const adminsSlice = createSlice({
    name: 'admins',
    initialState: [] as GamePlayer[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.admins || []
        )
    },
})

export default adminsSlice.reducer
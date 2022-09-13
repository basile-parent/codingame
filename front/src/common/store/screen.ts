import {createAction, createSlice} from '@reduxjs/toolkit'
import {Screen} from "../../types/Screen"
import {RootState} from "./index";

export const screenSlice = createSlice({
    name: 'screen',
    initialState: Screen.LANDING_PAGE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.screen
        )
    },
})

export default screenSlice.reducer
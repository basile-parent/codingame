import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Screen} from "../../types/Screen"
import {RootState} from "./index";

export const screenSlice = createSlice({
    name: 'screen',
    initialState: Screen.LANDING_PAGE,
    reducers: {
        setScreen: (state, action: PayloadAction<Screen>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.screen
        )
    },
})

// Action creators are generated for each case reducer function
export const { setScreen } = screenSlice.actions

export default screenSlice.reducer
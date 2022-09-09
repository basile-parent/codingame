import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Screen} from "../../types/Screen"

export const screenSlice = createSlice({
    name: 'screen',
    initialState: Screen.LANDING_PAGE,
    reducers: {
        setScreen: (state, action: PayloadAction<Screen>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setScreen } = screenSlice.actions

export default screenSlice.reducer
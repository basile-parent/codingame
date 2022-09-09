import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DisplayMode} from "../../types/DisplayMode"

export const modeSlice = createSlice({
    name: 'mode',
    initialState: DisplayMode.PLAYER,
    reducers: {
        setMode: (state, action: PayloadAction<DisplayMode>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setMode } = modeSlice.actions

export default modeSlice.reducer
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Game} from "../../types/Game";
import {RootState} from "./index";

export const gameSlice = createSlice({
    name: 'game',
    initialState: null as Game | null,
    reducers: {
        newEndTime: (state, action: PayloadAction<number>) => ({ ...state, endTimer: action.payload }) as Game,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.game
        )
    },
})

// Action creators are generated for each case reducer function
export const { newEndTime } = gameSlice.actions

export default gameSlice.reducer
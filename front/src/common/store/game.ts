import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Game} from "../../types/Game";

export const gameSlice = createSlice({
    name: 'game',
    initialState: null as Game | null,
    reducers: {
        setGame: (state, action: PayloadAction<Game>) => action.payload,
        newEndTime: (state, action: PayloadAction<number>) => ({ ...state, endTimer: action.payload }) as Game,
    },
})

// Action creators are generated for each case reducer function
export const { setGame, newEndTime } = gameSlice.actions

export default gameSlice.reducer
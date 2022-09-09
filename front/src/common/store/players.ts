import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"

export const playersSlice = createSlice({
    name: 'players',
    initialState: [] as GamePlayer[],
    reducers: {
        setPlayers: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setPlayers } = playersSlice.actions

export default playersSlice.reducer
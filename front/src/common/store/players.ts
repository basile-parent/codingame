import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"
import {RootState} from "./index";

export const playersSlice = createSlice({
    name: 'players',
    initialState: [] as GamePlayer[],
    reducers: {
        setPlayers: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.players || []
        )
    },
})

// Action creators are generated for each case reducer function
export const { setPlayers } = playersSlice.actions

export default playersSlice.reducer
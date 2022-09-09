import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"

export const presentationsSlice = createSlice({
    name: 'presentations',
    initialState: [] as GamePlayer[],
    reducers: {
        setPresentations: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setPresentations } = presentationsSlice.actions

export default presentationsSlice.reducer
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"
import {RootState} from "./index";

export const presentationsSlice = createSlice({
    name: 'presentations',
    initialState: [] as GamePlayer[],
    reducers: {
        setPresentations: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.presentations
        )
    },
})

// Action creators are generated for each case reducer function
export const { setPresentations } = presentationsSlice.actions

export default presentationsSlice.reducer
import {createAction, createSlice} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"
import {RootState} from "./index";

export const presentationsSlice = createSlice({
    name: 'presentations',
    initialState: [] as GamePlayer[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.presentations || []
        )
    },
})

export default presentationsSlice.reducer
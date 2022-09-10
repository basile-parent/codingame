import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"
import {RootState} from "./index";

export const adminsSlice = createSlice({
    name: 'admins',
    initialState: [] as GamePlayer[],
    reducers: {
        setAdmins: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.admins
        )
    },
})

// Action creators are generated for each case reducer function
export const { setAdmins } = adminsSlice.actions

export default adminsSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GamePlayer} from "../../types/Player"

export const adminsSlice = createSlice({
    name: 'admins',
    initialState: [] as GamePlayer[],
    reducers: {
        setAdmins: (state, action: PayloadAction<GamePlayer[]>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setAdmins } = adminsSlice.actions

export default adminsSlice.reducer
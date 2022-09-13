import {createAction, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./index";

export const waitForApprovalSlice = createSlice({
    name: 'waitForApproval',
    initialState: false,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.waitForApproval
        )
    },
})

export default waitForApprovalSlice.reducer
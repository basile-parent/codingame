import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./index";

export const waitForApprovalSlice = createSlice({
    name: 'waitForApproval',
    initialState: false,
    reducers: {
        setWaitForApproval: (state, action: PayloadAction<boolean>) => action.payload,
    },
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.waitForApproval
        )
    },
})

// Action creators are generated for each case reducer function
export const { setWaitForApproval } = waitForApprovalSlice.actions

export default waitForApprovalSlice.reducer
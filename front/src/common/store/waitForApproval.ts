import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const waitForApprovalSlice = createSlice({
    name: 'waitForApproval',
    initialState: false,
    reducers: {
        setWaitForApproval: (state, action: PayloadAction<boolean>) => action.payload,
    },
})

// Action creators are generated for each case reducer function
export const { setWaitForApproval } = waitForApprovalSlice.actions

export default waitForApprovalSlice.reducer
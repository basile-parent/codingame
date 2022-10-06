import {createAction, createSlice} from '@reduxjs/toolkit'
import {RootState} from "./index";

export const additionalScreenPropsSlice = createSlice({
    name: 'additionalScreenProps',
    initialState: [] as string[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createAction<RootState>('update_store'),
            (state, action) => action.payload.additionalScreenProps
        )
    },
})

export default additionalScreenPropsSlice.reducer
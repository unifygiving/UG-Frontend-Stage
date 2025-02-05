import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: null,
    message: null,
}

const apiErrorSlice = createSlice({
    name: "apiError",
    initialState,
    reducers: {
        setError: (state, action)=>{
            state.status=action.payload.status;
            state.message = action.payload.message;
        },
        clearError: (state, action)=>{
            state.status=null;
            state.message=null;
        }
    },
});


export const { setError, clearError } = apiErrorSlice.actions;
export const selectApiError = (state) => {
    return state.apiError;
};
export default apiErrorSlice.reducer;
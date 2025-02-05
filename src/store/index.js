import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import apiErrorReducer from "./slices/apiErrorSlice";
import { api } from "./slices/api";
import apiErrorHandleMiddleware from "./apiErrorHandleMiddleware";


const store = configureStore({
  reducer: {
    user: userReducer,
    apiError: apiErrorReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(apiErrorHandleMiddleware),
});

export default store;
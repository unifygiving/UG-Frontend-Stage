import { isRejectedWithValue } from "@reduxjs/toolkit";
import * as RootNavigation from "../components/navigationRoutes/RootNavigation";
import { clearUser } from "./slices/userSlice";
import { setError } from "./slices/apiErrorSlice";

export default apiErrorHandleMiddleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.type == "api/executeQuery/rejected") {
    try {
      const payload = action.payload;
      console.log("Error from Queries", payload.data, payload.status);
      if (payload.status == 401) {
        store.dispatch(setError({
          status: payload.status,
          message: payload.data.message,
        }));
      }
    } catch (err) { }
  }

  return next(action);
}
import { createSlice } from '@reduxjs/toolkit';
// TODO: change to native if not using expo
import * as SecureStore from "expo-secure-store";
import * as legacyApiUtils from "../../lib/api-utils";

var initialState = {user: null, token: null};
const loadUserStr = SecureStore.getItem("credentials");
if (loadUserStr){
  const user = JSON.parse(loadUserStr);
  initialState.user = user;
  initialState.token = user.token;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {      
      SecureStore.setItem("credentials", JSON.stringify(action.payload.user));
      legacyApiUtils.saveAuthToken(action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      console.log("CLEAR USER");
      SecureStore.setItem("credentials", "");
      legacyApiUtils.removeAuthToken();
      state.user = null;
      state.token = null;
    },
    setUserAfterLoadingFromPersist: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      legacyApiUtils.saveAuthToken(action.payload.token);
    }
  },
});

export const { setUser, clearUser, setUserAfterLoadingFromPersist } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;

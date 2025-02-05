import * as SecureStore from "expo-secure-store";
import { USER_TOKEN_KEY } from "../../constants";

export const loadAuthToken = async () => {
  return SecureStore.getItemAsync(USER_TOKEN_KEY);
};

export const saveAuthToken = async (token) => {
  await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
};

export const removeAuthToken = async () => {
  await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
};



import { Api } from "../../lib/api";
import { saveAuthToken, removeAuthToken } from "../../lib/api-utils";

const AUTH_API_BASE = "users";

const loginUser = async (data) => {
  const res = await Api.post(`${AUTH_API_BASE}/custom_user/login`, data);
  await saveAuthToken(res?.data?.token);
  return res;
};

const loginGoogleUser = async (data) => {
  const res = await Api.post(`${AUTH_API_BASE}/google_user/login`, data);
  await saveAuthToken(res?.data?.token);
  return res;
};

const signUpGoogleUser = async (data) => {
  const res = await Api.post(`${AUTH_API_BASE}/google_user/new`, data);
  return res;
};

const signUpUser = async (data) => {
  const res = await Api.post(`${AUTH_API_BASE}/custom_user`, data);
  return res;
};

const logoutUser = async () => {
  removeAuthToken();
};


export { loginUser, signUpUser, logoutUser, loginGoogleUser, signUpGoogleUser };

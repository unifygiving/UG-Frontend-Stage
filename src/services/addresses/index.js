import { Api } from "../../lib/api";

const ADDRESS_API_BASE = "addresses";

const createUserAddress = async (data) => {
  const res = await Api.post(`${ADDRESS_API_BASE}/`, data);
  return res;
};
const getUserAddress = async (id) => {
  const res = await Api.get(`${ADDRESS_API_BASE}/${id}`);
  return res;
};
const updateUserAddress = async (id) => {
  const res = await Api.put(`${ADDRESS_API_BASE}/${id}`);
  return res;
};
const deleteUserAddress = async (id) => {
  const res = await Api.delete(`${ADDRESS_API_BASE}/${id}`);
  return res;
};


export {
  createUserAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress
};

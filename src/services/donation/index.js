import { Api } from "../../lib/api";

const DONATION_API_BASE = "donation";

export const getDonationByDonorId = async (token, id) => {
    const res = await Api.get(`${DONATION_API_BASE}/donor/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

//GET Request
export const getDonationById = async (id) => {
    const res = await Api.get(`${DONATION_API_BASE}/${id}`);
    return res;
};

//GET Request
export const getDonationsByRecipientId = async (token, id) =>
{
    const res = await Api.get(`${DONATION_API_BASE}/recipient/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

//GET Request
export const getImpactResults = async (token) =>
{
    const res = await Api.get(`${DONATION_API_BASE}/impact`, {
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

//POST Request
export const createNewDonation = async (data) => {
    const res = await Api.post(`${DONATION_API_BASE}/`, data);
    return res;
};


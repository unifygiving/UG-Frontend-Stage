import { Api } from "../../lib/api";

const Business_API_BASE = "business";

//POST Requests
const createNewBusiness = async (data) =>
{
    //create a new Business
    try
    {
        const res = await Api.post(`${Business_API_BASE}/`, data);
        return res;
    } catch (error)
    {
        console.log("Create new Business Failed", error.data.message);
        throw error;
    }
}

const getUserByQRCode = async (QRCode) =>
{
    try
    {
        const res = await Api.post(`${Business_API_BASE}/find_recipient`, QRCode);
        return res;
    } catch (error)
    {
        console.log("Get Recipient by QR Code Failed", error.data.message);
        throw error;
    }
}

const createNewBusinessTransaction = async (id, data) =>
{
    try
    {
        const res = await Api.post(`${Business_API_BASE}/transaction/${id}`, data);
        return res;
    } catch (error)
    {
        console.log("Get Recipient by QR Code Failed", error.data.message);
        throw error;
    }
}

export
{
    createNewBusiness,
    getUserByQRCode,
    createNewBusinessTransaction
};
import { Api } from "../../lib/api";

const CHARITY_API_BASE = "charity";
const CHARITYDONS_API_BASE = "charitydonations";

//GET Requests
const getAllCharities = async (token) => {
  try {
      const res = await Api.get(`${CHARITY_API_BASE}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      });
      return res.data.charities;
  } catch (error) {
      throw error;
    }
};

const getCharityById = async (token, id) => {
  // get a single charity by id
  try {
    const res = await Api.get(`${CHARITY_API_BASE}/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return {data: res.data.charity};
  } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

const getAllDonationsByCharityId = async (id) => {
  // get all donations from charity by id
  const res = await Api.get(`${CHARITYDONS_API_BASE}/${id}`);
  return res;
};

const getCharityDonationsById = async (id) => {
  // get a charity and its donations by id
  const res = await Api.get(`${CHARITY_API_BASE}/donations/${id}`);
  return res;
};

//POST Requests
const createNewCharity = async (data) => {
  //create a new charity
  const res = await Api.post(`${CHARITY_API_BASE}/`, data);
  return res;
}
const uploadCharityPictureById = async (id) => {
  //upload a charity's picture by id
  const res = await Api.post(`${CHARITY_API_BASE}/picture/${id}`);
  return res;
}


//PUT Requests
const updateCharityById = async (id, data) => {
  //update a charity's details by id
  const res = await Api.put(`${CHARITY_API_BASE}/${id}`, data);
  return res;
}

const updateCharityPictureById = async (id) => {
  //update a charity's picture by id
  const res = await Api.put(`${CHARITY_API_BASE}/picture/${id}`);
  return res;
}


//DELETE Requests
const deleteCharityById = async (id) => {
  //delete a charity by id
  const res = await Api.delete(`${CHARITY_API_BASE}/${id}`);
  return res;
}



export { 
  getAllCharities, 
  getCharityById, 
  getAllDonationsByCharityId, 
    getCharityDonationsById, 
  createNewCharity,
  uploadCharityPictureById,
  updateCharityById,
  updateCharityPictureById,
  deleteCharityById
};

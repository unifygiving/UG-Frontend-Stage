import { Api } from "../../lib/api";

const USERS_API_BASE = "users";


//GET Requests
const getAllRecipients = async (token) => {
  try {
    const res = await Api.get(`${USERS_API_BASE}/recipient/list`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data.recipient;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const getRecipientById = async (token, id) => {
  try {
    console.log(`${USERS_API_BASE}/profile/${id}`);
    const res = await Api.get(`${USERS_API_BASE}/profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const getRecipientsByLocation = async (token, location) =>
{
    try
    {
        const res = await Api.post(`${USERS_API_BASE}/recipient/location`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                "location": location.city.toString() + ", " + location.country.toString()
            }
        });
        return res.data;
    } catch (error)
    {
        console.log("Error", error);
        throw error;
    }
}

const getDonationsGiven = async (id) => {
  const res = await Api.get(`donation/donor/${id}`);
  return res;
};

const getDonationsReceived = async (id) => {
  const res = await Api.get(`donation/recipient/${id}`);
  return res;
};

const getUserProfile = async (token, id) => {

  try {
    const res = await Api.get(`${USERS_API_BASE}/profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log("Get User Profile error", error);
    throw error;
  }
};

//POST Requests
const createNewUser = async (data) =>
{
    //create a new recipient
    try{
      const res = await Api.post(`${USERS_API_BASE}/custom_user`, data);
      return res;
    }catch(error){
      throw new Error(error.data.message);
    }
}

const createNewRecipient = async(data) =>{
  try{
      const res = await Api.post(`${USERS_API_BASE}/recipient/new`, data);
    return res;
  } catch (error) {
    console.log("Create new Recipient Failed", error.data.message);
    throw error;
  }
}

//POST Request
const uploadRecipientUserPicture = async (id, token, uri) =>
{
    try
    {
        const formData = new FormData();
        formData.append('image', {
            uri: uri,
            name: 'avatar.jpg',
            type: 'image/jpeg',
        });

        const response = await Api.post(`charity/recipient/picture/${id}`, formData, {
            headers: {
                'accept': "application/json",
                'Content-Type': 'multipart/form-data',
                'authorization': `bearer ${token}`,
            },
        });
        console.log(JSON.stringify(response));
        return { message: "OK" }; //response.data;

    } catch (error)
    {
        console.error('Error to upload image:', JSON.stringify(error));
        throw error;
    }

};
//POST Request
const uploadUserPicture = async (id, token, uri, userId) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

      const response = await Api.post(`${USERS_API_BASE}/user_actions/picture/${id}`, formData, {
      headers: {
        'accept': "application/json", 
        'Content-Type': 'multipart/form-data',
        'authorization': `bearer ${token}`,
      },
    }); 
    console.log(JSON.stringify(response));
    return {message: "OK"}; //response.data;
    
  } catch (error) {
    console.error('Error to upload image:', JSON.stringify(error));
    throw error;
  }
};

const resetPassword = async (data) => {
  try{
    const response = await Api.post(`${USERS_API_BASE}/user_actions/reset-password`, data)
    return response;
  } catch (error) {
    throw error;
  }
}

//PUT Requests
const updateUserPassword = async (id, token, data) => {
  try{
    const res = await Api.put(`${USERS_API_BASE}/custom_user/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    return res;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const updateUserPicture = async (id, token, userId, uri) => {
  try {
    const formData = new FormData();
    //    formData.append("userId", userId);

    formData.append('image', new Blob([uri], { type: "image/jpeg" }), "avatar.jpg");;

    console.log(formData)

      const response = await Api.put(`${USERS_API_BASE}/user_actions/picture/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro to upload image:', error);
    throw error;
  }
};

const updateUser = async (id, token, data) => {
  try{
    const res = await Api.put(`${USERS_API_BASE}/custom_user/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

//DELETE Request
const deleteUser = async (id, token, password) => {
  try{
    const res = await Api.delete(`${USERS_API_BASE}/user_actions/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        password: password
      }
    });
    return res;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

//GET Request
const getCombinedDonationsAndTransasctionsByRecipientId = async (token, id) =>
{
    const res = await Api.get(`${USERS_API_BASE}/recipient/transactions/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export {
  getAllRecipients,
  getRecipientById,
  getDonationsReceived,
  getDonationsGiven,
  getUserProfile,
  uploadUserPicture,
  updateUserPassword,
  updateUserPicture,
  deleteUser,
  updateUser,
  resetPassword,
  createNewUser,
  createNewRecipient,
    getCombinedDonationsAndTransasctionsByRecipientId,
    uploadRecipientUserPicture
};

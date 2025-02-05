import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'; //redux

import { getAllCharities, getCharityById, createNewRecipient } from '../../services/charity';
import { uploadRecipientUserPicture, updateUserPicture, deleteUser, updateUser, createNewUser, updateUserPassword } from '../../services/users';
import { getRecipientById } from '../../services/users';
import { api } from './api';
import _ from 'lodash';

const charityApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCharitiesRTK: build.query({
            query: () => "charity",
            transformResponse: (response) => response.charities,
            providesTags: ["Charity"]
        }),
        getCharityByIdRTK: build.query({
            query: (id) => `charity/${id}`,
            providesTags: (result) => {
                return [{ type: "Recipient", id: "LIST" },
                { type: "Charity", id: result.id }
                ];
            }
        }),
        getRecipientByIdRTK: build.query({
            queryFn: async (id) => {
                console.log("rcp id", id);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const res = await getRecipientById(null, id);
                console.log(res);
                return { data: res.user };
            },
            providesTags: (result) => [
                { type: "Recipient", id: result.id }
            ]
        }),
        searchCharityByNameRTK: build.query({
            queryFn: async (searchTerm) => {
                try {
                    const res = await getAllCharities();
                    const filtered = res.filter((charity) =>
                        _.toLower(charity.name).includes(_.toLower(searchTerm)));
                    return { data: filtered };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: (result) => [
                { type: "Charity", id: "LIST" }
            ]
        }),
        updateRecipientRTK: build.mutation({
            // charityAdminUser: Logged in user who has the admin right
            // Provides the token and id for authentication
            // recipientData: recipientData to update
            query: ({ id, recipientData }) => ({
                url: `users/custom_user/update/${id}`,
                body: recipientData,
                method: "PUT",
            }),
            invalidatesTags: [{ type: "Recipient" }]
        }),
        updateRecipientPassword: build.mutation({
            query: ({ id, oldPassword, newPassword }) => ({
                url: `users/custom_user/${id}`,
                body: { oldPassword, newPassword },
                method: "PUT",
            }),
            _queryFn: async ({ id, token, oldPassword, newPassword }) => {
                try {
                    const res = await updateUserPassword(id, token, {
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    });
                    return { data: res.status };
                } catch (error) {
                    return { error: error || "Failed to update password" };
                }
            }
        }),
        createNewRecipient: build.mutation({
            query: (newUserData) => ({
                url: "users/recipient/new",
                body: newUserData,
                method: "POST",
            }),
            _queryFn: async (newUserData) => {
                try {
                    // Simulate loading
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const res = await createNewRecipient(newUserData);
                    // Picture upload separately, ignore error when upload picture (for now!)                    
                    try {
                        console.log("Upload picture", res.data.userId);
                        if (newUserData.picture) {
                            const pres = await uploadRecipientUserPicture(res.data.userId, null, newUserData.picture);
                            console.log(pres);
                        }
                    } catch {
                    }
                    return { data: res.data.userId };
                } catch (error) {
                    return { error: error.message || 'Failed to create new user' };
                }
            },
            invalidatesTags: [{ type: "Recipient" }]
        }),
        updateRecipientPicture: build.mutation({
            query: ({id, uri}) => {
                const formData = new FormData();
                formData.append('image', {uri: uri, type: "image/jpeg", name: "avatar.jpg"});
                return {
                    url: `charity/recipient/picture/${id}`,
                    method: "PUT",
                    body: formData,
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "multipart/form-data",
                    }
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "Recipient" }],
        })

    }),
    overrideExisting: true,
});

const initialState = {};

const charitySlice = createSlice({
    name: 'charity',
    initialState,
    reducers: {
        clearCharity: (state) => {
            state.charity = {};
        }
    },
});

export const { clearCharity } = charitySlice.actions;
export const {
    useGetAllCharitiesRTKQuery,
    useLazyGetAllCharitiesRTKQuery,
    useLazySearchCharityByNameRTKQuery,
    useGetRecipientByIdRTKQuery,
    useGetCharityByIdRTKQuery,
    useUpdateRecipientRTKMutation,
    useUpdateRecipientPictureMutation,
    useUpdateRecipientPasswordMutation,
    useCreateNewRecipientMutation } = charityApi;
export default charitySlice.reducer;

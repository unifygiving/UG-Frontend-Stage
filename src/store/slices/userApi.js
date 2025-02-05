import { api } from './api';

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        updateUser: build.mutation({
            query: ({id, data}) => ({
                url: `users/custom_user/update/${id}`,
                method: "PUT",
                body: data
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            },
            invalidatesTags: ["User"],
        }),
        updateUserPicture: build.mutation({
            query: ({id, uri}) => {
                const formData = new FormData();
                formData.append('image', {uri: uri, type: "image/jpeg", name: "avatar.jpg"});
                return {
                    url: `users/user_actions/picture/${id}`,
                    method: "PUT",
                    body: formData,
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "multipart/form-data",
                    }
                }
            },
            invalidatesTags: (result, error, arg) => [{
                type: "User",
            }]
        }),
        updateUserPassword: build.mutation({
            query: ({id, oldPassword, newPassword}) => ({
                url: `users/custom_user/${id}`,
                method: "PUT",
                body: {oldPassword, newPassword},
            }),
        })
    }),
    overrideExisting: true,
});

export const {useUpdateUserMutation, useUpdateUserPictureMutation, useUpdateUserPasswordMutation} = userApi;
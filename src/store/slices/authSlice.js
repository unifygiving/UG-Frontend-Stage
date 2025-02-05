import { api } from './api';
import { loginUser } from '../../services/auth';

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url: "users/custom_user/login",
                method: "POST",
                body: data,
            }),
            transformResponse: (response, meta, arg) => ({
                user: response,
                token: response.token,
            }),
            providesTags: ["User"],
        }),
        register: build.mutation({
            query: (data) => ({
                url: "users/custom_user/",
                method: "POST",
                body: data,
            }),
        }),
        resendVerificationEmail: build.mutation({
            query: ({email}) => ({
                url: "users/custom_user/verify/resend",
                method: "POST",
                body: {email},
            })
        })
    }),
    overrideExisting: true
})

export const { useLoginMutation, useRegisterMutation, useResendVerificationEmailMutation } = authApi;

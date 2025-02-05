import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            // headers.set("Content-Type", "application/json");
            const token = getState().user.token;
            if (token){
//                console.log("SET HEADER TOKEN: ", token);
                headers.set("Authorization", `bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Recipient", "Charity", "User", "Location", "Donation", "Business"],
    endpoints: () => ({}),
});
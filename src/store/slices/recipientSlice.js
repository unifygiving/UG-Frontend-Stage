import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllRecipients, getRecipientById } from '../../services/users';
import { createSelector } from '@reduxjs/toolkit';
import { getValidDate } from '../../helpers/functions/util';

import { api } from './api';

const recipientApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllRecipientsRTK: build.query({
            query: () => "users/recipient/list",
            transformResponse: (response) => response.recipient,
            providesTags: [{ type: "Recipient", id: "LIST" }]
        }),
        // TODO: This API call doesn't work... security error
        getRecipientByIdRTK: build.query({
            queryFn: async (id) => {
                try {
                    // Simulate loading
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const res = await getRecipientById(null, id);
                } catch (error) { return { error } };
            },
            providesTags: (result) => [{ type: "Recipient", id: result.id }],
        }),
        getRecipientByLocationRTK: build.query({
            queryFn: async () => {
                // Simulate loading
                await new Promise(resolve => setTimeout(resolve, 1000));
                const res = await getRecipientById(null, id);
                return { data: res };
            },
            providesTags: (result) => [{ type: "Recipient", id: result.id }],
        }),
        filterRecipientsRTK: build.query({
            query: ({location}) => ({
                method: "POST",
                url: "users/recipient/location",
                //body: {country: location[0]},
                //body: { city: location[0] },
                body: { city: location },
            }),
            provideTags: [{ type: "Recipient", id: "LIST" }],
            transformResponse: (response, meta, arg) => {
                console.log(response);
                console.log("FILTER ARGS", arg);
                return response.recipient;
            },
            providesTags: [{ type: "Recipient", id: "LIST" }]
        }),
        getAllLocationsRTK: build.query({
            queryFn: async (recipients) => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                // should have done in API, for now just filter from all results
                if (!recipients) return { data: null };
                const locations = [];
                recipients.map((recipient) => {
                    //if (!locations[recipient.country])
                    //    locations[recipient.country] = [];
                    //const cities = locations[recipient.country];
                    //if (cities.indexOf(recipient.city) === -1) cities.push(recipient.city);

                    if (!locations[recipient.city])
                        locations[recipient.city] = [];
                    const cities = locations[recipient.city];
                    if (cities.indexOf(recipient.city) === -1) cities.push(recipient.city);
                })
                //return { data: Object.keys(locations).map((key) => [key, locations[key]]).sort() };
                return { data: Object.keys(locations).map((key) => key).sort() };
            },
            providesTags: [{ type: "Recipient", id: "LIST" }]
        }),
        getCombinedDonationsAndTransactionsByRecipientIdRTK: build.query({
            query: ({ id, startDate, endDate }) => `users/recipient/transactions/${id}`,
            transformResponse: (response, meta, arg) =>
            {
                console.log("TRANSACTIONS", response);
                return response;
            },
            _queryFn: async (arg) =>
            {
                const { id, startDate, endDate } = arg;
                const sDate = getValidDate(startDate, Date.now());
                const eDate = getValidDate(endDate, Date.now());

                try
                {
                    const res = await getCombinedDonationsAndTransasctionsByRecipientId(null, id);
                    const transactions = res.map((transaction, index) =>
                    {
                        return {
                            amount: transaction.amount,
                            business_id: transaction.business_id,
                            created_at: getValidDate(transaction.created_at).toString(),
                            id: transaction.id,
                            products: transaction.products,
                            receipt: transaction.receipt,
                            type: transaction.type,
                            user_id: transaction.user_id,
                        }
                    });

                    console.log("initial Transactions: ", transactions);

                    transactions.sort((a, b) =>
                    {
                        if (a.date < b.date) return -1;
                        else if (a.date > b.date) return 1;
                        return 0;
                    });

                    const result = transactions.filter((tran) =>
                    {
                        return (getValidDate(tran.date) > sDate &&
                            getValidDate(tran.date) < eDate);
                    });

                    return { data: result };
                } catch (error)
                {
                    return { error };
                }
            },
        }),
    }),
    overrideExisting: true,
});

export const { useGetAllRecipientsRTKQuery,
    useLazyGetAllRecipientsRTKQuery,
    useGetRecipientByIdRTKQuery,
    useFilterRecipientsRTKQuery,
    useLazyFilterRecipientsRTKQuery,
    useGetAllLocationsRTKQuery,
    useGetRecipientsByCountryCityQuery,
    useGetCombinedDonationsAndTransactionsByRecipientIdRTKQuery,
} = recipientApi;
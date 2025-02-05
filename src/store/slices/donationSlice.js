import { createSelector } from '@reduxjs/toolkit';
import { api } from './api';
import { getDonationByDonorId } from '../../services/donation';
import { getValidDate } from '../../helpers/functions/util';

const donationApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDonationById: build.query({
            query: (id) => `donation/${id}`,
        }),
        createStripePayment: build.mutation({
            query: ({donor_id, charity_id, recipient_id, amount_donation, message, customer_email, currency}) => ({
                url: `donation`,
                body: {
                    donor_id, charity_id, recipient_id, amount_donation, message, customer_email, currency,
                    ios: false
                },
                method: "POST"
            }),
            transformResponse: (response, meta, arg) => {
                console.log("RESPONSE", response);
                return response;
            }
        }),
        createStripeLink: build.mutation({
            query: ({donor_id, charity_id, recipient_id, amount_donation, message, customer_email, currency}) => ({
                url: `donation`,
                body: {
                    donor_id, charity_id, recipient_id, amount_donation, message, customer_email, currency,
                    ios: true
                },
                method: "POST"
            }),
        }),
        getDonationByDonorIdRTK: build.query({
            query: ({id, startDate, endDate}) => `donation/donor/${id}`,
            transformResponse: (response, meta, arg) => {
                return response;
            },
        }),
        getDonationByRecipientIdRTK: build.query({
            query: ({ id, startDate, endDate }) => `donation/recipient/${id}`,
            transformResponse: (response, meta, arg) =>
            {
                return response;
            },
        }),

        getSumDonationsByDonorIdRTK: build.query({
            query: ({ id, startDate, endDate }) => `donation/donor/${id}`,
            transformResponse: (response, meta, arg) =>
            {
                console.log("GET SUM", response);
                return response;
            },
        }),

        getDonationImpactResults: build.query({
            query: () => `donation/impact`,
            transformResponse: (response, meta, arg) =>
            {
                return response;
            },
        }),

    }),
    overrideExisting: true,
});

export const {
    useCreateStripePaymentMutation,
    useGetDonationByIdQuery,
    useGetDonationImpactResultsQuery,
    useCreateStripeLinkMutation,
    useGetDonationByDonorIdRTKQuery,
    useGetDonationByRecipientIdRTKQuery,
    useGetSumDonationsByDonorIdRTKQuery
} = donationApi;
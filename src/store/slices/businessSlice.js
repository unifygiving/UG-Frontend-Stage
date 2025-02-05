import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'; //redux

import { getAllCharities, getCharityById, createNewRecipient } from '../../services/business';
import { api } from './api';
import _ from 'lodash';

const businessApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecipientByQRCodeRTK: build.query({
            query: (qrcode) => ({
                url: "business/find_recipient",
                body: {qrcode},
                method: "POST",
            }),
            transformResponse: (response, meta, arg) => {
                console.log(response, arg);
                return response;
            },
            transformErrorResponse: (response, meta, arg) =>{
                console.log(response, arg);
                return response;
            }
        }), 
       
        createNewBusinessTransactionRTK: build.mutation({
            query: ({ businessId, qrcode, amount, products }) => ({
                url: `business/transaction/${businessId}`,
                body: {qrcode, amount, products},
                method: "POST",
            }),
            transformResponse:(response)=>{
                console.log("CREATE transaction", response);
                return response;
            },
            transformErrorResponse:(response, meta, arg)=> {
                console.log("ERROR", response, meta);
                return response;
            },
            invalidatesTags: [{ type: "Business" }]
        }),

    }),
    overrideExisting: true,
});

const initialState = {};

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        clearBusiness: (state) =>
        {
            state.business = {};
        }
    },
});

export const { clearBusiness } = businessSlice.actions;
export const {
    useGetRecipientByQRCodeRTKQuery,
    useCreateNewBusinessTransactionRTKMutation } = businessApi;
export default businessSlice.reducer;
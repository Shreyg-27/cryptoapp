import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_API_HOST
}

// const cryptoNewsHeaders = {
//     'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
//     'X-RapidAPI-Host': process.env.REACT_APP_NEWS_API_HOST
// };

const baseUrl = 'https://crypto-news16.p.rapidapi.com';


const  createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (newss) => createRequest(`news/coincu`),
        })
    })
});

export const {useGetCryptoNewsQuery} = cryptoNewsApi;

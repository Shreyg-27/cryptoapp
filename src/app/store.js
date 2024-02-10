import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/CryptoApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
        
});

setupListeners(store.dispatch);

export default store;



// In Redux Toolkit Query (RTK-Query), middleware is used to handle asynchronous actions, such as making API requests and handling cache updates. This middleware is essential for RTK-Query to function correctly because it intercepts dispatched actions, such as query actions, and performs the necessary tasks like making API requests, updating cache, and dispatching success or error actions.

// In your code, you defined an API slice using RTK-Query in the CryptoApi.js file, which includes the configuration for fetching data from an API. However, in your store.js file, where you create the Redux store, you were missing the middleware configuration for RTK-Query. As a result, when you dispatched actions from the RTK-Query API slice, there was no middleware to handle those actions, leading to the warning and error messages you encountered.

// export default configureStore({
//     reducer: {
//         [cryptoApi.reducerPath]: cryptoApi.reducer,
//     },
// });
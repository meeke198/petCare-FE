import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartInventorySlice from "../store/cartInventorySlice";
import OrderSlice from "../store/orderSlice";
import searchSlice from "../redux/searchSlice"
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({auth: authReducer, user: userReducer
    , order: OrderSlice, search: searchSlice,
     cartInventory: cartInventorySlice});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export let persistor = persistStore(store);

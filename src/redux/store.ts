import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import backendApi from './features/apiSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authSlice from './features/authSlice';
import unsplashapi from './features/apiUnsplashSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};

const persistedAuth = persistReducer(persistConfig, authSlice);


export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    auth: persistedAuth,
    [unsplashapi.reducerPath]: unsplashapi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(backendApi.middleware).concat(unsplashapi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
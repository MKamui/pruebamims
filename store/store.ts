"use client"
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

interface SearchState {
  searchedWords: any[];
}

const initialState: SearchState = {
  searchedWords: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchedWord: (state, action: PayloadAction<string>) => {
      const currentDate = new Date();
      const searchEntry = {
        word: action.payload,
        timestamp: currentDate.toLocaleString(),
      };
      state.searchedWords.push(searchEntry);
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, searchSlice.reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
export const { addSearchedWord } = searchSlice.actions;

export const persistor = persistStore(store);
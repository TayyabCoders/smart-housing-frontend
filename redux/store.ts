"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import usersReducer from "./slices/user-slice";
import loginReducer from "./slices/login-slice";
import signupReducer from "./slices/signup-slice";
import complaintsReducer from "./slices/complaint-slice";
import announcementsReducer from "./slices/announcement-slice";
import votingReducer from "./slices/voting-slice";
import dashboardReducer from "./slices/dashboard-slice";
import chatbotReducer from "./slices/chatbot-slice";
import chatReducer from "./slices/chat-slice";
import faceDetectionReducer from "./slices/face-detection-slice";
import profileReducer from "./slices/profile-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use localStorage only in browser environment
const customStorage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  voting: votingReducer,
  signup: signupReducer,
  complaints: complaintsReducer,
  announcements: announcementsReducer,
  dashboard: dashboardReducer,
  chatbot: chatbotReducer,
  chat: chatReducer,
  faceDetection: faceDetectionReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage: customStorage,
  whitelist: ["login"], // Only persist login state
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/lib/api/api";
import uiReducer from "@/features/ui/uiSlice";

// A fresh store per request keeps server-rendered state from leaking between users.
export const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

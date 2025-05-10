import { configureStore } from '@reduxjs/toolkit';

import blogSlice from './slice/blogSlice';
import userSlice from './slice/userSlice';

export const store = configureStore({
  reducer: {
    blog: blogSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

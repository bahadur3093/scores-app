import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogState {
  data: string[];
}

const initialState: BlogState = {
  data: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setData(state, { payload }: PayloadAction<string[]>) {
      state.data = payload;
    },
    resetData(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setData, resetData } = blogSlice.actions;
export default blogSlice.reducer;

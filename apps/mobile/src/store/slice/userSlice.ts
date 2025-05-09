import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../model/Users.model';

export interface UserState {
  userDetails: User;
}

const initialState: UserState = {
  userDetails: {} as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, { payload }: PayloadAction<User>) {
      state.userDetails = payload;
    },
    resetUserState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserDetails, resetUserState } = userSlice.actions;
export default userSlice.reducer;

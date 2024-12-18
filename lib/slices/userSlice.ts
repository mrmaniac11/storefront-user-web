// lib/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  productCount: number;
  collectionCount: number;
  avatar: string;
}

const initialState: UserState = {
  name: '',
  productCount: 0,
  collectionCount: 0,
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.productCount = action.payload.productCount;
      state.collectionCount = action.payload.collectionCount;
      state.avatar = action.payload.avatar;
    },
    clearUser: (state) => {
      state.name = '';
      state.productCount = 0;
      state.collectionCount = 0;
      state.avatar = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
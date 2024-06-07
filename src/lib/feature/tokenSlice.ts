import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  accessToken: string;
}

const initialState = {
  accessToken: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    change: (state, action) => {
      state = action.payload;
    },
  },
});

export const { change } = tokenSlice.actions;
export default tokenSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  token: string;
}

const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  picture: '',
  token: '',
};

export const payloadSlice = createSlice({
  name: 'payload',
  initialState,
  reducers: {
    change: (state, action) => {
      state = action.payload;
    },
  },
});

export const { change } = payloadSlice.actions;
export default payloadSlice.reducer;

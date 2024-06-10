import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
}

const initialState = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  picture: '',
};

export const payloadSlice = createSlice({
  name: 'payload',
  initialState,
  reducers: {
    change: (state, action) => {
      const payload: InitialState = action.payload;
      state.email = payload.email;
      state.first_name = payload.first_name;
      state.id = payload.id;
      state.last_name = payload.last_name;
      state.picture = payload.picture;
      // state = action.payload;
    },
  },
});

export const { change } = payloadSlice.actions;
export default payloadSlice.reducer;

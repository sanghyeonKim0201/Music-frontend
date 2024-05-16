import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  toggle: true,
};

export const menu = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    change: (state, action) => {
      return { toggle: !state.toggle };
    },
  },
});

export const { change } = menu.actions;
export default menu.reducer;

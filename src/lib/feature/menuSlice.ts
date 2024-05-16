import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  toggle: true,
  selectedMenu: '홈',
};

export const menuSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    change: (state) => {
      state.toggle = !state.toggle;
    },
    selectionMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { change, selectionMenu } = menuSlice.actions;
export default menuSlice.reducer;

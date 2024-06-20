import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toggle: boolean;
  id: string | null;
}

const initialState: InitialState = {
  toggle: false,
  id: null,
};

export const musicSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    on: (state) => {
      state.toggle = true;
    },
    selectionMusic: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { on, selectionMusic } = musicSlice.actions;
export default musicSlice.reducer;

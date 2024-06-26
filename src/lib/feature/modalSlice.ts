import { createSlice } from '@reduxjs/toolkit';
interface InitialState {
  element: JSX.Element | null;
}

const initialState: InitialState = {
  element: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onModal: (state, action) => {
      state.element = action.payload;
    },
    offModal: (state) => {
      state.element = null;
    },
  },
});

export default modalSlice.reducer;

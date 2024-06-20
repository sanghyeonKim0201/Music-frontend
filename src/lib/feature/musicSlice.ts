import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toggle: boolean;
  id: string | null;
  status: 'stop' | 'play';
  type: 'video' | 'playlist';
}

const initialState: InitialState = {
  toggle: false,
  id: null,
  status: 'stop',
  type: 'video',
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    on: (state) => {
      state.toggle = true;
    },
    selectionMusic: (state, action) => {
      state.id = action.payload;
    },
    statusChange: (state, action: { payload: 'stop' | 'play' }) => {
      state.status = action.payload;
    },
    typeChange: (state, action: { payload: 'video' | 'playlist' }) => {
      state.type = action.payload;
    },
  },
});

export const { on, selectionMusic } = musicSlice.actions;
export default musicSlice.reducer;

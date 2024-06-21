import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toggle: boolean;
  id: string | null;
  title: string | null;
  context: string | null;
  status: 'stop' | 'play';
  type: 'video' | 'playlist';
}

const initialState: InitialState = {
  toggle: false,
  id: null,
  title: null,
  context: null,
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
    titleChange: (state, action: { payload: string }) => {
      state.title = action.payload;
    },
    contextChange: (state, action: { payload: string }) => {
      state.context = action.payload;
    },
  },
});

export const {
  on,
  selectionMusic,
  statusChange,
  typeChange,
  titleChange,
  contextChange,
} = musicSlice.actions;
export default musicSlice.reducer;

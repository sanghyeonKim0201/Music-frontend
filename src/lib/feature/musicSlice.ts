import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toggle: boolean;
  data: {
    id: string;
    title: string;
    context: string;
  }[];

  status: {
    playing: 'stop' | 'play';
    isVolume: boolean;
    loop: boolean;
  };
  volume: number;
}

const initialState: InitialState = {
  toggle: false,
  data: [{ id: '', title: '', context: '' }],
  status: { playing: 'stop', loop: false, isVolume: false },
  volume: 0.5,
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    on: (state) => {
      state.toggle = true;
    },
    selectionMusic: (state, action) => {
      state.data = action.payload;
    },
    statusChange: (state, action: { payload: 'stop' | 'play' }) => {
      state.status.playing = action.payload;
    },
    togglePlay: (state) => {
      if (state.status.playing === 'play') state.status.playing = 'stop';
      else state.status.playing = 'play';
    },
    toggleLoop: (state) => {
      if (state.status.loop) state.status.loop = false;
      else state.status.loop = true;
    },
    toggleVolume: (state) => {
      if (state.status.isVolume) state.status.isVolume = false;
      else state.status.isVolume = true;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },

    titleChange: (
      state,
      action: { payload: { title: string; index: number } },
    ) => {
      state.data[action.payload.index].title = action.payload.title;
    },
    contextChange: (
      state,
      action: { payload: { title: string; index: number } },
    ) => {
      state.data[action.payload.index].title = action.payload.title;
    },
    startMusic: (
      state,
      action: {
        payload: { title: string; context: string; id: string }[];
      },
    ) => {
      state.data = action.payload;
      state.toggle = true;
      state.status.playing = 'play';
    },
  },
});

// export const {
//   on,
//   selectionMusic,
//   statusChange,
//   typeChange,
//   titleChange,
//   setVolume,
//   startMusic,
//   toggleLoop,
//   toggleVolume,
//   contextChange,
//   togglePlay,
// } = musicSlice.actions;
export default musicSlice.reducer;

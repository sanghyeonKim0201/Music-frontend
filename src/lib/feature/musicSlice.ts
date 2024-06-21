import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  toggle: boolean;
  id: string | null;
  title: string | null;
  context: string | null;
  status: {
    playing: 'stop' | 'play';
    isVolume: boolean;
    loop: boolean;
  };
  volume: number;
  type: 'video' | 'playlist';
}

const initialState: InitialState = {
  toggle: false,
  id: null,
  title: null,
  context: null,
  status: { playing: 'stop', loop: false, isVolume: false },
  volume: 0.5,
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
    typeChange: (state, action: { payload: 'video' | 'playlist' }) => {
      state.type = action.payload;
    },
    titleChange: (state, action: { payload: string }) => {
      state.title = action.payload;
    },
    contextChange: (state, action: { payload: string }) => {
      state.context = action.payload;
    },
    startMusic: (
      state,
      action: {
        payload: {
          id: string;
          title: string;
          context: string;
          type: 'video' | 'playlist';
        };
      },
    ) => {
      const { id, title, context, type } = action.payload;
      state.id = id;
      state.title = title;
      state.context = context;
      state.toggle = true;
      state.status.playing = 'play';
      state.type = type;
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

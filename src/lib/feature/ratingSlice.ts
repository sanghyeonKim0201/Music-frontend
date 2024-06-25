import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  likeVideos: string[];
  dislikeVideos: string[];
}

const initialState: InitialState = {
  likeVideos: [],
  dislikeVideos: [],
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    init: (
      state,
      action: { payload: { likeVideos: string[]; dislikevideos: string[] } },
    ) => {
      state.dislikeVideos = action.payload.dislikevideos;
      state.likeVideos = action.payload.likeVideos;
    },
  },
});

export default ratingSlice.reducer;

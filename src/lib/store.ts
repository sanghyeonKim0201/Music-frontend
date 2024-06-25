import { combineReducers, configureStore } from '@reduxjs/toolkit';
import menuSlice from './feature/menuSlice';
import payloadSlice from './feature/payloadSlice';
import musicSlice from './feature/musicSlice';
import ratingSlice from './feature/ratingSlice';

const RootReducer = combineReducers({
  menuSlice,
  payloadSlice,
  musicSlice,
  ratingSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: { RootReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

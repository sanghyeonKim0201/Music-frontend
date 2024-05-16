import { combineReducers, configureStore } from '@reduxjs/toolkit';
import menuSlice from './feature/menuSlice';

const RootReducer = combineReducers({
  menuSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: { RootReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

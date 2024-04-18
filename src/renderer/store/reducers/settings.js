import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light'
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  }
});

export default settings.reducer;

export const { setTheme } = settings.actions;

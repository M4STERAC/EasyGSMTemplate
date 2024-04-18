import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  general: [], // { id, date: string, message, type: number }
  backups: [] // { id, game, name, date: string, status: number }
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setGeneralNotification: (state, action) => {
      state.general = action.payload.notifications;
    },

    setBackupNotification: (state, action) => {
      state.backups = action.payload.notifications;
    },

    deleteNotification: (state, action) => {
      const { type, id } = action.payload;
      if (type === 'general') {
        state.general = state.general.filter((notification) => notification.id !== id);
      } else if (type === 'backup') {
        state.backups = state.backups.filter((notification) => notification.id !== id);
      }
    }
  }
});

export default notification.reducer;

export const { setGeneralNotification, setBackupNotification, deleteNotification } = notification.actions;

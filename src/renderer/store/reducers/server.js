import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../utils/general';

const initialState = {
  servers: [], // { id, game, name, savePath, executablePath }
  selectedServer: {}, // server object
  notifications: {
    general: [], // { id, date: string, message, type: number }
    backups: [] // { id, game, name, date: string, status: number }
  }
};

const server = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServers: (state, action) => {
      state.servers = action.payload.servers;
    },

    addServer: (state, action) => {
      const id = generateId(10);
      const server = { id, players: 0, ...action.payload.server };
      state.servers.push(server);
    },

    updateServer: (state, action) => {
      state.servers = state.servers.map((server) => {
        if (server.id === action.payload.server.id) {
          return { ...action.payload.server, status: 0, players: 0 };
        }
        return server;
      });
      state.selectedServer = action.payload.server;
    },

    deleteServer: (state, action) => {
      state.servers = state.servers.filter((server) => server.id !== action.payload.id);
      state.selectedServer = {};
    },

    setSelectedServer: (state, action) => {
      if (action.payload && action.payload.selectedServer) state.selectedServer = action.payload.selectedServer;
    },

    setServerStatus: (state) => {
      state.selectedServer.status = state.selectedServer.status === 0 ? 1 : 0;
      if (state.selectedServer.status === 0) state.selectedServer.players = 0;
      state.servers = state.servers.map((server) => {
        if (server.id === state.selectedServer.id) {
          return state.selectedServer;
        }
        return server;
      });
    }
  }
});

export default server.reducer;

export const { setServers, addServer, deleteServer, setSelectedServer, setServerStatus, updateServer } = server.actions;

import { createContext, useState } from 'react';

// project import
import PropTypes from 'prop-types';

// Create a new context
const ServerContext = createContext();

// Create a component that holds the state
const AddServerContextProvider = ({ children }) => {
  const [state, setState] = useState({
    // Your initial state values here
    game: '',
    name: '',
    savePath: '',
    executablePath: '',
    banlist: '',
    ports: ''
  });

  // Define functions to update the state
  const updateServerGame = (game) => {
    setState((prevState) => ({
      ...prevState,
      game: game
    }));
  };

  const updateServerName = (name) => {
    setState((prevState) => ({
      ...prevState,
      name: name
    }));
  };

  const updateServerSavePath = (directory) => {
    setState((prevState) => ({
      ...prevState,
      savePath: directory
    }));
  };

  const updateServerExecutablePath = (executable) => {
    setState((prevState) => ({
      ...prevState,
      executablePath: executable
    }));
  };

  const updateServerBanlist = (banlist) => {
    setState((prevState) => ({
      ...prevState,
      banlist: banlist
    }));
  };

  const updateServerPorts = (ports) => {
    setState((prevState) => ({
      ...prevState,
      ports: ports
    }));
  };

  // Provide the state and update functions to the child components
  return (
    <ServerContext.Provider
      value={{
        state,
        updateServerGame,
        updateServerName,
        updateServerSavePath,
        updateServerExecutablePath,
        updateServerBanlist,
        updateServerPorts
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

AddServerContextProvider.propTypes = {
  children: PropTypes.node
};

export { ServerContext, AddServerContextProvider };

import { useMachine } from '@xstate/react';
import React, { useContext, createContext } from 'react';
import gameMachine from '../state-machines/game-machine';

const GameContext = createContext(null);

export const useGameMachine = () => useContext(GameContext);

function GameMachineProvider({ children }) {
  const machineService = useMachine(gameMachine, { devTools: true });
  return (
    <GameContext.Provider value={machineService}>
      {children}
    </GameContext.Provider>
  );
}

export default GameMachineProvider;

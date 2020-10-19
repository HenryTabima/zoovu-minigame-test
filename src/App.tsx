import React from 'react';
import Welcome from './components/welcome/welcome';
import Game from './components/game/game';
import { useGameMachine } from './services/game-service';
import GameOver from './components/game-over/game-over';

function App() {
  const [state, send] = useGameMachine();
  return (
    <div className="App">
      {state.matches('initializingPlayer') && (
        <Welcome onNameSubmit={(name) => send('SET_PLAYER_NAME', { name })} />
      )}
      {!state.matches('initializingPlayer') && <Game />}
      {state.matches('gameOver') && <GameOver />}
    </div>
  );
}

export default App;

import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

interface WelcomeProps {
  onNameSubmit: (name: string) => void;
}

function Welcome({ onNameSubmit }: WelcomeProps) {
  const [name, setName] = useState('');
  const handleSubmit = useCallback(() => {
    if (name !== '') {
      onNameSubmit(name);
    }
  }, [name, onNameSubmit]);
  return (
    <StyledWelcome>
      <h2 className="welcome-title">Hello friend, tell me your name...</h2>
      <input
        className="welcome-input"
        value={name}
        placeholder="Your name here"
        onChange={(e) => setName(e.target.value.trim())}
        onSubmit={handleSubmit}
      />
      <button className="welcome-submit-button" onClick={handleSubmit}>
        Let's Go →
      </button>
    </StyledWelcome>
  );
}

const StyledWelcome = styled.div`
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(190deg, #fff 60%, rgba(59, 0, 120, 0.3));
  .welcome-title {
    font-size: 1.3rem;
  }
  .welcome-input {
    width: 20%;
    max-width: 90%;
    border: none;
    border-bottom: 2px solid rgba(100, 100, 100, 0.3);
    text-align: center;
    margin-top: 30px;
    padding: 10px;
    font-size: 1.1rem;
    margin-bottom: 60px;
    background-color: transparent;
    color: gray;
  }
  .welcome-submit-button {
    color: #3b0078;
    background-color: white;
    border: 1px solid #ccc;
    font-size: 1rem;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    text-align: center;
    padding: 0 30px;
    border-radius: 20px;
    box-shadow: 0px 5px 20px -11px rgba(0, 0, 0, 0.75);
  }
`;

export default Welcome;

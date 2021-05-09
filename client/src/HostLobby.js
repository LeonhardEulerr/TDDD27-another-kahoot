import React, { useState, useContext, useEffect } from 'react';
import { QuizContext } from './Contexts/QuizContext';

export default function HostLobby() {
  const { pin, setPin } = useContext(QuizContext);

  // useEffect(() => {

  // }, []);

  return <div>{`Waiting for users to join: ${pin}`}</div>;
}

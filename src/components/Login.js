import React from 'react';
import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'; // Corrija o caminho se necessário
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/tasks'); // Redireciona para a página de tarefas após o login bem-sucedido
    } catch (error) {
      console.error("Erro durante o login com o Google: ", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" onClick={signInWithGoogle}>
        Login com Google
      </Button>
    </div>
  );
};

export default Login;

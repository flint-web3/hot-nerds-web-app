import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';
import { useHotWallet } from '../providers/HotWalletProvider';
import logo from '../assets/logo640x360.png';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { here, login, user } = useHotWallet();

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.expand();
    tg.onEvent('backButtonClicked', () => {
      tg.close();
    });
    return () => {
      tg.offEvent('backButtonClicked', () => { });
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  if (!here) return null;

  return (
    <div className="auth-page">
      <img src={logo} alt="Logo" className="logo" />
      <button onClick={login} className="connect-wallet-button">
        CONNECT HOT WALLET
      </button>
    </div>
  );
};

export default AuthPage;

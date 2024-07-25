import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotWallet } from '../providers/HotWalletProvider';
import '../styles/MainPage.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useHotWallet();

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.ready();
  }, []);

  if (!user) {
    navigate('/');
    return null;
  }

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="main-page">
      <div className="header">
        <div className="balance">
          HOT BALANCE: <span>{user.hotBalance} ({user.accounts.near})</span>
        </div>
        <button onClick={goToSettings} className="settings-button">
          <img src="/path/to/settings-icon.png" alt="Settings" />
        </button>
      </div>
      <div className="quiz-list">
        <div className="quiz-item">
          <div className="quiz-title">DAILY QUIZ</div>
          <div className="quiz-subtitle">SUBJECT: ANIMALS</div>
          <div className="quiz-timer">00:12:56</div>
          <button className="quiz-action-button">FREE</button>
        </div>
        <div className="quiz-item">
          <div className="quiz-title">EVENT QUIZ</div>
          <div className="quiz-subtitle">SUBJECT: CRYPTO</div>
          <div className="quiz-timer">05:42:56</div>
          <button className="quiz-action-button">0.5</button>
        </div>
        <div className="quiz-item">
          <div className="quiz-title">ANOTHER QUIZ</div>
          <div className="quiz-subtitle">SUBJECT: CARS</div>
          <div className="quiz-timer">13:12:56</div>
          <button className="quiz-action-button">5</button>
        </div>
      </div>
      <button className="leaderboards-button">LEADERBOARDS</button>
      <button onClick={logout} className="logout-button">LOGOUT</button>
    </div>
  );
};

export default MainPage;

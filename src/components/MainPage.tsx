import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotWallet } from '../providers/HotWalletProvider';
import '../styles/MainPage.css';
import settings_button from '../assets/settings_button.png';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useHotWallet();

    // Стейт для таймеров
    const [timers, setTimers] = useState({
        dailyQuiz: 775, // Время в секундах
        eventQuiz: 20676,
        anotherQuiz: 47556,
    });

    useEffect(() => {
        const tg = (window as any).Telegram.WebApp;
        tg.ready();

        const timerInterval = setInterval(() => {
            setTimers((prevTimers) => ({
                dailyQuiz: prevTimers.dailyQuiz > 0 ? prevTimers.dailyQuiz - 1 : 0,
                eventQuiz: prevTimers.eventQuiz > 0 ? prevTimers.eventQuiz - 1 : 0,
                anotherQuiz: prevTimers.anotherQuiz > 0 ? prevTimers.anotherQuiz - 1 : 0,
            }));
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

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
                    Welcome, <span>{user.accounts.near}</span>
                </div>
                <button onClick={goToSettings} className="settings-button">
                    <img src={settings_button} alt="Settings" className="settings-image" />
                </button>
            </div>
            <div className="quiz-list">
                <div className="quiz-item">
                    <button className="quiz-action-button">
                        <div className="quiz-title">DAILY QUIZ</div>
                    </button>
                    <div className="quiz-details">
                        <div className="quiz-timer">{formatTime(timers.dailyQuiz)}</div>
                        <div className="quiz-cost">FREE</div>
                    </div>
                </div>
                <div className="quiz-item">
                    <button className="quiz-action-button">
                        <div className="quiz-title">EVENT QUIZ</div>
                    </button>
                    <div className="quiz-details">
                        <div className="quiz-timer">{formatTime(timers.eventQuiz)}</div>
                        <div className="quiz-cost">0.5</div>
                    </div>
                </div>
                <div className="quiz-item">
                    <button className="quiz-action-button">
                        <div className="quiz-title">ANOTHER QUIZ</div>
                    </button>
                    <div className="quiz-details">
                        <div className="quiz-timer">{formatTime(timers.anotherQuiz)}</div>
                        <div className="quiz-cost">5</div>
                    </div>
                </div>
            </div>
            <button className="leaderboards-button">LEADERBOARDS</button>
        </div>
    );
};

export default MainPage;

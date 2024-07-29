import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotWallet } from '../providers/HotWalletProvider';
import { useQuizContext } from '../contexts/QuizContext';
import '../styles/MainPage.css';
import settings_button from '../assets/settings_button.png';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useHotWallet();
    const { quizData, setQuizData } = useQuizContext();
    const [timers, setTimers] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const tg = (window as any).Telegram.WebApp;
        tg.ready();

        const updateTimers = () => {
            setTimers(prevTimers => {
                const newTimers = { ...prevTimers };
                quizData?.forEach((quiz: any) => {
                    const dueDate = new Date(quiz.due).getTime();
                    const currentTime = new Date().getTime();
                    const timeLeft = Math.max(Math.floor((dueDate - currentTime) / 1000), 0);
                    newTimers[quiz.id] = timeLeft;
                });
                return newTimers;
            });
        };

        updateTimers();
        const timerInterval = setInterval(() => {
            setTimers(prevTimers => {
                const newTimers = { ...prevTimers };
                for (const quizId in newTimers) {
                    newTimers[quizId] = Math.max(newTimers[quizId] - 1, 0);
                }
                return newTimers;
            });
        }, 1000);

        try {
            fetch("https://hotnerds.ru/api/user/" + user?.accounts.near + "/quizzes")
                .then(response => response.json())
                .then(data => {
                    setQuizData(data);
                    updateTimers();
                });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }

        return () => clearInterval(timerInterval);
    }, [quizData, user?.accounts.near, setQuizData]);

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

    const startQuiz = (quizId: number) => {
        navigate(`/quiz-start/${quizId}`);
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
                {quizData && quizData.length > 0 ? (
                    quizData.map((quiz: any) => (
                        <div key={quiz.id} className="quiz-item">
                            <button className="quiz-action-button" onClick={() => startQuiz(quiz.id)}>
                                <div className="quiz-title">{quiz.name.toUpperCase()}</div>
                            </button>
                            <div className="quiz-details">
                                <div className="quiz-timer">{formatTime(timers[quiz.id] || 0)}</div>
                                <div className="quiz-cost">{quiz.price === 0 ? 'FREE' : quiz.price}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading quizzes...</div>
                )}
            </div>
            <button className="leaderboards-button">LEADERBOARDS</button>
        </div>
    );
};

export default MainPage;

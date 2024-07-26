import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/StartQuizPage.css';
import startQuizLogo from '../assets/start-quiz-logo.png';

const StartQuizPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate(`/quiz/${id}`);
    };

    const handleGoBack = () => {
        navigate('/main');
    };

    return (
        <div className="start-quiz-page">
            <img src={startQuizLogo} alt="StartQuizLogo" className="startQuizLogo" />
            <button className="start-quiz-button" onClick={handleStartQuiz}>
                Start the quiz!
            </button>
            <button className="go-back-button" onClick={handleGoBack}>
                Go back
            </button>
        </div>
    );
};

export default StartQuizPage;

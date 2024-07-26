import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/QuizResultPage.css';

const QuizResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { correctAnswers, totalQuestions, totalTime } = location.state as { correctAnswers: number, totalQuestions: number, totalTime: number };

    const handleBackToMain = () => {
        navigate('/main');
    };

    return (
        <div className="quiz-result-page">
            <div className="result-title">QUIZ RESULT</div>
            <div className="result-details">
                <div>RESULT: {correctAnswers}/{totalQuestions}</div>
                {/* <div>TIME SPENT: {totalTime} S</div>
                <div>QUIZ DAYS LEFT: 3</div>
                <div>OVERALL RESULT: 37/70</div> You can calculate or fetch this value from the backend */}
            </div>
            <button className="main-button" onClick={handleBackToMain}>
                GO TO MAIN PAGE
            </button>
        </div>
    );
};

export default QuizResultPage;

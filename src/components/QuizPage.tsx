import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/QuizPage.css';
import { useHotWallet } from '../providers/HotWalletProvider';
import { useQuizQuestionsContext } from '../contexts/QuizQuestionsContext';

interface QuizQuestion {
    question: string;
    answers: string[];
    correct_answer: number;
}

const QuizPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [timer, setTimer] = useState(10);
    const [quizStarted, setQuizStarted] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const { user } = useHotWallet();
    const { quizQuestionsData, setQuizQuestionsData } = useQuizQuestionsContext();

    useEffect(() => {
        if (!quizStarted) return;

        if (timer === 0) {
            handleNextQuestion();
        }

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
            setTotalTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timer, quizStarted]);

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
        const isCorrect = index === quizQuestionsData[currentQuestionIndex].correct_answer;
        setIsAnswerCorrect(isCorrect);
        if (isCorrect) {
            setCorrectAnswers((prevCount) => prevCount + 1);
        }
    };

    const handleNextQuestion = async () => {
        if (currentQuestionIndex < quizQuestionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswerCorrect(null);
            setTimer(10);
        } else {
            try {
                await fetch("https://0945-91-185-10-127.ngrok-free.app/user/" + user?.accounts.near + "/quiz_score/" + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ score: correctAnswers }),
                });
            } catch (error) {
                console.error('Error:', error);
            }
            navigate('/quiz-result', { state: { correctAnswers, totalQuestions: quizQuestionsData.length, totalTime } });
        }
    };

    const handleStartQuiz = async () => {
        try {
            await fetch(`https://0945-91-185-10-127.ngrok-free.app/user/${user?.accounts.near}/join_quiz/${id}`)
                .then(response => response.json())
                .then(data => console.log(data));
        } catch (error) {
            console.error('Error joining quiz:', error);
        }

        try {
            await fetch(`https://0945-91-185-10-127.ngrok-free.app/user/${user?.accounts.near}/quiz_questions/${id}`)
                .then(response => response.json())
                .then(data => setQuizQuestionsData(data));
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
        if (!quizQuestionsData || quizQuestionsData.length === 0) {
            return <div>Loading...</div>;
        }
        setQuizStarted(true);
        setTimer(10);
    };

    const handleGoBack = () => {
        navigate('/main');
    };

    return (
        <div className="quiz-page">
            {!quizStarted ? (
                <div className="start-quiz-container">
                    <div className="start-quiz-question">Are you ready?</div>
                    <button className="start-quiz-button" onClick={handleStartQuiz}>
                        Start the quiz!
                    </button>
                    <button className="go-back-button" onClick={handleGoBack}>
                        Go back
                    </button>
                </div>
            ) : (
                <>
                    <div className="timer">{timer}s</div>
                    <div className="question">{quizQuestionsData[currentQuestionIndex].question}</div>
                    <div className="options">
                        {quizQuestionsData[currentQuestionIndex].answers.map((option: any, index: any) => (
                            <button
                                key={index}
                                className={`option ${selectedOption === index ? (isAnswerCorrect ? 'correct selected' : 'wrong selected') : ''}`}
                                onClick={() => handleOptionClick(index)}
                                disabled={selectedOption !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {selectedOption !== null && (
                        <div className={`result ${isAnswerCorrect ? 'correct' : 'wrong'}`}>
                            {isAnswerCorrect ? 'Correct' : 'Incorrect'}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/QuizPage.css';
import { useHotWallet } from '../providers/HotWalletProvider';
import { useQuizQuestionsContext } from '../contexts/QuizQuestionsContext';


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
                await fetch(`https://hotnerds.ru/api/user/${user?.accounts.near}/quiz_score/${id}`, {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const joinQuizResponse = await fetch(`https://hotnerds.ru/api/user/${user?.accounts.near}/join_quiz/${id}`);
                const joinQuizData = await joinQuizResponse.json();
                console.log(joinQuizData);

                const questionsResponse = await fetch(`https://hotnerds.ru/api/user/${user?.accounts.near}/quiz_questions/${id}`);
                const questionsData = await questionsResponse.json();
                console.log('Questions data fetched:', questionsData);
                setQuizQuestionsData(questionsData);
                setQuizStarted(true);
                setTimer(10);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, setQuizQuestionsData, user?.accounts.near]);

    useEffect(() => {
        console.log('Quiz Questions Data:', quizQuestionsData);
    }, [quizQuestionsData]);

    if (!quizQuestionsData || quizQuestionsData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="quiz-page">
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
        </div>
    );
};

export default QuizPage;

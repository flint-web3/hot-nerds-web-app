import React, { createContext, useState, useContext } from 'react';

interface QuizQuestionsContextType {
    quizQuestionsData: any;
    setQuizQuestionsData: (data: any) => void;
}

const QuizQuestionsContext = createContext<QuizQuestionsContextType | undefined>(undefined);

interface QuizQuestionsProviderProps {
    children: React.ReactNode;
}

export const QuizQuestionsProvider: React.FC<QuizQuestionsProviderProps> = ({ children }) => {
    const [quizQuestionsData, setQuizQuestionsData] = useState<any>(null);

    return (
        <QuizQuestionsContext.Provider value={{ quizQuestionsData, setQuizQuestionsData }}>
            {children}
        </QuizQuestionsContext.Provider>
    );
};

export const useQuizQuestionsContext = () => {
    const context = useContext(QuizQuestionsContext);
    if (context === undefined) {
        throw new Error('useQuizQuestionsContext must be used within a QuizQuestionsProvider');
    }
    return context;
};
import React, { createContext, useState, useContext } from 'react';

interface QuizContextType {
    quizData: any;
    setQuizData: (data: any) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
    children: React.ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
    const [quizData, setQuizData] = useState<any>(null);

    return (
        <QuizContext.Provider value={{ quizData, setQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};
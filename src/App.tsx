import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import MainPage from './components/MainPage';
import SettingsPage from './components/SettingsPage';
import QuizPage from './components/QuizPage';
import QuizResultPage from './components/QuizResultPage';
import StartQuizPage from './components/StartQuizPage';
import { HotWalletProvider } from './providers/HotWalletProvider';
import { QuizProvider } from './contexts/QuizContext';
import { QuizQuestionsProvider } from './contexts/QuizQuestionsContext';
import './App.css';

const App: React.FC = () => {
  return (
    <HotWalletProvider>
      <QuizProvider>
        <QuizQuestionsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/quiz-start/:id" element={<StartQuizPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/quiz-result" element={<QuizResultPage />} />
            </Routes>
          </Router>
        </QuizQuestionsProvider>
      </QuizProvider>
    </HotWalletProvider>
  );
};

export default App;

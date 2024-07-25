import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import MainPage from './components/MainPage';
import SettingsPage from './components/SettingsPage';
import { HotWalletProvider } from './providers/HotWalletProvider';
import './App.css';

const App: React.FC = () => {
  return (
    <HotWalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </HotWalletProvider>
  );
};

export default App;

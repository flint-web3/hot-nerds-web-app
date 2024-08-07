import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotWallet } from '../providers/HotWalletProvider';
import { TelegramWebApp, WebAppBackButton } from '@kloktunov/react-telegram-webapp';
import '../styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useHotWallet();

    useEffect(() => {
        const tg = (window as any).Telegram.WebApp;

        tg.BackButton.show();

        const handleBackButtonClick = () => {
            navigate('/main');
        };

        tg.onEvent('backButtonClicked', handleBackButtonClick);

        return () => {
            tg.offEvent('backButtonClicked', handleBackButtonClick);
            tg.BackButton.hide();
        };
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <TelegramWebApp>
            <div className="settings-page">
                <div className="settings-title">SETTINGS</div>
                <button className="settings-option">SELECT ACCOUNT</button>
                <button className="settings-option">LANGUAGE</button>
                <button className="settings-option">TECH SUPPORT</button>
                <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
            </div>
            <WebAppBackButton onClick={() => navigate('/main')} />
        </TelegramWebApp>
    );
};

export default SettingsPage;

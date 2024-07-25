import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotWallet } from '../providers/HotWalletProvider';
import '../styles/SettingsPage.css';

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useHotWallet();

    useEffect(() => {
        const tg = (window as any).Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate('/main');
        });

        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(() => { });
        };
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="settings-page">
            <div className="settings-title">SETTINGS</div>
            <button className="settings-option">SELECT ACCOUNT</button>
            <button className="settings-option">LANGUAGE</button>
            <button className="settings-option">TECH SUPPORT</button>
            <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
        </div>
    );
};

export default SettingsPage;

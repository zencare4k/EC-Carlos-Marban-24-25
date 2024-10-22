import React from 'react';
import styles from './Component.module.css';

const Login = () => {
    const handleLogin = () => {
        const url = 'https://discord.com/oauth2/authorize?client_id=1296384553379827712&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&scope=identify';
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null; 
    };
    
    return (
        <div>
            <br />
            <button onClick={handleLogin} >
                <img id={styles.DiscordButton} src="https://i.imgur.com/RBfcoBt.png" alt="Iniciar sesión con Discord" />
            </button>
        </div>
    );
};

export default Login;

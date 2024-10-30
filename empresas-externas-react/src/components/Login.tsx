import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    background-color: #f0f4f8; 
    padding: 0 20px; 

    @media (max-width: 480px) {
        padding: 0 10px;
    }
`;

const Form = styled.div`
    background-color: white; 
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px; 

    @media (max-width: 480px) {
        padding: 20px; 
    }
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px; 
    color: #333; 
    text-align: center;

    @media (max-width: 480px) {
        font-size: 20px; 
    }
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 12px; 
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    font-size: 16px; 
    transition: border-color 0.3s;

    &:focus {
        border-color: #076344;
        outline: none; 
    }

    @media (max-width: 480px) {
        font-size: 14px; 
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 14px; 

    @media (max-width: 480px) {
        font-size: 13px;
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const Button = styled.button`
    padding: 12px 0; 
    background-color: #076344;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px; 
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #054d3a; 
    }

    @media (max-width: 480px) {
        padding: 10px 0;
        font-size: 15px; 
    }
`;

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home/partners';

    useEffect(() => {
        const storedUsername =
            localStorage.getItem('username') ||
            document.cookie
                .split('; ')
                .find(row => row.startsWith('username='))
                ?.split('=')[1] ||
            '';
        setUsername(storedUsername);
    }, []);

    const handleLogin = () => {
        if (rememberMe) {
            document.cookie = `username=${username}; path=/; max-age=${60 * 60 * 24 * 30}`; // Cookie por 30 dias
        } else {
            localStorage.setItem('username', username);
        }

        navigate(from, { replace: true });
    };

    return (
        <Container>
            <Form>
                <Title>Login</Title>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuário"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <Label>
                    <Checkbox
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Manter conectado
                </Label>
                <Button onClick={handleLogin}>Entrar</Button>
            </Form>
        </Container>
    );
};

export default Login;

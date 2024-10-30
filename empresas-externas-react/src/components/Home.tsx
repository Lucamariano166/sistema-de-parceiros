import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    font-family: Arial, sans-serif;
`;

const Navbar = styled.nav`
    background-color: #076344; 
    padding: 20px;
    color: white;

    h1 {
        margin: 0;
        font-size: 24px; 
    }

    ul {
        list-style-type: none; 
        padding: 0; 
        margin: 0; 
        display: flex;
        gap: 20px; 
    }

    a {
        color: white; 
        text-decoration: none; 
        font-size: 16px; 
        transition: color 0.3s;

        &:hover {
            color: #ff3c00; 
        }
    }
`;

const Main = styled.main`
    flex: 1; 
    padding: 20px; 
    background-color: #f0f4f8; 
`;

const Home: React.FC = () => {
    return (
        <Container>
            <Navbar>
           
                <ul>
                    <li><Link to="/home/create-partner">Cadastrar Empresa</Link></li>
                    <li><Link to="/home/partners">Listar Todos as Empresas</Link></li>
                    <li><Link to="/home/about">Sobre a Aplicação</Link></li>
                    <li><Link to="/">Sair</Link></li>
                </ul>
            </Navbar>
            <Main>
                <Outlet />
            </Main>
        </Container>
    );
};

export default Home;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-color: #f7f9fc; 
    padding: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center; 
`;

const Paragraph = styled.p`
    max-width: 600px;
    text-align: center; 
    line-height: 1.6;
    color: #333; 
`;

const About: React.FC = () => {
    return (
        <Container>
            <Title>Sobre a Aplicação</Title>
            <Paragraph>
                Este projeto foi desenvolvido para gerenciar parceiros e empresas externas.
                Utilizamos tecnologias como React e TypeScript. O sistema tem como objetivo
                facilitar o registro e a visualização de informações relevantes.
            </Paragraph>
        </Container>
    );
};

export default About;

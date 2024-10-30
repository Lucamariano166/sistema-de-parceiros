import React, { useState } from 'react';
import { createPartner } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-color: #f7f9fc; 
`;

const FormContainer = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center; 
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px; 
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column; 
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 8px; 
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
        border-color: #076344; 
        outline: none;
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
`;

const ErrorMessage = styled.p`
    color: red;
    margin: 0;
`;

const Button = styled.button`
    background-color: #076344;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #065e3c;
    }
`;

const CreatePartner: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [collaboratorsCount, setCollaboratorsCount] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await createPartner({
                companyName,
                collaboratorsCount: Number(collaboratorsCount),
                isActive,
            });
            navigate('/home/partners'); 
        } catch (err) {
            setError('Erro ao cadastrar Empresa');
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>Cadastrar Empresa</Title>
                <Form onSubmit={handleSubmit}>
                    <FieldContainer>
                        <Label>Nome da Empresa:</Label>
                        <Input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Label>Colaboradores:</Label>
                        <Input
                            type="number"
                            value={collaboratorsCount}
                            onChange={(e) => setCollaboratorsCount(e.target.value)}
                            required
                        />
                    </FieldContainer>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Ativo
                    </CheckboxLabel>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default CreatePartner;

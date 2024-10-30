// src/components/EditPartner.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPartner: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [companyName, setCompanyName] = useState<string>('');
    const [collaboratorsCount, setCollaboratorsCount] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartner = async () => {
            const response = await fetch(`https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners/${id}`);
            const data = await response.json();
            setCompanyName(data.companyName);
            setCollaboratorsCount(data.collaboratorsCount);
            setIsActive(data.isActive);
        };

        fetchPartner();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedPartner = { companyName, collaboratorsCount, isActive };
        await fetch(`https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPartner),
        });
        navigate('/partners');
    };

    return (
        <div>
            <h2>Editar Parceiro</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nome da Empresa"
                    required
                />
                <input
                    type="number"
                    value={collaboratorsCount}
                    onChange={(e) => setCollaboratorsCount(Number(e.target.value))}
                    placeholder="Número de Colaboradores"
                    required
                />
                <label>
                    Ativo:
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditPartner;

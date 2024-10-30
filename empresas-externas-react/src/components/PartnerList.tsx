import React, { useEffect, useState } from 'react';
import { fetchPartners, deletePartner } from '../services/api';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PAGE_SIZE = 5;

const Container = styled.div`
    padding: 10px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h2`
    margin-bottom: 15px;
    font-size: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;

    th, td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd;
        font-size: 14px;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    @media (max-width: 600px) {
        font-size: 12px;

        th, td {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        tr {
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
        }
    }
`;

const Button = styled.button`
    background-color: #076344; 
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 10px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 14px;

    &:hover {
        background-color: #065e3c; 
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const PartnerList: React.FC = () => {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const initialPage = Number(queryParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const getPartners = async () => {
            try {
                const data = await fetchPartners();
                setPartners(data);
                setTotalPages(Math.ceil(data.length / PAGE_SIZE));
            } catch {
                setError('Erro ao carregar parceiros');
            } finally {
                setLoading(false);
            }
        };
        getPartners();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja deletar este parceiro?')) {
            try {
                await deletePartner(id);
                setPartners((prev) => prev.filter((partner) => partner.id !== id));
            } catch {
                setError('Erro ao deletar parceiro');
            }
        }
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    const currentPartners = partners.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Title>Lista de Empresas</Title>
            <Link to="/home/create-partner">
                <Button>Cadastrar Nova Empresa</Button>
            </Link>
            {currentPartners.length > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da Empresa</th>
                            <th>Colaboradores</th>
                            <th>Ativo</th>
                            <th>Último Envio</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPartners.map((partner) => (
                            <tr key={partner.id}>
                                <td>{partner.id}</td>
                                <td>{partner.companyName}</td>
                                <td>{partner.collaboratorsCount}</td>
                                <td>{partner.isActive ? 'Sim' : 'Não'}</td>
                                <td>{partner.lastSubmit ? new Date(partner.lastSubmit).toLocaleDateString() : 'Nunca'}</td>
                                <td>
                                    <Button onClick={() => handleDelete(partner.id)}>Deletar</Button>
                                    <Link to={`/home/edit-partner/${partner.id}`}>
                                        <Button>Editar</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Nenhum parceiro encontrado.</p>
            )}
            <Pagination>
                <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próxima
                </Button>
            </Pagination>
        </Container>
    );
};

export default PartnerList;

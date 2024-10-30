// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

export const fetchPartners = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchPartnerById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPartner = async (partner: any) => {
    const response = await axios.post(API_URL, partner);
    return response.data;
};

export const updatePartner = async (id: string, partner: any) => {
    const response = await axios.put(`${API_URL}/${id}`, partner);
    return response.data;
};

export const deletePartner = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};


import { getToken } from '../seguranca/Autenticacao';

export const getCardsAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cards`,
        {
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        })
    const data = await response.json()
    return data;
}

export const getCardPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cards/${codigo}`,
        {
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCardPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cards/${codigo}`,
        {
            method: "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const updateCardAPI = async (objeto) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cards`, {
        method: "PUT",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
};

export const cadastraCardAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cards`, {
        method: metodo,
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}
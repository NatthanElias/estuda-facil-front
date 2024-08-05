import { getToken } from '../seguranca/Autenticacao';

export const getDecksAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/decks`,
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

export const getDeckPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/decks/${codigo}`,
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

export const deleteDeckPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/decks/${codigo}`,
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

export const cadastraDeckAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/decks`, {
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
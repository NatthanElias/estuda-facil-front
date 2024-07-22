import { useState, useEffect } from 'react';
import CardContext from './CardContext';
import FlashCardList from './FlashCardList';
import Form from './Form';
import { getDecksAPI } from '../../../services/DeckServico';
import { getCardsAPI, getCardPorCodigoAPI, deleteCardPorCodigoAPI, cadastraCardAPI } from '../../../services/CardServico';
import Carregando from '../../common/Carregando';

function Card() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaDecks, setListaDecks] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: 0,
        pergunta: "",
        resposta: "",
        deck_id: "", // Adicione este campo
        deck_nome: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            pergunta: "",
            resposta: "",
            deck_id: "",
            deck_nome: ""
        });
    };

    const editarObjeto = async codigo => {
        const card = await getCardPorCodigoAPI(codigo);
        setObjeto(card || { codigo: 0, pergunta: "", resposta: "", deck_id: "", deck_nome: "" });
        setEditar(true);
        setAlerta({ status: "", message: "" });
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCardAPI({
                ...objeto,
                deck_id: objeto.deck_id // Assegure-se de que deck_id está sendo enviado
            }, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaCards();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "deck_nome") {
            const selectedDeck = listaDecks.find(deck => deck.nome === value);
            setObjeto({
                ...objeto,
                [name]: value,
                deck_id: selectedDeck ? selectedDeck.codigo : ""
            });
        } else {
            setObjeto({
                ...objeto,
                [name]: value
            });
        }
    };

    const [carregando, setCarregando] = useState(true);

    const recuperaCards = async () => {
        setCarregando(true);
        const cards = await getCardsAPI();
        setListaObjetos(cards);
        setCarregando(false);
    };

    const recuperaDecks = async () => {
        const decks = await getDecksAPI();
        setListaDecks(decks);
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCardPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaCards();
        }
    };

    useEffect(() => {
        recuperaDecks();
        recuperaCards();
    }, []);

    return (
        <CardContext.Provider value={{
                alerta, setAlerta,
                listaObjetos,
                remover,
                objeto,
                editar,
                acaoCadastrar,
                handleChange, novoObjeto, editarObjeto, listaDecks
            }}>
            <Carregando carregando={carregando}>
                <FlashCardList />
            </Carregando>
            <Form />
        </CardContext.Provider>
    );
}

export default Card;
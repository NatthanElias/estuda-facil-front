import { useState, useEffect } from 'react';
import DeckContext from './DeckContext';
import { getDecksAPI, getDeckPorCodigoAPI, deleteDeckPorCodigoAPI, cadastraDeckAPI } from '../../../services/DeckServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from '../../common/Carregando';

function Deck() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: ""
    });

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: ""
        });
    }

    const editarObjeto = async codigo => {
        setObjeto(await getDeckPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }
    
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraDeckAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }

        recuperaDecks();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const [carregando, setCarregando] = useState(true);

    const recuperaDecks = async () => {
        setCarregando(true);
        setListaObjetos(await getDecksAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteDeckPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaDecks();
        }
    }

    useEffect(() => {
        recuperaDecks();
    }, []);

    return (
        <DeckContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover,
                objeto,
                editar,
                acaoCadastrar,
                handleChange, novoObjeto, editarObjeto
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />  
            </Carregando>
            <Form />
        </DeckContext.Provider>
    );
}

export default Deck;
import { useState, useEffect } from 'react';
import DeckContext from './DeckContext';
import { getDecksAPI, getDeckPorCodigoAPI, deleteDeckPorCodigoAPI, cadastraDeckAPI } from '../../../services/DeckServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from '../../common/Carregando';
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Deck() {

    let navigate = useNavigate();

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
        try {
            setObjeto(await getDeckPorCodigoAPI(codigo))
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }    
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
            navigate("/login", { replace: true });
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
        try {
            setCarregando(true);
            setListaObjetos(await getDecksAPI());
            setCarregando(false);
        } catch (err){
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteDeckPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
                recuperaDecks();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }

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

export default WithAuth(Deck);
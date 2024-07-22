import { useContext } from "react";
import CardContext from "./CardContext";
import Alerta from "../../common/Alerta";

function FlashCardList() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(CardContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Flash Cards</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 && (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {listaObjetos.map((objeto) => (
                        <div className="col" key={objeto.codigo}>
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <p className="card-text">Deck: {objeto.deck_nome} | ID: {objeto.deck_id}</p>
                                    <h5 className="card-title">{objeto.pergunta}</h5>
                                    <p className="card-text">{objeto.resposta}</p>
                                </div>
                                <div className="card-footer bg-transparent border-success">
                                    <button
                                        type="button"
                                        className="btn btn-info m-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEdicao"
                                        onClick={() => editarObjeto(objeto.codigo)}
                                    >
                                        Editar <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger m-1"
                                        onClick={() => remover(objeto.codigo)}
                                    >
                                        Remover <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FlashCardList;
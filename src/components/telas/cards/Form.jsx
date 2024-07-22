import React, { useContext, useEffect } from 'react';
import Alerta from '../../common/Alerta';
import CardContext from './CardContext';
import CampoEntrada from '../../common/CampoEntrada';
import Dialogo from '../../common/Dialogo';
import CampoSelect from '../../common/CampoSelect';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta, listaDecks } = useContext(CardContext);

    return (
        <Dialogo id="modalEdicao" titulo="Card"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido={false}
                name="codigo" value={objeto.codigo} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} />
            <CampoEntrada id="txtPergunta" label="Pergunta" tipo="text"
                placeholder="Informe a pergunta" requerido={true}
                name="pergunta" value={objeto.pergunta} onchange={handleChange}
                msgvalido="Campo pergunta OK" msginvalido="Informe a pergunta"
                readonly={false} />
            <CampoEntrada id="txtResposta" label="Resposta" tipo="text"
                placeholder="Informe a resposta" requerido={true}
                name="resposta" value={objeto.resposta} onchange={handleChange}
                msgvalido="Campo resposta OK" msginvalido="Informe a resposta"
                readonly={false} />
            <CampoSelect id="selectDeck" label="Deck"
                requerido={true}
                name="deck_nome" value={objeto.deck_nome}
                onchange={handleChange}
                msgvalido="Campo deck OK" msginvalido="Selecione um deck"
                readonly={false}>
                <option value="">Selecione um deck</option>
                {listaDecks.map(deck => (
                    <option value={deck.nome} key={deck.codigo}>{deck.nome}</option>
                ))}
            </CampoSelect>
        </Dialogo>
    );
}

export default Form;
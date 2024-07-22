import { useContext } from 'react';
import Alerta from '../../common/Alerta';
import DeckContext from './DeckContext';
import CampoEntrada from '../../common/CampoEntrada';
import Dialogo from '../../common/Dialogo';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(DeckContext);

    return (
        <Dialogo id="modalEdicao" titulo="Deck"
            idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                placeholder="" requerido={false}
                name="codigo" value={objeto.codigo} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                placeholder="Informe o nome" requerido={true}
                name="nome" value={objeto.nome} onchange={handleChange}
                msgvalido="Campo nome OK" msginvalido="Informe o nome"
                readonly={false} />
            <CampoEntrada id="txtDescricao" label="Descrição (opcional)" tipo="text"
                placeholder="Informe a descrição" requerido={false}
                name="descricao" value={objeto.descricao} onchange={handleChange}
                msgvalido="" msginvalido=""
                readonly={false} />
        </Dialogo>
    );
}

export default Form;

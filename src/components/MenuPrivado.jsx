import { NavLink, Outlet } from 'react-router-dom';
import './Menu.css';
import { getUsuario, logout } from '../seguranca/Autenticacao';

const MenuPrivado = () => {

    const usuario = getUsuario();
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand custom-navbar-brand" aria-current="page" exact to="/privado">Estuda Fácil 📚</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" exact to="/privado">Home</NavLink>
                            </li>
                            {usuario &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Manutenções
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><NavLink className="dropdown-item" exact to="decks">Decks</NavLink></li>
                                        <li><NavLink className="dropdown-item" exact to="cards">Cards</NavLink></li>                                    
                                    </ul>
                                </li>
                            }
                            <li className="nav-item">
                                <span className="nav-link active estude-section">
                                    <span className="default-text">Estude agora! <i className="bi bi-tools"></i></span>
                                    <span className="hover-text">on build...</span>
                                </span>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {usuario ? "Usuario: " + usuario.nome : "Usuário"}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        {
                                            usuario
                                                ?
                                                <NavLink className="dropdown-item" 
                                                exact="true" to="/" onClick={()=> logout()}
                                                >Logout</NavLink>
                                                :
                                                <NavLink className="dropdown-item" 
                                                exact="true" to="/login">Login</NavLink>
                                        }
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};

export default MenuPrivado; 
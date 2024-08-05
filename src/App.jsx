import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './components/telas/Home'
import Deck from './components/telas/decks/Deck'
import Card from './components/telas/cards/Card'
import Login from './components/telas/login/Login'
import MenuPublico from "./components/MenuPublico";
import MenuPrivado from "./components/MenuPrivado";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "decks",
        element : <Deck />
      },
      {
        path : "cards",
        element : <Card />
      }     
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
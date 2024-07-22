import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './components/Menu'
import Home from './components/telas/Home'
import Deck from './components/telas/decks/Deck'
import Card from './components/telas/cards/Card'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "/decks",
        element : <Deck />
      },
      {
        path : "/cards",
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
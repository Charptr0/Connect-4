import { io } from 'socket.io-client';
import { usePages } from './Hooks/usePages';
import Home from './Pages/Home/Home';
import Play from './Pages/Play/Play';
import { Page } from './Utils';
import "./App.scss";

const socket = io("https://charptr0-connect-4-backend.herokuapp.com/", {
  autoConnect : false,
});

function App() {
  const [page, switchPage] = usePages(Page.Home);
  
  return (
  <>
    {page === Page.Home && <Home switchPage={switchPage} />}
    {page === Page.PlayOnline && <Play socket={socket} switchPage={switchPage} />}
  </>
  );
}

export default App;

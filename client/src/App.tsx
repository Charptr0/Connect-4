import { io } from 'socket.io-client';
import { usePages } from './Hooks/usePages';
import Home from './Pages/Home/Home';
import Play from './Pages/Play/Play';
import { Page } from './Utils';
import "./App.scss";
import PlayLocal from './Pages/PlayLocal/PlayLocal';

const socket = io("https://connect4-backend.charptrzero.net", {
  autoConnect: false,
});

function App() {
  const [page, switchPage] = usePages(Page.Home);

  return (
    <>
      {page === Page.Home && <Home switchPage={switchPage} />}
      {page === Page.PlayOnline && <Play socket={socket} switchPage={switchPage} />}
      {page === Page.PlayLocal && <PlayLocal />}

    </>
  );
}

export default App;

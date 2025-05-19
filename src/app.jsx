import Gachapon from "./Components/GachaPon/juego-gachapon.jsx";
import PantallaCarga from "./Components/CargaDeRecursos/pantalla-carga.jsx";
import { AudioProvider } from "./contexts/audio-context.jsx";
import './index.css';

function App() {
  return (
    <AudioProvider>
      <PantallaCarga>
        <Gachapon />
      </PantallaCarga>
    </AudioProvider>
  );
}

export default App;
import Gachapon from "./Components/GachaPon/juego-gachapon.jsx";
import { AudioProvider } from "./contexts/audio-context.jsx";

function App() {
  return (
    <AudioProvider>
      <Gachapon />
    </AudioProvider>
  );
}

export default App;
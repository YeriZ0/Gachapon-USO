import { useState, useRef } from 'react';
import "./gachapon.css";
import GachaponAnimation from "./gachapon-animacion.jsx";
import RecompensaModal from "../PixelFrame/custom-modal.jsx";
import InstruccionesModal from "../PixelFrame/instrucciones-modal.jsx";
import VolumenControl from '../Sonidos/volumen-control.jsx';
import { useUISounds, useRewardSounds } from '../../hooks/useSound.js';

import iconUsuario from "../../assets/Usuario.png";
import iconDaro from "../../assets/Daro Points.png";
import iconUso from "../../assets/USO Coins.png";
import nubesGif from "../../assets/Animacion/Nubes.gif";

import inserteMonedaGif from '../../assets/Animacion/Inserte Moneda.gif';
import monedaInGif from '../../assets/Animacion/Moneda In.gif';
import comunGif from '../../assets/Animacion/Comun.gif';
import epicoGif from '../../assets/Animacion/Epico.gif';
import legendarioGif from '../../assets/Animacion/Legendario.gif';

const Gachapon = () => {
  const [coins, setCoins] = useState(10);
  const [score, setScore] = useState(0);
  const [mostrarRecompensa, setMostrarRecompensa] = useState(false);
  const [recompensaActual, setRecompensaActual] = useState(null);
  const gachaMachineRef = useRef(null);
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(true);
  const { playCoin, playButton } = useUISounds();
  const { playCommon, playEpic, playLegendary } = useRewardSounds();
  

  const handleAnimationChange = (state, reward) => {
    const gachaMachine = gachaMachineRef.current;
    if (!gachaMachine) return;

    switch(state) {
      case 'inserting':
        gachaMachine.src = monedaInGif;
      break;
      case 'showing':   
        if (reward) {
          // Cambia el gif de la máquina según la rareza de la recompensa
          // Reproduce el sonido correspondiente
          switch (reward.rarity.toLowerCase()) {
            case 'comun':
              playCommon();
            break;
            case 'epico':
              playEpic();
            break;
            case 'legendario':
              playLegendary();
            break;
            default:
              console.error("No se ha encontrado:", reward.rarity);
            break;
          }
          const gif = getRewardGif(reward.rarity);
          gachaMachine.src = `${gif}?t=${Date.now()}`;
        }
        break;
      case 'idle':
        gachaMachine.src = inserteMonedaGif;
      break;
      default:
        gachaMachine.src = inserteMonedaGif;
      break;
    }
  };

  const handleFinishAnimation = (reward) => {
    if (reward) {
      console.log("Recompensa actual:", reward);
      setRecompensaActual(reward);
      setMostrarRecompensa(true);
      setScore(prev => prev + reward.points);
    }
  }

  const getRewardGif = (rarity) => {
    switch(rarity) {
      case 'Comun': return comunGif;
      case 'Epico': return epicoGif;
      case 'Legendario': return legendarioGif;
      default: return inserteMonedaGif;
    }
  };

  const {
    play,
    isPlaying
  } = GachaponAnimation({
    onUpdateCoins: setCoins,
    onUpdateScore: setScore,
    onAnimationChange: handleAnimationChange,
    onFinishAnimation: handleFinishAnimation
  });

  const handlePlay = () => {
    playButton();
    playCoin(); 
    play(coins);
  };

  const handleCloseModal = () => {
    setMostrarRecompensa(false);
    setRecompensaActual(null);
  };

  return (
    <div className="contenido">
      
      {mostrarInstrucciones && (
        <InstruccionesModal onClose={() => setMostrarInstrucciones(false)} />
      )}
      <div id="barra-superior">
        <div id="Menu">
          <img id="user-icon" className="icono-barra" src={iconUsuario} alt="Usuario" />
        </div>
        <div id="puntajes" className="puntajes">
          <div className="grupo-puntajes">
            <img id="daro-point" className="icono-barra" src={iconDaro} alt="Daro Points" />
            <span id="score">{score}</span>
          </div>
          <div className="grupo-puntajes">
            <img className="icono-barra" src={iconUso} alt="USO Points" />
            <span id="coins">{coins}</span>
          </div>
        </div>
      </div>
      <div id="barra-secundaria">
        <VolumenControl />
      </div>
      
      
      <div id="area-gachapon">
        <img src={nubesGif} className="nubes nubes-izquierda" alt="Nubes pixel" />
        <div id="gachapon-container">
          <div id="gachapon">
            <img
              ref={gachaMachineRef}
              id="gacha-machine" 
              src={inserteMonedaGif} 
              alt="Gachapon" 
              className={isPlaying ? 'playing' : ''}/>
            <button 
              type= "button"
              onClick={handlePlay}
              disabled={isPlaying || coins <= 0}>
              {isPlaying ? '...' : ' ¡ Usar USO Coins !'}</button>
          </div>
        </div>
        <img src={nubesGif} className="nubes nubes-derecha" alt="Nubes pixel" />
      </div>

      {mostrarRecompensa && recompensaActual && ( 
        <RecompensaModal
          rarity={recompensaActual.rarity}
          points={recompensaActual.points}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Gachapon;

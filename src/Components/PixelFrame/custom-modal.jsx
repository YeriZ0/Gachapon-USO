import React, { useState, useMemo } from "react";
import { useUISounds, useAudioControls } from "../../hooks/useSound.js";
import PixelFrame from "./pixel-frame.jsx";
import "./custom-modal.css";

const RecompensaModal = React.memo(({rarity, points, onClose }) => {
  const [closing, setClosing] = useState(false);
  const { playButton } = useUISounds();
  const { stopCurrentReward } = useAudioControls();

  // animación de salida y avisa al padre al terminar
  const handleClose = () => {
    stopCurrentReward();
    playButton(); 
    setClosing(true);
    setTimeout(onClose, 300);
  };
  
  const recompensaData = useMemo(() => {
    switch (rarity) {
      case "Comun":
        return {
          encabezado: "Obtuviste un objeto común...",
          color1: "#52d5b2",
          color2: "#149580",
        };
      case "Epico":
        return {
          encabezado: "¡Obtuviste un objeto Épico, no se ve todos los días!",
          color1: "#ff91af",
          color2: "#a04b71"
        };
      case "Legendario":
        return {
          encabezado: "¡¡¡ Obtuviste un objeto Legendario, eres realmente afortunado !!!",
          color1: "#ffff9e",
          color2: "#3c3c18"
        };
      default:
        return {
          encabezado: "¡Error!",
          color1: "#ff0000",
          color2: "#800000"
        };
    }
  }, [rarity]);

  return (
    <div className={`recompensa-modal ${closing ? "salir" : "entrar"}`}>
      <PixelFrame>
        <div className="recompensa-contenido">
          <h2 style={{ 
            color: recompensaData.color1,
            textShadow: `2px 2px ${recompensaData.color2}`
          }}>
            {recompensaData.encabezado}
          </h2>
          <p>¡Has ganado {points} Daro Points!</p>
          <button type="button" onClick={handleClose}>Cerrar</button>
        </div>
      </PixelFrame>
    </div>
  );
});

export default RecompensaModal;

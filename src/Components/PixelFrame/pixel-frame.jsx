import React from "react";
import "./pixel-frame.css";

// Importación de imágenes
import esquinaAI from "../../assets/Esquinas/Arriba Izquierda.png";
import esquinaAD from "../../assets/Esquinas/Arriba Derecha.png";
import esquinaBI from "../../assets/Esquinas/Abajo Izquierda.png";
import esquinaBD from "../../assets/Esquinas/Abajo Derecha.png";

import bordeA from "../../assets/Bordes/Arriba.png";
import bordeB from "../../assets/Bordes/Abajo.png";
import bordeI from "../../assets/Bordes/Izquierda.png";
import bordeD from "../../assets/Bordes/Derecha.png";

import fondo from "../../assets/Relleno.png";

const PixelFrame = ({ children }) => {
  return (
        
        <div className="pixel-frame">
            <div className="esquina arriba-izquierda" style={{ backgroundImage: `url(${esquinaAI})` }} />
            <div className="borde arriba" style={{ backgroundImage: `url(${bordeA})` }} />
            <div className="esquina arriba-derecha" style={{ backgroundImage: `url(${esquinaAD})` }} />

            <div className="borde izquierda" style={{ backgroundImage: `url(${bordeI})` }} />
            <div className="centro" style={{ backgroundImage: `url(${fondo})` }}>
                {children}
            </div>
            <div className="borde derecha" style={{ backgroundImage: `url(${bordeD})` }} />

            <div className="esquina abajo-izquierda" style={{ backgroundImage: `url(${esquinaBI})` }} />
            <div className="borde abajo" style={{ backgroundImage: `url(${bordeB})` }} />
            <div className="esquina abajo-derecha" style={{ backgroundImage: `url(${esquinaBD})` }} />
        </div>
        
  );
};

export default PixelFrame;


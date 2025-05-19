import { useState, useEffect } from 'react';
import './pantalla-carga.css';
import notaMusical from '../../assets/Nota Musical.gif';

// Importa todas las imágenes directamente
import iconUsuario from "../../assets/Usuario.png";
import iconDaro from "../../assets/Daro Points.png";
import iconUso from "../../assets/USO Coins.png";
import nubesGif from "../../assets/Animacion/Nubes.gif";
import inserteMonedaGif from '../../assets/Animacion/Inserte Moneda.gif';
import monedaInGif from '../../assets/Animacion/Moneda In.gif';
import comunGif from '../../assets/Animacion/Comun.gif';
import epicoGif from '../../assets/Animacion/Epico.gif';
import legendarioGif from '../../assets/Animacion/Legendario.gif';
import esquinaAI from "../../assets/Esquinas/Arriba Izquierda.png";
import esquinaAD from "../../assets/Esquinas/Arriba Derecha.png";
import esquinaBI from "../../assets/Esquinas/Abajo Izquierda.png";
import esquinaBD from "../../assets/Esquinas/Abajo Derecha.png";
import bordeA from "../../assets/Bordes/Arriba.png";
import bordeB from "../../assets/Bordes/Abajo.png";
import bordeI from "../../assets/Bordes/Izquierda.png";
import bordeD from "../../assets/Bordes/Derecha.png";
import fondo from "../../assets/Relleno.png";

const PantallaCarga = ({ children }) => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [showReadyMessage, setShowReadyMessage] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Lista de todas las imágenes como strings de ruta
        const imageAssets = [
        iconUsuario,
        iconDaro,
        iconUso,
        nubesGif,
        inserteMonedaGif,
        monedaInGif,
        comunGif,
        epicoGif,
        legendarioGif,
        esquinaAI,
        esquinaAD,
        esquinaBI,
        esquinaBD,
        bordeA,
        bordeB,
        bordeI,
        bordeD,
        fondo,
        notaMusical
        ];

    const loadAssets = async () => {
      try {
        await Promise.all(imageAssets.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        }));

        setAssetsLoaded(true);
        // Espera 1.5s antes de mostrar "Todo listo"
        setTimeout(() => {
          setShowReadyMessage(true);
          // Espera 1.5s más antes de iniciar animación de salida
          setTimeout(() => {
            setIsExiting(true);
            // Espera que termine la animación (0.5s) antes de dejar de renderizar
            setTimeout(() => setShouldRender(false), 500);
          }, 2000);
        }, 2000);
      } catch (error) {
        console.error("Error loading assets:", error);
        // Fallback rápido si hay error
        setAssetsLoaded(true);
        setShowReadyMessage(true);
        setIsExiting(true);
        setTimeout(() => setShouldRender(false), 500);
      }
    };

    loadAssets();    
        
  }, []);

  if (!shouldRender) {
    return children;
  }

  return (
    <>
      <div className={`pantalla-carga ${isExiting ? 'salir' : 'entrar'}`}>
        <div className="pantalla-carga-contenido">
          <img src={notaMusical} alt="Cargando..." className="cargando-gif" />
          <p className={`cargando-texto ${showReadyMessage ? 'todo-listo' : ''}`}>
            {showReadyMessage ? "¡Todo listo, buena suerte!" : "Cargando..."}
          </p>
        </div>
      </div>
      
      {/* Renderiza los hijos detrás con opacidad controlada */}
      <div style={{ 
        opacity: isExiting ? 1 : 0,
        transition: 'opacity 1s ease',
        position: 'fixed',
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </>
  );
};

export default PantallaCarga;
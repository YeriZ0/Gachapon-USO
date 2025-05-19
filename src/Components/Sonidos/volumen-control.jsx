import { useState, useEffect } from 'react';
import { useUISounds } from "../../hooks/useSound.js"
import { useAudio } from "../../contexts/audio-context.jsx";
import iconVolumenOn from "../../assets/Volumen On.png";
import iconVolumenOff from "../../assets/Volumen Off.png";

const VolumeControl = () => {
  const audio = useAudio();
  const { playVolume } = useUISounds();
  const [isMuted, setIsMuted] = useState(audio.isMuted);

  useEffect(() => {
    const handleMuteChange = (muted) => {
      setIsMuted(muted);
    };

    audio.addListener(handleMuteChange);
    return () => {
      audio.removeListener(handleMuteChange);
    };
  }, [audio]);

  const handleVolumeClick = () => {
    audio.toggleMute();
    playVolume();
  }

  return (
    <img
      id="volumen-icon"
      className="icono-barra"
      src={isMuted ? iconVolumenOff : iconVolumenOn}
      alt="Volumen"
      onClick={handleVolumeClick}
    />
  );
};

export default VolumeControl;
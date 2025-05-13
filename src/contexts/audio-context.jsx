import { createContext, useContext, useMemo } from "react";
import AudioController from "../Components/Sonidos/controlador-audio.js";

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const audioController = useMemo(() => new AudioController(), []);

    return (
        <AudioContext.Provider value={audioController}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};

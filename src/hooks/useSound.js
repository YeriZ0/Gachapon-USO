import { useAudio } from "../contexts/audio-context.jsx";

export const useUISounds = () => {
    const audio = useAudio();

    return {
        playButton: () => audio.playSound('ui', 'button'),
        playCoin: () => audio.playSound('ui', 'coin'),
        playMenu: () => audio.playSound('ui', 'menu'),
        playVolume: () => audio.playSound('ui', 'volumeAlert')
    };
};

export const useRewardSounds = () => {
    const audio = useAudio();
    
    return {
        playCommon: () => {
            audio.playSound('rewards', 'comun');
        },
        playEpic: () => {
            audio.playSound('rewards', 'epico')
        },
        playLegendary: () => {
            audio.playSound('rewards', 'legendario')
        },
    };
};

export const useAudioControls = () => {
    const audio = useAudio();

    return {
        stopCurrentReward: () => audio.stopCurrentReward(),
        setVolume: (volume) => audio.setVolume(volume),
        toggleMute: () => audio.toggleMute(),
        playBGSound: () => audio.playBackgroundSound(),
        stopBGSound: () => audio.stopBackgroundSound()
    };
};
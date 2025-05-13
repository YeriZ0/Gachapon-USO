import { Howl } from "howler";

const soundConfig = {
      ui: {
        button: {
          src: "/Sonidos/button-2.mp3",
          volume: 0.3,
          delay: 0, 
          loop: false,
          startTime: 0
        }
        ,
        coin: {
          src: "/Sonidos/coin-insert.wav",
          volume: 0.3,
          delay: 650, 
          loop: false,
          startTime: 0
        }
        ,
        menu: {
            src: "/Sonidos/menu-loop.mp3",
            volume: 0.3,
            delay: 0,
            loop: true,
            startTime: 0
        }
      },
      rewards: {
        comun: [
          {
            src: "/Sonidos/explosion-ballon.wav",
            volume: 0.5,
            delay: 1800, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-ballon.wav",
            volume: 0.5,
            delay: 2250, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-4.wav",
            volume: 0.5,
            delay: 2950, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/score.mp3",
            volume: 0.6,
            delay: 3200, 
            loop: false,
            startTime: 0
          }
        ],
        epico: [
          {
            src: "/Sonidos/explosion-ballon.wav",
            volume: 0.5,
            delay: 1800, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-ballon.wav",
            volume: 0.5,
            delay: 2250, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-4.wav",
            volume: 0.9,
            delay: 2950, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/score.mp3",
            volume: 0.6,
            delay: 3600, 
            loop: false,
            startTime: 0
          }
        ],
        legendario: [
          {
            src: "/Sonidos/advertencia.mp3",
            volume: 0.3,
            delay: 0, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/fallagachapon.mp3",
            volume: 0.6,
            delay: 2900, 
            loop: false,
            startTime: 0,
            endTime: 3
          },
          {
            src: "/Sonidos/explosion-2.mp3",
            volume: 0.9,
            delay: 5500, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-4.wav",
            volume: 0.4,
            delay: 5700, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/meteorito-2.mp3",
            volume: 0.4,
            delay: 6000, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/explosion-3.mp3",
            volume: 0.7,
            delay: 9500, 
            loop: false,
            startTime: 0
          },
          {
            src: "/Sonidos/legendario-texto.mp3",
            volume: 0.9,
            delay: 10000, 
            loop: true,
            startTime: 0
          }
        ]
      }
};

class AudioController {
  constructor() {
    this.sounds = {};
    this.masterVolume = 1.0;
    this.isMuted = false;
    this.backgroundSound = null;
    this.scheduledTimeouts = {};
    this.activeSounds = {};
    this.initializeSounds();
    this.currentRewardType = null;
  }

  initializeSounds() {
    Object.entries(soundConfig).forEach(([category, sounds]) => {
      this.sounds[category] = {};
      Object.entries(sounds).forEach(([name, config]) => {
        if (Array.isArray(config)) {
          this.sounds[category][name] = config.map(cfg => this.createHowl(cfg));
        } else {
          this.sounds[category][name] = this.createHowl(config);
        }
      });
    });
  }
  
  createHowl(config) {
    const howl = new Howl({
      src: config.src,
      volume: config.volume * this.masterVolume,
      loop: config.loop || false,
      preload: true,
      onend: config.loop ? () => this.handleLoopEnd(howl, config) : undefined
    });
    
    // Almacenamos la configuración en el objeto howl para acceder luego
    howl._config = config;
    return howl;
  }

  playSound(category, name) {
    if (this.isMuted) return;

    if (category === 'rewards') {
      this.stopCurrentReward();
      this.currentRewardType = name;
    }

    const sounds = this.sounds[category]?.[name];
    if (!sounds) {
      console.error(`Sonido no encontrado: ${category}/${name}`);
      return;
    }

    // Limpieza de sonidos previos
    if (this.scheduledTimeouts[name]) {
      this.scheduledTimeouts[name].forEach(clearTimeout);
      delete this.scheduledTimeouts[name];
    }

    if (this.activeSounds[name]) {
      this.activeSounds[name].forEach(({sound, id}) => sound.stop(id));
      delete this.activeSounds[name];
    }

    if (Array.isArray(sounds)) {
      this.scheduledTimeouts[name] = [];
      this.activeSounds[name] = [];
      
      sounds.forEach((sound, index) => {
        const config = soundConfig[category][name][index];
        const timeoutId = setTimeout(() => {
          const soundId = sound.play();
          const startTime = config.startTime || 0;
          sound.seek(startTime, soundId);

          // Configurar el endTime si está definido
          if (config.endTime !== undefined) {
            const duration = config.endTime - startTime;
            setTimeout(() => {
              if (sound.playing(soundId)) {
                sound.stop(soundId);
              }
            }, duration * 1000);
          }

          // Manejo de loops y volumen
          if (config.loop) {
            sound.volume(0, soundId);
            sound.fade(0, config.volume * this.masterVolume, 1000, soundId);
          }

          this.activeSounds[name].push({ sound, id: soundId });
        }, config.delay);

        this.scheduledTimeouts[name].push(timeoutId);
      });
    } else {
      const config = soundConfig[category][name];
      const playWithDelay = () => {
        const soundId = sounds.play();
        const startTime = config.startTime || 0;
        sounds.seek(startTime, soundId);

        // Configurar el endTime si está definido
        if (config.endTime !== undefined) {
          const duration = config.endTime - startTime;
          setTimeout(() => {
            if (sounds.playing(soundId)) {
              sounds.stop(soundId);
            }
          }, duration * 1000);
        }

        // Manejo de loops y volumen
        if (config.loop) {
          sounds.volume(0, soundId);
          sounds.fade(0, config.volume * this.masterVolume, 500, soundId);
        }

        this.activeSounds[name] = [{ sound: sounds, id: soundId }];
      };

      if (config.delay > 0) {
        this.scheduledTimeouts[name] = [setTimeout(playWithDelay, config.delay)];
      } else {
        playWithDelay();
      }
    }
  }

  stopCurrentReward(fadeDuration = 500) {
    if (this.currentRewardType) {
      this.stopSound('rewards', this.currentRewardType, fadeDuration);
      this.currentRewardType = null;
    }
  }

  stopSound(category, name, fadeDuration = 0) {
    // Limpiar timeouts
    if (this.scheduledTimeouts[name]) {
      this.scheduledTimeouts[name].forEach(clearTimeout);
      delete this.scheduledTimeouts[name];
    }

    // Detener sonidos
    if (this.activeSounds[name]) {
      this.activeSounds[name].forEach(({sound, id}) => {
        if (sound.playing(id)) {
          if (fadeDuration > 0) {
            sound.fade(sound.volume(id), 0, fadeDuration, id);
            setTimeout(() => sound.stop(id), fadeDuration);
          } else {
            sound.stop(id);
          }
        }
      });
      delete this.activeSounds[name];
    }

    if (category === 'rewards' && name === this.currentRewardType) {
      this.currentRewardType = null;
    }
  }

  handleLoopEnd(howl, config) {
    if (!howl || !howl.loop()) return;
    
    const ids = howl.playing();
    if (ids.length === 0) return;
    
    const soundId = ids[0];
    
    howl.volume(0, soundId);
    howl.seek(config.startTime || 0, soundId);
    howl.fade(0, config.volume * this.masterVolume, 1000, soundId);
    
    // Programar fade out antes del final para cada ciclo
    const duration = howl.duration() * 1000 - 1000;
    if (duration > 0) {
      setTimeout(() => {
        if (howl.playing(soundId)) {
          howl.fade(howl.volume(soundId), 0, 1000, soundId);
        }
      }, duration);
    }
  }

  setVolume(volume) {
    this.masterVolume = volume;
    Howler.volume(volume);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    return this.isMuted;
  }

  playBackgroundSound() {
    this.backgroundSound = this.createHowl({
      src: ["/Sonidos/menu-loop.mp3"],
      volume: 0.3,
      loop: true
    });
    this.backgroundSound.play();
  }

  stopBackgroundSound(fadeDuration = 1000) {
    if (this.backgroundSound) {
      if (fadeDuration > 0) {
        this.backgroundSound.fade(this.backgroundSound.volume(), 0, fadeDuration);
        setTimeout(() => this.backgroundSound.stop(), fadeDuration);
      } else {
        this.backgroundSound.stop();
      }
      this.backgroundSound = null;
    }
  }
}

export default AudioController;

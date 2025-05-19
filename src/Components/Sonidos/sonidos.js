const soundConfig = {
      ui: {
        button: {
          src: "/Sonidos/button-2.mp3",
          volume: 0.3,
          delay: 0, 
          loop: false,
          startTime: 0
        },
        coin: {
          src: "/Sonidos/coin-insert.wav",
          volume: 0.3,
          delay: 650, 
          loop: false,
          startTime: 0
        },
        volumeAlert: {
          src: "/Sonidos/volume-alert.mp3",
          volume: 1.0,
          delay: 0, 
          loop: false,
          startTime: 0
        },
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

export default soundConfig;
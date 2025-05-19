import { useState, useEffect, useCallback } from 'react';

const GachaponAnimation = ({ onUpdateCoins, onUpdateScore, onAnimationChange, onFinishAnimation }) => {
  const [animationState, setAnimationState] = useState('idle');
  const [currentReward, setCurrentReward] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const rewards = [
    { rarity: "Comun", chance: 1, points: 10, duration: 5000 },
    { rarity: "Epico", chance: 1, points: 70, duration: 6000 },
    { rarity: "Legendario", chance: 100, points: 200, duration: 14000 }
  ];

  useEffect(() => {
    if (onAnimationChange) {
      onAnimationChange(animationState, currentReward);
    }
  }, [animationState, currentReward, onAnimationChange]);

  const play = useCallback((currentCoins) => {
    if (currentCoins <= 0 || isPlaying) {
      return false;
    }

    setIsPlaying(true);
    setAnimationState('inserting');
    onUpdateCoins(prev => prev - 1); // Restar moneda inmediatamente
    //Sonido de insertar moneda

    setTimeout(() => {
      setAnimationState('showing');
      const reward = determineReward();
      setCurrentReward(reward);
      
      setTimeout(() => {
        setAnimationState('idle');
        setIsPlaying(false);
        if (onFinishAnimation) {
          onFinishAnimation(reward);
        }
      }, reward.duration);
    }, 900);

    return true;
  }, [isPlaying, onUpdateCoins, onFinishAnimation]); //Dependencias

  const determineReward = useCallback(() => {
    const rand = Math.random() * 100;
    let accumulated = 0;
    
    for (let r of rewards) {
      accumulated += r.chance;
      if (rand <= accumulated) return r;
    }
    return rewards[0];
  }, [rewards]);

  return {
    animationState,
    currentReward,
    play,
    isPlaying
  };
};

export default GachaponAnimation;

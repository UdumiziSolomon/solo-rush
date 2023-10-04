import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useSoundState } from "modules/home/state/home-state";

type SoundProps = {
  file: any;
  infinite: boolean;
};

const PlaySound = ({ file, infinite }: SoundProps) => {
  const [isSound, setIsSound] = useState<Audio.Sound | null>(null);
  const useSound = useSoundState((state) => state.sound);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(file, {
        isLooping: infinite,
      });
      setIsSound(sound);
    };

    loadAudio();

    return () => {
      if (isSound) {
        isSound.unloadAsync();
      }
    };
  }, [file, infinite]);

  useEffect(() => {
    if (isSound) {
      if (useSound) {
        isSound.playAsync();
      } else {
        isSound.pauseAsync();
      }
    }
  }, [useSound, isSound]);

  return null;
};

export default PlaySound;

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type TSoundStore = {
  sound: boolean;
  updateSound: () => void;
};

export enum GameLevelEnum {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

type TLevelPointState = {
  Easy: number;
  Medium: number;
  Hard: number;
};

type TLevelPointStore = {
  state: TLevelPointState;
  updateLevelPoint: (level: GameLevelEnum, point: number) => void;
};

type TGameLevelStore = {
  currentLevel: string;
  currentLevelValue: number;
  updateLevel: (level: string, value: number) => void;
}

export const useSoundState = create<TSoundStore>()(
  persist(
    set => ({
      sound : false,
      updateSound: () => set(state => ({ sound: !state.sound }))
    }),
    { name: 'sound-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useGameLevelState = create<TGameLevelStore>()(
  persist(
    (set) => ({
      currentLevel: 'Easy',
      currentLevelValue: 3000,
      updateLevel: (level: string, value: number) => set({ currentLevel: level, currentLevelValue: value }),
    }),
    { name: 'game-level-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useLevelPointState = create<TLevelPointStore>()(
  persist(
    (set) => ({
      state: {
        Easy: 0,
        Medium: 0,
        Hard: 0,
      },
      updateLevelPoint: (level, point) => set((state) => ({
        ...state,
        state: {
          ...state.state,
          [level]: state.state[level] + point,
        },
      })),
    }),
    { name: 'level-points-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);
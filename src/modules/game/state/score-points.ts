import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TScoreStore = {
  value: number;
  updateScore: () => void;
  clearScore: () => void;
};

type TPointsStore = {
  value: number;
  updatePoints: (val: number) => void;
};

type TLevelStore = {
  value: number;
  updateLevel: () => void;
  clearLevel: () => void;
}

export const useScoreState = create<TScoreStore>()(set => ({
  value: 0,
  updateScore: () => set(state => ({ value: state.value + 1 })),
  clearScore: () => set({ value: 0 }),
}));

export const usePointsState = create<TPointsStore>()(
  persist(
    set => ({
      value: 0,
      updatePoints: val =>
        set(state => ({
          value: state.value + val,
        })),
    }),
    { name: "points-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);

// export const useLevelState = create<TLevelStore>()(set => ({
//   value: 0,
//   updateLevel: () => set(state => ({ value: state.value + 1 })),
//   clearLevel: () => set({ value: 0 }),
// }));

import { ReactNode } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { ms } from "react-native-size-matters";

type ListItemProps = {
  icon?: ReactNode;
  label?: string;
};

export const ListItems: ListItemProps[] = [
  {
    icon: (
      <MaterialCommunityIcons name="trophy-outline" size={ms(35)} color={"#adb4c4"} />
    ),
    label: "Best Scores",
  },
  {
    icon: (
      <Ionicons
        name="options"
        size={ms(35)}
        color={"#adb4c4"}
      />
    ),
    label: "Game Level",
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="location-exit"
        size={ms(35)}
        color={"#adb4c4"}
      />
    ),
    label: "Exit Game",
  },
];

import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../utilities/color";

function IconBtn({ iconName, iconColor = color.light1, size = 40, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
    </TouchableOpacity>
  );
}

export default IconBtn;

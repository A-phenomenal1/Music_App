import { Platform } from "react-native";

import color from "./color.js";

export default {
  text: {
    color: color.dark,
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "San Francisco",
  },
};

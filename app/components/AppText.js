import React from "react";
import { Text } from "react-native";

import TextStyle from "../utilities/TextStyle";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[TextStyle.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;

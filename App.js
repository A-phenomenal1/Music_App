import React, { useState } from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./app/screens/WelcomeScreen";

function App() {
  const [btnClick, setBtnClick] = useState(false);
  const handleApp = (isclick) => {
    isclick === "clicked" ? setBtnClick(true) : setBtnClick(false);
  };
  return (
    <NavigationContainer ref={navigationRef}>
      {btnClick ? <AppNavigator /> : <WelcomeScreen callback={handleApp} />}
    </NavigationContainer>
  );
}

export default App;

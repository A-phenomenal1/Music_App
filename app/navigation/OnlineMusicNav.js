import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnlineMusicScreen from "../screens/OnlineMusicScreen";

const Stack = createStackNavigator();

const OnlineMusicNav = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="OnlineMusic"
      component={OnlineMusicScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default OnlineMusicNav;

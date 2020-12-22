import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RandomMusicScreen from "../screens/RandomMusicScreen";

const Stack = createStackNavigator();

const RandomMusicNav = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Random Music"
      component={RandomMusicScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RandomMusicNav;

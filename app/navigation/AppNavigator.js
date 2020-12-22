import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListButton from "./NewListButton";
import MyMusicNav from "./MyMusicNav";
import RandomMusicNav from "./RandomMusicNav";
import OnlineMusicNav from "./OnlineMusicNav";
import color from "../utilities/color";
import PlayScreen from "../screens/PlayScreen";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyMusic"
      tabBarOptions={{
        activeTintColor: color.primary4,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="My Music"
        component={MyMusicNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="headphones"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Random Music"
        component={PlayScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListButton
              onPress={() => navigation.navigate("Random Music")}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="music-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Online Music"
        component={OnlineMusicNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

import React from "react";
import Gameboard from "./components/Gameboard";
import Home from "./components/Home";
import Leaderboard from "./components/Scoreboard";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const HOME = "Home";
const GAME = "Game";
const LEADERBOARD = "Leaderboard";

const icons = {
  [HOME]: "home",
  [GAME]: "dice-multiple",
  [LEADERBOARD]: "account-star"
}

function getOptions({route}) {
  return {
    tabBarIcon: () => <MaterialCommunityIcons name={icons[route.name]} size={30}/>,
    tabBarStyle: {backgroundColor: '#f2f2f2', height: 60, paddingBottom: 10},
    tabBarLabelStyle: {fontWeight: 'bold', fontSize: 15},
    tabBarActiveTintColor: 'skyblue',
    tabBarInactiveTintColor: 'black'

  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={getOptions}>
          <Tab.Screen name={HOME} component={Home} 
          options={{tabBarStyle: {display: "none"}}}/>
          <Tab.Screen name={GAME} component={Gameboard}/>
          <Tab.Screen name={LEADERBOARD} component={Leaderboard}/>
      </Tab.Navigator>
    </NavigationContainer>

  )

}
import React from "react";
import { View } from "react-native"
import { Text, Pressable, TextInput, Button } from "react-native";

import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./style/style"

import Gameboard from "./components/Gameboard";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native";

import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const HOME = "Home";
const GAME = "Game";
const LEADERBOARD = "Leaderboard";

const icons = {
  [HOME]: "home",
  [GAME]: "dice-multiple",
  [LEADERBOARD]: "account-settings"
}

function getOptions({route}) {
  return {
    tabBarIcon: () => <MaterialCommunityIcons name={icons[route.name]} size={30}/>,
    tabBarStyle: {backgroundColor: '#f2f2f2', height: 80, paddingBottom: 10},
    tabBarLabelStyle: {fontWeight: 'bold', fontSize: 15},
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'white'

  }
  
}


export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={getOptions}>
          <Tab.Screen name={HOME} component={Home}/>
          <Tab.Screen name={GAME} component={Gameboard}/>
          <Tab.Screen name={LEADERBOARD} component={Leaderboard}/>
      </Tab.Navigator>
    </NavigationContainer>
  )

}

// function Home({navigation}) {

// }
// const navigation = useNavigation(); 

// const HomeScreen = ({navigation}) => <Home />
// const GameScreen = ({navigation}) => <Gameboard />
// const LeaderboardScreen = ({navigation}) => <Leaderboard />
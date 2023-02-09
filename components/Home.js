import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable, TextInput, Button } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
import * as Constants from "../constants"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function Home({ navigation }){
    // const navigation = useNavigation();
// const navigation = useNavigation();
// console.log(navigation)
const [playerName, setplayerName] = useState()
const [loggedIn, setLoggedIn] = useState(false)
// const loggedIn = false

if (loggedIn){
    return(
        <View>
             <Text>
                Rules of the game
                </Text>
                <Text>
                    THE GAME: Upper section of the classic 
                    Yahtzee dice game. You have {Constants.NBR_OF_DICES} dices
                    and for the every dice you have {Constants.NBR_OF_THROWS} throws.
                    After each throw you can keep dices in order to get same dice spot counts as many
                    as possible. In the end of the turn you must select your points from {Constants.MIN_SPOT}
                    to {Constants.MAX_SPOT}. Game ends when all points have benn selected.
                    The order for selecting those is free.
                </Text>
                <Text>
                    POINTS: after each turn game calculates the sum for the dices you selected. Only
                    the dices having the same spot count are calculated. Inside the game you can not
                    select same points from {Constants.MIN_SPOT} to {Constants.MAX_SPOT} again.
                </Text>
                <Text>
                    GOAL: To get points as much as possible. {Constants.BONUS_POINTS_LIMIT} points is 
                    the limit of getting bonus which give you {Constants.BONUS_POINTS} points more.
                </Text>
                <Text>
                    Good luck, {playerName}!
                </Text>
                <Pressable onPress={() => navigation.navigate("Game", {pname: playerName})}>
                    <Text>Play</Text>
                </Pressable>
        </View>
    )
}
else {
    return(
        <View>
            <Text>For the scoreboard enter your name...</Text>
            <TextInput
            autoFocus={true}
            value={playerName} 
            onChangeText={(t) => setplayerName(t)}/>
            <Button title="Ok" onPress={() => setLoggedIn(true)}/>                
        </View>
    )
}


}
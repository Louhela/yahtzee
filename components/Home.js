import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable, TextInput, Button } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
// import * as Constants from "../constants"
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY} from "../constants"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./Header";
import Footer from "./Footer";

export default function Home({ navigation }){

    
const [playerName, setplayerName] = useState("")
const [loggedIn, setLoggedIn] = useState(false)

function handlePlayerName(){
    if (playerName.length > 0) {
        setLoggedIn(true)
    }
    else {
        console.log("ÄSH")
    }
}


if (loggedIn){
    return(
        <View>
             <Text>
                Rules of the game
                </Text>
                <Text>
                    THE GAME: Upper section of the classic 
                    Yahtzee dice game. You have {NBR_OF_DICES} dices
                    and for the every dice you have {NBR_OF_THROWS} throws.
                    After each throw you can keep dices in order to get same dice spot counts as many
                    as possible. In the end of the turn you must select your points from {MIN_SPOT}
                    to {MAX_SPOT}. Game ends when all points have benn selected.
                    The order for selecting those is free.
                </Text>
                <Text>
                    POINTS: after each turn game calculates the sum for the dices you selected. Only
                    the dices having the same spot count are calculated. Inside the game you can not
                    select same points from {MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text>
                    GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is 
                    the limit of getting bonus which give you {BONUS_POINTS} points more.
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
            <Header />
            <Text>For the scoreboard enter your name...</Text>
            <TextInput
            autoFocus={true}
            value={playerName} 
            onChangeText={(t) => setplayerName(t)}/>
            <Button title="Ok" onPress={() => handlePlayerName()}/>        
            <Footer />        
        </View>
    )
}


}
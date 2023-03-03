import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY} from "../constants"
import Header from "./Header";
import Footer from "./Footer";

export default function Home({ navigation }){

const [playerName, setplayerName] = useState("")
const [loggedIn, setLoggedIn] = useState(false)

function handlePlayerName(){
    if (playerName.length > 0) {
        setLoggedIn(true)
    }
}


if (loggedIn){
    return(
        <View style={styles.rules}>
             <Text style={styles.rulesBold}>Rules of the game</Text>
                
                <Text style={styles.rulesText}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS}
                    throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                    {'\n'}
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from
                    {MIN_SPOT} to {MAX_SPOT} again.
                    {'\n'}
                    GOAL: To get points as much as possible.
                    {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS}
                    points more.
            </Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Game", {pname: playerName})}>
                <Text style={styles.buttonText}>Play</Text>
            </Pressable>
        </View>
    )
}
else {
    return(
        <View style={styles.rules}>
            <Header />
            <MaterialCommunityIcons
            name={"account-edit"}
            size={50}
            color={"grey"}>
        </MaterialCommunityIcons>
            <Text >For the scoreboard enter your name...</Text>
            <TextInput
            autoFocus={true}
            value={playerName} 
            onChangeText={(t) => setplayerName(t)}/>
            <Pressable style={styles.button} onPress={() => handlePlayerName()}>   
                <Text style={styles.buttonText}>Enter name</Text>
            </Pressable>
            <Footer />        
        </View>
    )
}


}
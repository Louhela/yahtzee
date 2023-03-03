import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Constants from "../constants"


export default Scoreboard = ( {navigation} ) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        getScoreboardData()
        })
        return unsubscribe;
    }, [navigation]);


    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(Constants.SCOREBOARD_KEY);
            if(jsonValue !== null){
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
                // sort here
            }
        }
        catch(error){
            console.log("Read error: " + error.message)
        }
    }

    return (
    <View style={styles.gameboard}>
        <View>
            
            {scores.map((player, i) => (
                <Text key={i}>{i + 1}. {player.name} {player.date} {player.time} {player.points}</Text>
            ))}
            
        </View>
    </View>
    )

}
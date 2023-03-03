import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { DataTable } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SCOREBOARD_KEY} from "../constants"


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
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if(jsonValue !== null){
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
                setScores(tmpScores);
            }
        }
        catch(error){
            console.log("Read error: " + error.message)
        }
    }

    return (
    <View>
        <View>
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title >Time</DataTable.Title>
            <DataTable.Title >Points</DataTable.Title>
            </DataTable.Header>
            {scores.map((player, i) => (
                <DataTable.Row key={i}>
                <DataTable.Cell>{player.name}</DataTable.Cell>
                <DataTable.Cell>{player.date}</DataTable.Cell>
                <DataTable.Cell>{player.time}</DataTable.Cell>
                <DataTable.Cell>{player.points}</DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
        </View>
    </View>
    )

}
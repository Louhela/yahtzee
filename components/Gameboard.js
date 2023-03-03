import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
import * as Constants from "../constants"

// import { useNavigation } from '@react-navigation/native';


let board = [];

export default function Gameboard ({route}) {
    const [playerName, setPlayerName] = useState("")

    useEffect(() => {
      if (playerName === "" && route.params?.pname) {
        setPlayerName(route.params.pname)
      }

    }, [])
    
    // console.log(playerName)
    // console.log(route.params.pname)
    const [gameOver, setGameOver] = useState(false)
    const [allowFreeze, setAllowFreeze] = useState(true);

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(Constants.NBR_OF_THROWS);
    const [totalPoints, setTotalPoints] = useState(0)
    const [status, setStatus] = useState('');
    //"Frozen dices"
    const [selectedDices, setSelectedDices] = 
        useState(new Array(Constants.NBR_OF_DICES).fill(false))

    //Dice type that has already been selected
    const [selectedPoints, setSelectedPoints] = 
        useState(new Array(6).fill(false))

    // console.log(selectedPoints)

    //Points per selected dice type
    const [pointsPerdice, setPointsPerdice] = 
        useState(new Array(6).fill(0))

    // console.log(pointsPerdice)


    // Current dices on the table
    const [dicesOnTable, setDicesOnTable] = 
        useState(new Array(Constants.NBR_OF_DICES).fill(0))

function handleGameEnd() {
    setGameOver(false)
    setAllowFreeze(true)
    setNbrOfThrowsLeft(Constants.NBR_OF_THROWS)
    setTotalPoints(0)
    

    setStatus("Game restarted")

    setSelectedDices(new Array(Constants.NBR_OF_DICES).fill(false))

    setSelectedPoints(new Array(6).fill(false))
    setPointsPerdice(new Array(6).fill(0))
    setDicesOnTable(new Array(Constants.NBR_OF_DICES).fill(0))

    // checkBonusPoints()
    // setStatus("The game has ended")
    // console.log("GG")

}


function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
        return "orange";
    }
    else {
        return selectedDices[i] ? "black" : "steelblue";
    }
}

function getPointsColor(i) {
    // if (selectedPoints.every((val, i, arr) => val === arr[0]) && selectedPoints[0] == true) {
    //     console.log("Peli ohi");
    // }
    return selectedPoints[i] ? "black" : "steelblue";
    
}


const selectDice = (i) => {
    if (nbrOfThrowsLeft > 0 && allowFreeze == true){
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

}

const selectPoints = (i) => {
    let faceValue = i + 1
    // console.log(i)
    let pointSelection = [...selectedPoints];



    
    if (pointSelection[i] == false && nbrOfThrowsLeft == 0) {
        setStatus("Points set for " + faceValue)
        dicesRightNow = [...dicesOnTable]


        countOfSame = dicesRightNow.filter(x => x === faceValue).length

        // console.log(i)
        let pointsToAdd = [...pointsPerdice];
        pointsToAdd[i] = ( faceValue ) * countOfSame
        setPointsPerdice(pointsToAdd);
        // console.log("Pojot: ", totalPoints)
        setTotalPoints(totalPoints + faceValue * countOfSame)
        // console.log("Pojot jalkee: ", totalPoints)
    
        pointSelection[i] = true


        setSelectedPoints(pointSelection)


        setSelectedDices(new Array(Constants.NBR_OF_DICES).fill(false))
        
        setAllowFreeze(false)
        console.log(pointSelection)
        if (pointSelection.every((val, i, arr) => val === arr[0]) && pointSelection[0] == true) {
            
            // setGameOver(true)
            // handleGameEnd()
            setGameOver(true)
        }
        else{
            setNbrOfThrowsLeft(Constants.NBR_OF_THROWS);

        }

    } 
    else {
        setStatus("Throw 3 times before setting points");
    }
}

let dicesNow  = [...dicesOnTable]

const throwDices = () => {
    setAllowFreeze(true)
    if (nbrOfThrowsLeft > 0){
        setStatus("Select and rethrow");
        // console.log("loop?")
        for (let i = 0; i < Constants.NBR_OF_DICES; i++){
            if (!selectedDices[i]){
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                dicesNow[i] = randomNumber;
                
            } 
        }
            
    setDicesOnTable(dicesNow)
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);

    }
    else {
        setStatus("Select points before throwing")
    }
}

function checkBonusPoints() {
    let pojot = totalPoints
    console.log("Totaaliset pointsi:", pojot)
    console.log("Total points: ",totalPoints)
    if (totalPoints > Constants.BONUS_POINTS_LIMIT){
        setStatus("The game has ended, you were awarded " + Constants.BONUS_POINTS + " bonus points")
        setTotalPoints(totalPoints + Constants.BONUS_POINTS)
    }
    else {
        console.log("es")
        setStatus("The game has ended, you didn't get bonus points")

    }
}

useEffect(() => {
    checkBonusPoints()
    if (nbrOfThrowsLeft === Constants.NBR_OF_THROWS) {
        setStatus("Throw dices");
    }
    // if (nbrOfThrowsLeft < 0) {
    //     console.log("oon täsä :DDDDDDDDDDDDDDDDDDDD")
    //     setNbrOfThrowsLeft(Constants.NBR_OF_THROWS-1);
        
    // }
}, [gameOver]);


const row = [];

for (let i = 0; i < Constants.NBR_OF_DICES; i++){
    row.push(
        <Pressable
            key={"row" + i}
            onPress={() => selectDice(i)}>
            <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50}
            color={getDiceColor(i)}>
            </MaterialCommunityIcons>
        </Pressable>
    );
}

const pointSelector = [];
for (let i = 0; i < 6; i++){
    let spotCount = i+1
    pointSelector.push(
        <Pressable
            key={"pointButton" + i}
            onPress={() => selectPoints(i)}>
            <Text>{pointsPerdice[i]}</Text>
            <MaterialCommunityIcons
            name={"numeric-"+spotCount+"-circle"}
            key={"pointButtons" + i}
            size={50}
            color={getPointsColor(i)}>
            </MaterialCommunityIcons>
        </Pressable>
        
    );
}

return(
    <View style={styles.gameboard}>
        <View style={styles.flex}>{row}
        {/* <MaterialCommunityIcons
            name={"dice-multiple"}
            size={50}>
        </MaterialCommunityIcons> */}
        </View>

        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>

        <View style={styles.flex}>{pointSelector}</View>

        <Pressable style={styles.button}
            onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
        <Text>Total Points: {totalPoints}</Text>
        <Text>
            You are {Constants.BONUS_POINTS_LIMIT - totalPoints} points away from bonus!
        </Text>
        <Pressable style={styles.button}
            onPress={() => handleGameEnd()}>
                <Text style={styles.buttonText}>
                    Restart
                </Text>
            </Pressable>
    </View>
)

}
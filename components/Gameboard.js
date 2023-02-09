import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import styles from "../style/style";
import * as Constants from "../constants"

// import { useNavigation } from '@react-navigation/native';


let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;

const MIN_SPOT = 1;
const MAX_SPOT = 6;

const BONUS_POINTS_LIMIT = 63;
const BONUS_POINTS = 50;

export default function Gameboard ({route}) {
    console.log(route.params.pname)
    // const navigation = useNavigation();
    // console.log(route.params.pname)
    const [allowFreeze, setAllowFreeze] = useState(true);

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [totalPoints, setTotalPoints] = useState(0)
    const [status, setStatus] = useState('');
    //"Frozen dices"
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false))

    //Dice type that has already been selected
    const [selectedPoints, setSelectedPoints] = 
        useState(new Array(6).fill(false))

    // console.log(selectedPoints)

    //Points per selected dice type
    const [pointsPerdice, setPointsPerdice] = 
        useState(new Array(6).fill(0))

    // console.log(pointsPerdice)


    // Current dices on the table
    const [currentDices, setCurrentDices] = 
        useState(new Array(NBR_OF_DICES).fill(0))

    // console.log("+++++++", currentDices)

    // const [points1, setPoints1] = useState(0)
    // const [points2, setPoints2] = useState(0)
    // const [points3, setPoints3] = useState(0)
    // const [points4, setPoints4] = useState(0)
    // const [points5, setPoints5] = useState(0)
    // const [points6, setPoints6] = useState(0)
    
    // setPointsPerdice(2)



function getDiceColor(i) {
    // if (board.every((val, i, arr) => val === arr[0])) {
    //     return "orange";
    // }
    // else {
        return selectedDices[i] ? "black" : "steelblue";
    // }
}

function getPointsColor(i) {
    if (selectedPoints.every((val, i, arr) => val === arr[0]) && selectedPoints[0] == true) {
        console.log("Peli ohi");
    }
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

    console.log(i)
    let pointSelection = [...selectedPoints];

    // Setting points for specific dice type


    setStatus("Throw 3 times before setting points");
    if (pointSelection[i] == false && nbrOfThrowsLeft == 0) {
        
        console.log("okaspodaksopdkpoaskdo")
        dicesRightNow = [...currentDices]

        console.log("aaaaaaaaaaa" ,dicesRightNow)

        countOfSame = dicesRightNow.filter(x => x === faceValue).length
        // console.log("mmmmm", dicesRightNow.filter(x => x === i + 1).length)
    
        // console.log("asd",dicesRightNow)
        // console.log(dicesRightNow.count(i))
        console.log(i)
        let pointsss = [...pointsPerdice];
        pointsss[i] = ( faceValue ) * countOfSame
        setPointsPerdice(pointsss);
        setTotalPoints(totalPoints + faceValue * countOfSame)
        // checkBonusPoints()
        pointSelection[i] = true
        console.log("----", pointSelection)

        setSelectedPoints(pointSelection)


        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        // setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setAllowFreeze(false)
        setNbrOfThrowsLeft(NBR_OF_THROWS);
    
    } 
 
    // Sets the color of the button



    
}

let dicesNow  = [...currentDices]

const throwDices = () => {
    setAllowFreeze(true)
    if (nbrOfThrowsLeft > 0){
        setStatus("Select and rethrow");
        for (let i = 0; i < NBR_OF_DICES; i++){
            if (!selectedDices[i]){
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                dicesNow[i] = randomNumber;
                
            } 
        }
            
    setCurrentDices(dicesNow)
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }
    else {
        setStatus("Select points before throwing")
    }

}

// const checkWinner = () => {
//     if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0){
//         setStatus("You won");
//     }
//     else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0){
//         setStatus("You won, game over")
//         setSelectedDices(new Array(NBR_OF_DICES).fill(false));
//     }
//     else if (nbrOfThrowsLeft === 0) {
//         setStatus("Game over")
//         setSelectedDices(new Array(NBR_OF_DICES).fill(false));
//     }
//     else {
//         setStatus('Keep on throwing');
//     }
// }

// const checkBonusPoints = () => {
//     if (totalPoints > BONUS_POINTS_LIMIT){
//         console.log("bonari!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//         setTotalPoints(totalPoints + BONUS_POINTS)
//     }
//     else {
//         console.log("es")
//     }
// }

useEffect(() => {
    // checkBonusPoints()
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus("Throw dices");
    }
    if (nbrOfThrowsLeft < 0) {
        console.log("oon täsä :DDDDDDDDDDDDDDDDDDDD")
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        
    }
}, [nbrOfThrowsLeft]);


const row = [];
for (let i = 0; i < NBR_OF_DICES; i++){
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
        <View style={styles.flex}>{row}</View>

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
        <Text>You are {BONUS_POINTS_LIMIT - totalPoints} points away from bonus!</Text>
    </View>
)

}
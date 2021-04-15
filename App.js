import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [magic, setMagic] = useState(false);
  const [countMulti, setCountMulti] = useState(0);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const [numberToCall, setNumberToCall] = useState("Make your trick");

  const buttons = [
    "AC",
    7,
    4,
    1,
    0,
    "DEL",
    8,
    5,
    2,
    ".",
    "%",
    9,
    6,
    3,
    "√",
    "/",
    "*",
    "-",
    "+",
    "=",
  ];

  useEffect(() => {
    //Magic Trick
    if (currentNumber === "....") {
      setDarkMode(true);
      setMagic(true);
      setCurrentNumber("");
    }
    if (currentNumber === "%%%") {
      setDarkMode(false);
      setMagic(false);
      setCurrentNumber("");
      setCountMulti(0);
      setNumberToCall("");
    }
    if (currentNumber.includes(".%.")) {
      setNumberToCall(currentNumber.replace(".%.", ""));
      setCurrentNumber("");
    }
  }, [currentNumber]);

  function calculator() {
    const splitNumber = currentNumber.split(" ");
    const firstNumber = splitNumber[0];
    const lastNumber = splitNumber[2];
    const operator = splitNumber[1];

    switch (operator) {
      case "+":
        if (lastNumber.includes("%")) {
          const result =
            parseFloat(firstNumber) * (parseFloat(lastNumber) / 100);
          setCurrentNumber((parseFloat(firstNumber) + result).toString());
          return;
        }
        setCurrentNumber(
          (parseFloat(firstNumber) + parseFloat(lastNumber)).toString()
        );
        return;

      case "-":
        if (lastNumber.includes("%")) {
          const result =
            parseFloat(firstNumber) * (parseFloat(lastNumber) / 100);
          setCurrentNumber((parseFloat(firstNumber) - result).toString());
          return;
        }
        setCurrentNumber(
          (parseFloat(firstNumber) - parseFloat(lastNumber)).toString()
        );
        return;

      case "*":
        //Magic Trick
        if (magic === true) {
          setCountMulti(countMulti + 1);

          if (countMulti === 3) {
            setCurrentNumber(numberToCall);
            return;
          }

          setCurrentNumber(
            (parseFloat(firstNumber) * parseFloat(lastNumber)).toString()
          );
          return;
        }
        //Normal

        if (lastNumber.includes("%")) {
          const result =
            parseFloat(firstNumber) * (parseFloat(lastNumber) / 100);
          setCurrentNumber(result.toString());
          return;
        }
        setCurrentNumber(
          (parseFloat(firstNumber) * parseFloat(lastNumber)).toString()
        );
        return;

      case "/":
        if (lastNumber.includes("%")) {
          const result =
            parseFloat(firstNumber) * (parseFloat(lastNumber) / 100);
          setCurrentNumber((parseFloat(firstNumber) / result).toString());
          return;
        }
        setCurrentNumber(
          (parseFloat(firstNumber) / parseFloat(lastNumber)).toString()
        );
        return;
    }
  }

  function handleInput(buttonPressed) {
    if (buttonPressed === "√") {
    }
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }

    switch (buttonPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "AC":
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case "√":
        setLastNumber(currentNumber + " = ");
        setCurrentNumber(Math.sqrt(parseFloat(currentNumber)).toString());
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#fff",
      width: "100%",
      height: "30%",
      alignItems: "flex-start",
      justifyContent: "flex-end",
    },
    resultText: {
      color: darkMode ? "#f5f5f5" : "#282f3b",
      margin: 15,
      fontSize: 35,
      maxHeight: 100,
      textAlign: "right",
    },
    containerResult: {
      width: "100%",
      overflow: "hidden",
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      alignSelf: "flex-end",
      marginRight: 15,
    },
    themeButton: {
      position: "absolute",
      top: 25,
      left: 10,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      flex: 1,
      flexDirection: "column",
      flexWrap: "wrap",
    },
    button: {
      borderColor: darkMode ? "#282f3b" : "#e5e5e5",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      justifyContent: "center",
      minWidth: "25%",
      minHeight: "12%",
      flex: 1,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#303946",
      textAlign: "center",
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <View style={styles.containerResult}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === "=" ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: "#9DBC7B" }]}
              onPress={() => handleInput(button)}
            >
              <Text
                style={[styles.textButton, { color: "white", fontSize: 20 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === "number"
                      ? darkMode === true
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#415853"
                      : "#ededed",
                },
              ]}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
}

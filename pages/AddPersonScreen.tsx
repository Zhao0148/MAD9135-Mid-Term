// AddPersonScreen - add a new person object with a name, date of birth, and empty ideas array.

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { buttonStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import DatePicker from "react-native-modern-datepicker";

type Props = {
  navigation: any;
  route: any;
};

const AddPersonScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("Type here");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log(`selectedDate: ${selectedDate}`);
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.peopleContainer}>
          <Text style={textStyles.h2}>People List</Text>
          <Text style={textStyles.p}>{"Person Name"}</Text>
        </View>
        <View style={styles.peopleContainer}>
          <TextInput
            style={stylesInput.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          {/* <DatePicker
            onSelectedChange={(selectedDate) => {
              //do something with the string `selectedDate`
              //that comes from the datepicker
              console.log(selectedDate);
            }}
            options={{
              backgroundColor: "black",
              textHeaderColor: "white",
              textDefaultColor: "white",
              selectedTextColor: "red",
              mainColor: "red", //arrows
              textSecondaryColor: "#777", //dow
              borderColor: "blue",
            }}
            style={
              {

              }
            }
            current={"1990-01-01"}
            selected={"1990-01-15"}
            maximumDate={new Date().toDateString()}
            mode="calendar"
          ></DatePicker> */}
          <DatePicker onSelectedChange={(date) => setSelectedDate(date)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonScreen;
const stylesInput = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
  },
});

// AddPersonScreen - add a new person object with a name, date of birth, and empty ideas array.

import React, { useCallback, useEffect, useState } from "react";
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
import { randomUUID } from "expo-crypto";
type Props = {
  navigation: any;
  route: any;
};

const AddPersonScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, saveData, clearAllData ] = useMyData();

  const handleSavePerson = async () => {
    // await clearAllData("person");
    if (!text || !selectedDate) {
      return;
    }
    const newPerson = {
      id: randomUUID(),
      name: text,
      dob: selectedDate.replace(/\//g, "-"),
      ideas: [],
    };
    const currentPersons = data.person || [];
    const updatedPersons = [...currentPersons, newPerson];
    await saveData("person", updatedPersons);
    navigation.navigate("People");
  };

  useEffect(() => {
    console.log(`selectedDate: ${selectedDate.replace(/\//g, "-")}`);
  }, [setSelectedDate, selectedDate]);

  useEffect(() => {
    console.log(`text: ${text}`);
  }, [onChangeText, text]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={[styles.peopleContainer, { alignItems: "flex-start" }]}>
          <Text style={textStyles.h2}>Person</Text>
          <Text style={textStyles.p}>{"Person Name"}</Text>
        </View>
        <View style={styles.peopleContainer}>
          <TextInput
            style={stylesInput.input}
            onChangeText={onChangeText}
            value={text}
            autoFocus={true}
          />
        </View>
        <View style={styles.marginHorizontal}>
          <DatePicker
            onSelectedChange={(date) => setSelectedDate(date)}
            mode="calendar"
            onDateChange={(date) => setSelectedDate(date)}
          />
          <Text>Selected Date: {selectedDate.toString()}</Text>
        </View>

        <Pressable style={buttonStyles.button} onPress={handleSavePerson}>
          <Text style={buttonStyles.buttonText}>{"Save Person"}</Text>
        </Pressable>
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

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
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { buttonStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import DatePicker from "react-native-modern-datepicker";
import { randomUUID } from "expo-crypto";
import { modalStyles } from "../styles";
import ModalComponent from "../components/Modal";
type Props = {
  navigation: any;
  route: any;
};
const AddPersonScreen = ({ navigation }: Props) => {
  const [text, onChangeText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, saveData, clearAllData] = useMyData();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSavePerson = async () => {
    // await clearAllData("person");
    // await clearAllData("cameraSettings");
    if (!text || !selectedDate) {
      setModalVisible(true);
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

      <ModalComponent isModalVisible={isModalVisible} setModalVisible={setModalVisible} titleText="Missing Field" bodyText="Both the name and date of birth fields are required."/>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View
              style={[styles.paddingContainer, { alignItems: "flex-start" }]}
            >
              <Text style={textStyles.h2}>Person</Text>
              <Text style={textStyles.p}>{"Person Name"}</Text>
            </View>
            <View style={styles.paddingContainer}>
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

              <View style={stylesInput.sideBySide}>
                <Pressable
                  style={buttonStyles.button}
                  onPress={() => navigation.navigate("People")}
                >
                  <Text style={buttonStyles.buttonText}>{"Cancel"}</Text>
                </Pressable>
                <Pressable
                  style={buttonStyles.button}
                  onPress={handleSavePerson}
                >
                  <Text style={buttonStyles.buttonText}>{"Save Person"}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  sideBySide: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
  },
});

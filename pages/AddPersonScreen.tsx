// AddPersonScreen - add a new person object with a name, date of birth, and empty ideas array.

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { buttonStyles, styles, stylesInput, textStyles } from "../styles";
import { useMyData } from "../Providers";
import DatePicker from "react-native-modern-datepicker";
import { randomUUID } from "expo-crypto";
import ModalComponent from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";

const AddPersonScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [name, onChangeName] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { data, saveData, clearAllData } = useMyData();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSavePerson = async () => {
    // await clearAllData("person");
    // await clearAllData("cameraSettings");
    if (!name || !selectedDate) {
      setModalVisible(true);
      return;
    }
    const newPerson = {
      id: randomUUID(),
      name: name,
      dob: selectedDate.replace(/\//g, "-"),
      ideas: [],
    };
    const currentPersons = data.person || [];
    const updatedPersons = [...currentPersons, newPerson];
    await saveData("person", updatedPersons);
    navigation.navigate("People");
  };
  const originalConsoleError = console.error;

  console.error = (...args: any[]) => {
    if (/defaultProps/.test(args[0])) return;
    originalConsoleError(...args);
  };
  useEffect(() => {
    // console.log(`text: ${name}`);
  }, [onChangeName, name]);
  return (
    <SafeAreaView style={styles.container}>
      <ModalComponent
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        titleText="Missing Field"
        bodyText="Both the name and date of birth fields are required."
        onConfirm={() => setModalVisible(false)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.paddingContainer}>
            <View
              style={{ alignItems: "flex-start" }}
            >
              <Text style={[textStyles.h2,{marginBottom:20}]}>Add New Person</Text>
            </View>
            <View style={stylesInput.inputContainer}>
              <Text style={[textStyles.p,{marginBottom:20}]}>{"Person Name"}</Text>
              <TextInput
                style={stylesInput.input}
                onChangeText={onChangeName}
                value={name}
                autoFocus={true}
                placeholder="Enter name"
                placeholderTextColor="#999"
              />
            </View>
            <View style={stylesInput.inputContainer}>
              <Text style={textStyles.p}>Date of Birth</Text>
              <DatePicker
                onSelectedChange={(date) => setSelectedDate(date)}
                mode="calendar"
                onDateChange={(date) => setSelectedDate(date)}
                // style={{ width: "100%" }}
              />
            </View>


            <View style={buttonStyles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[buttonStyles.button, buttonStyles.cancelButton]}
              >
                <Text
                  style={[
                    buttonStyles.buttonText,
                    buttonStyles.cancelButtonText,
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePerson}
                style={[buttonStyles.button, buttonStyles.saveButton]}
              >
                <Text
                  style={[buttonStyles.buttonText, buttonStyles.saveButtonText]}
                >
                  Save Person
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPersonScreen;



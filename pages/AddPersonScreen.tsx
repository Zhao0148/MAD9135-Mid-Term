// AddPersonScreen - add a new person object with a name, date of birth, and empty ideas array.

import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { buttonStyles } from "../styles";
import { useMyData } from "../Providers";
import HeaderRightButton from "../components/headerRightButton";
import HeaderLeftButton from "../components/headerLeftButton";

type Props = {
  navigation: any;
  route: any;
};

const AddPersonScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {/* <HeaderBackButton /> */}
      {/* <HeaderLeftButton navigation={navigation} screen={"PeopleScreen"} buttonName={"People"}/> */}
      <View>
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("Root")}
        >
          <Text style={buttonStyles.buttonText}>{"Save"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonScreen;

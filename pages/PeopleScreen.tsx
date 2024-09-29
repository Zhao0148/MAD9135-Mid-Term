import React, { useContext, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { buttonStyles, headerStyles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import HeaderRightButton from "../components/headerRightButton";

type Props = {
  navigation: any;
  route: any;
};

const PeopleScreen = ({ navigation }: Props) => {
  const {} = useMyData();



  return (
    <SafeAreaView style={textStyles.textContainer}>
      <HeaderRightButton navigation={navigation} screen={"AddPersonScreen"} buttonName={"Add Person"}/>
      <View>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View>
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("IdeaScreen")}
        >
          <Text style={buttonStyles.buttonText}>{"Idea Page"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

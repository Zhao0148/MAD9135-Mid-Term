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

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button
  //         onPress={() => navigation.navigate("AddPerson")}
  //         title="Add"
  //         color="#007AFF"
  //       />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={textStyles.textContainer}>
      {/* {navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("AddPersonScreen")}
            style={headerStyles.headerRightButton}
          >
            <Text style={headerStyles.headerText}>Add Person</Text>
          </Pressable>
        ),
      })} */}
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

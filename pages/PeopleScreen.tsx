import React from "react";
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
      {/* <HeaderRightButton navigation={navigation} screen={"Add Person"} buttonName={"Add Person"}/> */}
      {/* {navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("Add Person")}>
            <Text>{"Add Person"}</Text>
          </Pressable>
        ),
      })} */}
      <View>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View>
        <Pressable
          // style={buttonStyles.button}
          onPress={() => navigation.navigate("Ideas")}
        >
          <Text style={buttonStyles.buttonText}>{"Idea Page"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

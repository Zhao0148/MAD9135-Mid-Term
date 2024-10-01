import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../styles";
import { Lightbulb } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "../App";

type Props = {
  people: {
    name: string;
    dob: string;
    id: string;
  };
};
const PeopleRenderComponent = ({ people }: Props) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { name, dob, id } = people;
  console.log("PeopleRenderComponent", people);
  return (
    <View style={styles.personItem}>
      <View style={styles.textContainer}>
        <Text style={textStyles.h4}>{name}</Text>
        <Text style={textStyles.customPersonParagraph}>{dob}</Text>
      </View>
      <View style={styles.iconContainer}>
      <Pressable onPress={() => navigation.navigate('Ideas', { id })}>
              <Lightbulb size={40} color="#000" />
            </Pressable>
      </View>
    </View>
  );
};
export default PeopleRenderComponent;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  personItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 24,
    // borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  iconContainer: {
    maxWidth: 300,
    justifyContent: "center",
  },
});

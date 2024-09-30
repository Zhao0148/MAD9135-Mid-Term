import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { textStyles } from "../styles";
import { Lightbulb } from "lucide-react-native";
type Props = {
  people: {
    name: string;
    dob: string;
  };
};

const PeopleRenderComponent = ({ people }: Props) => {
  const { name, dob } = people;
  return (
    <View style={styles.personItem}>
      <View style={styles.textContainer}>
        <Text style={textStyles.h4}>{name}</Text>
        <Text style={textStyles.customPersonParagraph}>{dob}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Lightbulb style={styles.iconContainer} size={40} color={"#000"} />
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
  iconContainer:{
    maxWidth: 300,
    justifyContent: "center"
  }
});

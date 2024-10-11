import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { ideaListStyles, PhotoModalStyles, textStyles } from "../styles";
import { GiftIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { useMyData } from "../Providers";
import { RootStackNavigationProp } from "../App";

type Props = {
  people: {
    name: string;
    dob: any;
    id: string;
  };
};
const PeopleRenderComponent = ({ people }: Props) => {
  const { clearAllData } = useMyData();
  try {
    // clearAllData("person");
    const navigation = useNavigation<RootStackNavigationProp>();
    const { name, dob, id } = people;
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    const dateObject = new Date(dob);
    const formattedDob = new Intl.DateTimeFormat("en-CA", options).format(
      dateObject
    );

    return (
      <View style={ideaListStyles.card}>
        <View>
          <Text style={textStyles.h4}>{name}</Text>
          <Text style={textStyles.customPersonParagraph}>{formattedDob}</Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            PhotoModalStyles.closeButton,
            { top: 23, backgroundColor: "rgba(0, 0, 0, 0.9)" },
          ]}
        >
          <Pressable onPress={() => navigation.navigate("Ideas", { id })}>
            <GiftIcon size={40} color="#ffdf3d" />
          </Pressable>
        </View>
      </View>
    );
  } catch (error) {
    console.error(error);
  }
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
    borderBottomWidth: 5,
    borderBottomColor: "#222",
    backgroundColor: "#dedede",
  },
  iconContainer: {
    maxWidth: 300,
    justifyContent: "center",
  },
});

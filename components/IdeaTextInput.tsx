import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { headerStyles, styles, textStyles } from "../styles";


type Props = {};

const IdeaTextInput = (props: Props) => {
    const [giftIdea, setGiftIdea] = React.useState("");

  return (
    <View>
      <TextInput
        style={{ height: 40 }}
        onChangeText={(text) => setGiftIdea(text)}
        placeholder="Gift Idea"
      />
    </View>
  );
};

export default IdeaTextInput;

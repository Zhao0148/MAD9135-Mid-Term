import React from "react";
import { Pressable, Text } from "react-native";
import { headerStyles } from "../styles";

type Props = {
  navigation: any;
  screen: string;
    buttonName?: string;
};

const HeaderRightButton = ({ navigation ,screen, buttonName}: Props) => {
  return (
    <Text>
      {navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate(screen)}
            style={headerStyles.headerRightButton}
          >
            <Text style={headerStyles.headerText}>{buttonName}</Text>
          </Pressable>
        ),
      })}
    </Text>
  );
};

export default HeaderRightButton;

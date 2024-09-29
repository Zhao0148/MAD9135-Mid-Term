import React from "react";
import { Pressable, Text } from "react-native";
import { headerStyles } from "../styles";

type Props = {
  navigation: any;
  screen: string;
  buttonName?: string;
};

const HeaderLeftButton = ({ navigation, screen, buttonName }: Props) => {
  return (
    <Text>
      {navigation.setOptions({
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.navigate(screen)}
            // style={headerStyles.headerLeftButton}
          >
            <Text style={headerStyles.headerText}>{buttonName}</Text>
          </Pressable>
        ),
      })}
    </Text>
  );
};

export default HeaderLeftButton;

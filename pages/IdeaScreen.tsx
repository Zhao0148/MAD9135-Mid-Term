// IdeaScreen - list the name and image for each idea belonging to a selected person.

import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { buttonStyles } from "../styles";
import { useMyData } from "../Providers";
import { RouteParams } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "../App";
import { styles } from "../styles";
type IdeasScreenRouteProp = RouteProp<StackParamList, "Ideas">;

type Props = {
  navigation: any;
  route: any;
};

const IdeaScreen = ({ navigation }: Props) => {
  const route = useRoute<IdeasScreenRouteProp>();
  const { id } = route.params;
  console.log(`IdeaScreen id: ${id}`);

  const [data, setData] = useMyData();
  
  
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View>
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("AddIdea")}
        >
          <View>
            <Text style={buttonStyles.buttonText}>{id}</Text>

          </View>
          {/* <Text style={buttonStyles.buttonText}>{"Delete Idea"}</Text> */}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

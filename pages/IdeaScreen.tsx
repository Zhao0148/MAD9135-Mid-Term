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
  TouchableOpacity,
} from "react-native";
import { buttonStyles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import { RouteParams } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "../App";
import { styles } from "../styles";
import ListItemIdeas from "../components/ListItem";
import { IdeaArrayObject, Person } from "../types";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
type IdeasScreenRouteProp = RouteProp<StackParamList, "Ideas">;

type Props = {
  navigation: any;
  route: any;
};

const IdeaScreen = ({ navigation }: Props) => {
  const [data, saveData] = useMyData();
  const route = useRoute<IdeasScreenRouteProp>();
  const { id } = route.params;
  // navigation.setParams({
  //   id,
  // });

  const person = data?.person ?? [];
  const getPersonNameById: Person = person.find(
    (person: Person) => person.id === id
  );
  // const personIdeas = getPersonNameById?.ideas ?? [];
  console.log(
    `getPersonNameById`,
    JSON.stringify(getPersonNameById.ideas, null, 2)
  );
  // console.log(`IdeaScreen id: ${id}`);
  // let person = data?.person ?? [];
  // if (data) {
  //   console.log("personIdeas", person);
  //   data.person = data.person.filter((person) => person.id === id);
  //   // console.log("data.personInIdea", data.person);
  // }
  console.log("data?.people", data?.person);
  const renderIdeas = ({ item }: { item: IdeaArrayObject }) => (
    <ListItemIdeas ideas={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.paddingContainer, { alignItems: "flex-start" }]}>
        <Text
          style={textStyles.h2}
        >{`Ideas for ${getPersonNameById?.name}`}</Text>
      </View>
      <View style={styles.paddingContainer}>
        {getPersonNameById?.ideas?.length !== 0 ? (
          <Text>{`${getPersonNameById.ideas.length}`}</Text>
        ) : (
          <Text>{`There are currently no ideas for ${getPersonNameById?.name}`}</Text>
        )}
      </View>
      <View>
        <View>
          <FlatList
            data={getPersonNameById.ideas}
            renderItem={renderIdeas}
            keyExtractor={(item) => item.giftId}
            style={{ maxHeight: 525 }}
          />

          {/* <Text style={buttonStyles.buttonText}>{""}</Text> */}
        </View>
        {/* <Text style={buttonStyles.buttonText}>{"Delete Idea"}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

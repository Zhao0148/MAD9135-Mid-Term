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
import { buttonStyles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import { RouteParams } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamList } from "../App";
import { styles } from "../styles";
import ListItemIdeas from "../components/ListItem";
import { Person } from "../types";
type IdeasScreenRouteProp = RouteProp<StackParamList, "Ideas">;

type Props = {
  navigation: any;
  route: any;
};

const IdeaScreen = ({ navigation }: Props) => {
  const route = useRoute<IdeasScreenRouteProp>();
  const { id } = route.params;
  const [data, setData] = useMyData();
  const person = data?.person ?? [];
  const getPersonNameById: Person = person.find((person: Person) => person.id === id);
  console.log(`getPersonNameById`, getPersonNameById.name);
  // console.log(`IdeaScreen id: ${id}`);
  // let person = data?.person ?? [];
  // if (data) {
  //   console.log("personIdeas", person);
  //   data.person = data.person.filter((person) => person.id === id);
  //   // console.log("data.personInIdea", data.person);
  // }
  console.log("data?.people", data?.person);
  // const renderIdeas = ({ item }: { item: Person }) => (
  //   <ListItemIdeas people={item} />
  // );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.peopleContainer, { alignItems: "flex-start" }]}>
        <Text
          style={textStyles.h2}
        >{`Ideas for ${getPersonNameById?.name}`}</Text>
      </View>
      <View style={styles.peopleContainer}>
        {getPersonNameById?.ideas?.length !== 0 ? (
          <Text>{`${getPersonNameById.ideas}`}</Text>
        ) : (
          <Text>{`There are currently no ideas for ${getPersonNameById?.name}`}</Text>
        )}
      </View>
      <View>
        <View>
          {/* <FlatList 
            data={data.person}
            renderItem={renderIdeas}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 525 }}
          /> */}

          {/* <Text style={buttonStyles.buttonText}>{""}</Text> */}
        </View>
        {/* <Text style={buttonStyles.buttonText}>{"Delete Idea"}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

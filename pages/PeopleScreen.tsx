import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { buttonStyles, headerStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import PeopleRenderComponent from "../components/PeopleRenderComponent";

type Props = {
  navigation: any;
  route: any;
};
type Person = {
  id: string;
  name: string;
  dob: any;
  ideas: String[];
};
const PeopleScreen = ({ navigation }: Props) => {
  const [data, setData] = useMyData();
  const [refreshing, setRefreshing] = useState(false);
  const person = data.person;
  
  // const sortedPeople = person.sort((a, b) => {
  //   if (a.dob.getMonth() > b.dob.getMonth()) {
  //     return 1;
  //   } else if (a.dob.getMonth() < b.dob.getMonth()) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // });
  const renderPerson = ({ item }: { item: Person }) => (
    <PeopleRenderComponent people={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.peopleContainer, { alignItems: "flex-start" }]}>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View style={styles.peopleContainer}>
        <FlatList
          data={person}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 525 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;


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
import { Person } from "../types";
type Props = {
  navigation: any;
  route: any;
};

const PeopleScreen = ({ navigation }: Props) => {
  const [data, setData] = useMyData();
  const [refreshing, setRefreshing] = useState(false);
  let person = data?.person ?? [];
  if (data) {
    data.person = person;
    // console.log("data.person", data.person);
    const sortedPeople = person.sort((a: Person, b: Person) => {
      const firstDate = new Date(a.dob).getTime();
      const secondDate = new Date(b.dob).getTime();
      //UNIX time
      return firstDate - secondDate;
    });

    console.log(`Sorted people`, sortedPeople);
  }
  const renderPerson = ({ item }: { item: Person }) => (
    <PeopleRenderComponent people={item} />
  );
  console.log("data.personPeopleScreen", data.person);
  console.log(`personLength`, person.length);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.peopleContainer, { alignItems: "flex-start" }]}>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View style={styles.peopleContainer}>
        {data?.person?.length !== 0 ? (
          <FlatList
            data={person}
            renderItem={renderPerson}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 525 }}
          />
        ) : (
          <Text style={textStyles.p}>
            No people added yet, add a person now!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

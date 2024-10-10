import React, { useCallback, useEffect, useState } from "react";
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
import { buttonStyles, headerStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import PeopleRenderComponent from "../components/PeopleRenderComponent";
import { Person } from "../types";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
type Props = {
  navigation: any;
  route: any;
};

const PeopleScreen = ({ navigation }: Props) => {
  const [data, saveData, removePerson] = useMyData();
  const [refreshing, setRefreshing] = useState(false);
  let person = data?.person ?? [];
  if (data) {
    data.person = person;
    const sortedPeople = person.sort((a: Person, b: Person) => {
      const firstDate = new Date(a.dob).getTime();
      const secondDate = new Date(b.dob).getTime();
      //UNIX time
      return firstDate - secondDate;
    });
  }
  const renderPerson = ({ item }: { item: Person }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
    <PeopleRenderComponent people={item} />
    </Swipeable>
  );
  const deleteItem = (id: string) => {
    console.log(`data.person..`, data.person.filter((item: Person) => item.id == id));
    removePerson(id);
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity onPress={() => deleteItem(id)}>
      <Text style={textStyles.p}>Delete</Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.paddingContainer, { alignItems: "flex-start" }]}>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View style={styles.paddingContainer}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView>
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
          </SafeAreaView>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

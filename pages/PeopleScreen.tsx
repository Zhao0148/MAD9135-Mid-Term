import React, { useCallback, useState } from "react";
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
  const {} = useMyData();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    setTimeout(() => setRefreshing(false), 2000);
  }, []);
  const renderPerson = ({ item }: { item: Person }) => (
    <PeopleRenderComponent people={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={textStyles.h2}>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View style={styles.peopleContainer}>
        <FlatList
          data={mapPeopleArrayAndStringTheDate}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <Pressable
          // style={buttonStyles.button}
          onPress={() => navigation.navigate("Ideas")}
        >
          <Text style={buttonStyles.buttonText}>{"Idea Page"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

const people = [
  {
    id: "d825796c-4fc1-4879-ad86-048ece61358b",
    name: "Mr Man",
    dob: new Date("1983-07-22"),
    ideas: [],
  },
  {
    id: "a1c3e4f6-2e3b-4e67-bb5d-f2dbf9c9e10d",
    name: "Alice Smith",
    dob: new Date("1990-01-15"),
    ideas: [],
  },
  {
    id: "b3e5a45b-6d76-4d58-9d4c-4efab6eae3e7",
    name: "Bob Johnson",
    dob: new Date("1985-05-30"),
    ideas: [],
  },
  {
    id: "c58b207f-2e87-41f2-b7c1-e94a1b5dce4f",
    name: "Charlie Brown",
    dob: new Date("1978-11-12"),
    ideas: [],
  },
  {
    id: "d46d2cf1-0b38-42f3-8921-79b45c2f7fd5",
    name: "Dana White",
    dob: new Date("1992-09-05"),
    ideas: [],
  },
  {
    id: "e27d3b0c-0a68-4f1a-bf5d-71a1956a4c93",
    name: "Evelyn Green",
    dob: new Date("1988-03-18"),
    ideas: [],
  },
  {
    id: "f8c78f84-b3e3-4761-b9b2-ea181a1d94b4",
    name: "Frank Knight",
    dob: new Date("1981-12-09"),
    ideas: [],
  },
  {
    id: "g5f9c789-21e0-4b7a-bd29-b227f23f95fc",
    name: "Grace Lee",
    dob: new Date("1995-04-27"),
    ideas: [],
  },
  {
    id: "h43e6ac0-f7b0-48b7-89a5-bb1c5c52cfee",
    name: "Henry Adams",
    dob: new Date("1975-10-30"),
    ideas: [],
  },
];

const sortedPeople = people.sort((a, b) => {
  if (a.dob.getMonth() > b.dob.getMonth()) {
    return 1;
  } else if (a.dob.getMonth() < b.dob.getMonth()) {
    return -1;
  } else {
    return 0;
  }
});
const mapPeopleArrayAndStringTheDate = sortedPeople.map((person) => {
  return {
    ...person,
    dob: person.dob.toDateString(),
  };
})

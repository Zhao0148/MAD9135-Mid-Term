import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import PeopleRenderComponent from "../components/PeopleRenderComponent";
import { Person } from "../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import ModalComponent from "../components/Modal";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Trash, Trash2 } from "lucide-react-native";
// import { StackParamList } from "../App";

type PeopleScreenRouteProp = RouteProp<RootStackParamList, "People">;
const PeopleScreen = () => {
  const { data, saveData, removePerson } = useMyData();
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const route = useRoute<PeopleScreenRouteProp>();
  const id = route?.params?.id;
  console.log(`PeopleScreen route: ${JSON.stringify(route)}`);

  let person = data?.person ?? [];

  if (data) {
    person = [...person].sort((a: Person, b: Person) => {
      const firstDate = new Date(a.dob).getTime();
      const secondDate = new Date(b.dob).getTime();
      // UNIX time
      return firstDate - secondDate;
    });
  }

  const RightAction = (id: string) => {
    return () => (
      <View style={[styles2.rightAction, {borderRadius:8,marginLeft:10}]}>
        <TouchableOpacity onPress={() => deleteConfirmation(id)}>
          <View  style={{gap:10, alignContent:'center'}}>
            <Trash2 size={40} color="#FFF"  />
            <Text style={styles2.actionText}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPerson = ({ item }: { item: Person }) => (
    <View style={{ marginVertical: 10 }}>
      <ReanimatedSwipeable
        renderRightActions={RightAction(item.id)}
        friction={3}
        rightThreshold={50}
      >
        <PeopleRenderComponent people={item} />
      </ReanimatedSwipeable>
    </View>
  );

  const deleteConfirmation = (id: string) => {
    setSelectedPersonId(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedPersonId) {
      removePerson(selectedPersonId);
      setSelectedPersonId(null);
      setModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setSelectedPersonId(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isModalVisible && selectedPersonId && (
        <ModalComponent
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          titleText="Delete Confirmation"
          bodyText="Are you sure you want to delete this person?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <View style={[styles.paddingContainer, { alignItems: "flex-start" }]}>
        <Text style={textStyles.h2}>People List</Text>
      </View>
      <View style={styles.paddingContainer}>
        {/* <GestureHandlerRootView style={styles.container}> */}
        {/* <SafeAreaView> */}
        {person.length ? (
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
        {/* </SafeAreaView> */}
        {/* </GestureHandlerRootView> */}
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles2 = StyleSheet.create({
  rightAction: {
    width: 80,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "600",
  },
});

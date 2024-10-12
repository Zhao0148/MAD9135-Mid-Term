import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { textStyles, styles } from "../styles";
import { useMyData } from "../Providers";
import { useRoute } from "@react-navigation/native";
import ListItemIdeas from "../components/ListItem";
import { IdeaArrayObject, Person } from "../types";
import { IdeasScreenRouteProp } from "../App";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Trash2 } from "lucide-react-native";
import ModalComponent from "../components/Modal";
const IdeaScreen = () => {
  const route = useRoute<IdeasScreenRouteProp>();
  const { data, removeGift } = useMyData();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const id = route?.params?.id;
  const person = data?.person ?? [];
  const getPersonNameById: Person | undefined = person.find(
    (person: Person) => person.id === id
  );

  const RightAction = (id: string | null) => {
    return () => (
      <View
        style={[
          {
            width: 80,
            height: "100%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          },
          { borderRadius: 8, marginLeft: 10 },
        ]}
      >
        <TouchableOpacity onPress={() => deleteConfirmation(id)}>
          <View style={{ gap: 10, alignContent: "center" }}>
            <Trash2 size={40} color="#FFF" />
            <Text
              style={{
                color: "white",
                fontWeight: "600",
              }}
            >
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderIdeas = ({ item }: { item: IdeaArrayObject }) => (
    <View style={styles.paddingContainer}>
      <ReanimatedSwipeable
        renderRightActions={RightAction(item.giftId)}
        friction={3}
        rightThreshold={50}
      >
        <ListItemIdeas ideas={item} />
      </ReanimatedSwipeable>
    </View>
  );
  const deleteConfirmation = (id: string | null) => {
    setSelectedGiftId(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedGiftId) {
      removeGift(getPersonNameById?.id, selectedGiftId);
      setSelectedGiftId(null);
      setModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setSelectedGiftId(null);
    setModalVisible(false);
  };
  return (
    <View style={[styles.container]}>
      {isModalVisible && selectedGiftId && (
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
        <Text
          style={textStyles.h2}
        >{`Ideas for ${getPersonNameById?.name}`}</Text>
      </View>
      <View style={styles.paddingContainer}>
        {getPersonNameById?.ideas?.length === 0 && (
          <Text>{`You haven't added any gift ideas for ${getPersonNameById?.name} yet.`}</Text>
        )}
      </View>
      <FlatList
        data={getPersonNameById?.ideas ?? []}
        renderItem={renderIdeas}
        keyExtractor={(item) => item.giftId}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default IdeaScreen;

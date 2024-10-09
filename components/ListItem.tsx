import React from "react";
import { Person } from "../types";
import { Text, View } from "react-native";
import { useMyData } from "../Providers";
import { Image } from "expo-image";

// type Props = {
//   peopleIdeas: Person;
// };
type Props = {
  people: {
    name: string;
    dob: any;
    id: string;
    ideas: string[];
  };
};
const ListItemIdeas = ({ people }: Props) => {
  const [data, saveData, clearAllData] = useMyData();
//   const mapThroughData = data.person.map((person) => {

  const { name, dob, id,ideas } = people;
console.log(`name!`, name);
  return (
    <View>
    <Image source={{ uri: ideas[0].image.uri }} style={{ width: 200, height: 200 }} />
      <Text>{ideas[0].giftDescription}</Text>
     </View>
  );
};

export default ListItemIdeas;

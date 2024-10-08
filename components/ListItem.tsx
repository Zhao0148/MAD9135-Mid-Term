import React from "react";
import { Person } from "../types";
import { Text, View } from "react-native";
import { useMyData } from "../Providers";

// type Props = {
//   peopleIdeas: Person;
// };
type Props = {
  people: {
    name: string;
    dob: any;
    id: string;
  };
};
const ListItemIdeas = ({ people }: Props) => {
  const [data, saveData, clearAllData] = useMyData();
//   const mapThroughData = data.person.map((person) => {

  const { name, dob, id } = people;
console.log(`name!`, name);
  return (
    // <View>
      <Text>{name}</Text>
    // </View>
  );
};

export default ListItemIdeas;

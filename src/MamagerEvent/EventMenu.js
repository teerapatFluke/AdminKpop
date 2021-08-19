import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Style from "../Style";
const EventMenu = ({ navigation }) => {
  const MenuCard = ({ name }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(name)}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center", flex: 1 }}>
              <Text style={Style.text_300}>{name}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <AntDesign name="right" size={20}></AntDesign>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <MenuCard name="จัดการข้อมูลอีเว้นท์"></MenuCard>
      <MenuCard name="จัดการข้อมูลช่องทางการซื้อบัตร"></MenuCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "92%",
    height: 72,
    alignSelf: "center",
    marginTop: 7,
    marginBottom: 7,
  },
});
export default EventMenu;

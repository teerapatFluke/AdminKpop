import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Searchbar, Card, FAB } from "react-native-paper";
import Style from "../Style";

const EventList = ({ navigation }) => {
  const EventCard = () => {
    return (
      <Card style={styles.event}>
        <Card.Content style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1 }}>
            <Text style={Style.text_400}>วันที่ </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={Style.text_status}>คอน</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="ค้นหาอีเว้นท์"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={{ fontFamily: "Kanit_400Regular" }}
        style={{ marginBottom: 7 }}
      />
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("รายละเอียดอีเว้นท์")}
        >
          <EventCard></EventCard>
        </TouchableOpacity>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        size={100}
        onPress={() => navigation.navigate("เพิ่มข้อมูลอีเว้นท์")}
        theme={{ colors: { accent: "#90CAF9" } }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  event: {
    backgroundColor: "#FFF",
    marginTop: 7,
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
    height: 99,
    justifyContent: "center",
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default EventList;

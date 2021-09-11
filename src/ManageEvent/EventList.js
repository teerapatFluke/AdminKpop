import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Searchbar,
  Card,
  FAB,
  Provider,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Style from "../Style";
import { EvAPI } from "./EventAPI";

const EventList = ({ navigation }) => {
  const [event, setEvent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const showDialog = ({ event_name, event_id }) => {
    setVisible(true);
    setSelectedName(event_name);
    var result = event.find((obj) => {
      return obj.id === event_id;
    });

    setSelectedEvent(result);

    // setAsSelectID(asid.toString());
  };

  const hideDialog = () => setVisible(false);

  const deleteEv = () => {
    console.log("delete");
  };

  const editEv = () => {
    navigation.navigate("แก้ไขข้อมูลอีเว้นท์", {
      selectedEvent: selectedEvent,
    });
    hideDialog();
  };

  const fetchdata = () => {
    EvAPI.getEvent()
      .then((resp) => resp.json())
      .then((resp) => setEvent(resp))
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetchdata();
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );
  const EventCard = ({ event_name, event_id, complete }) => {
    return (
      <TouchableOpacity onPress={() => showDialog({ event_name, event_id })}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <Text style={Style.text_400}>{event_name} </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              {complete ? (
                <Text style={Style.text_status_finish}>
                  สถานะข้อมูล : ครบแล้ว
                </Text>
              ) : (
                <Text style={Style.text_status_unfinish}>
                  สถานะข้อมูล : ยังไม่ครบ
                </Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Provider style={{ flex: 1 }}>
      
      <Searchbar
        placeholder="ค้นหาอีเว้นท์"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={{ fontFamily: "Kanit_400Regular" }}
        style={{ marginBottom: 7 }}
      />
      <FlatList
        data={event}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <EventCard
              event_name={item.event_name}
              event_id={item.id}
              complete={item.complete}
            ></EventCard>
          </ScrollView>
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        size={100}
        onPress={() => navigation.navigate("เพิ่มข้อมูลอีเว้นท์")}
        theme={{ colors: { accent: "#90CAF9" } }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_400}>จัดการข้อมูลอีเว้นท์</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>{selectedName}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button style={{ flex: 1 }} onPress={editEv}>
              <Text style={Style.text_400}> แก้ไขข้อมูล</Text>
            </Button>
            <Button style={{ flex: 1 }} onPress={deleteEv}>
              <Text style={Style.text_400}> ลบข้อมูล</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
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
    height: 120,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 7,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default EventList;

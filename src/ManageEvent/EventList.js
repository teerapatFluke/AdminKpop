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
  const [id, setId] = useState(0);
  const showDialog = ({ event_name, event_id }) => {
    setVisible(true);
    setSelectedName(event_name);
    var result = event.find((obj) => {
      return obj.id === event_id;
    });

    setSelectedEvent(result);
    setId(event_id);

    // setAsSelectID(asid.toString());
  };
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => {
    setVisible2(true);
  };

  const hideDialog2 = () => setVisible2(false);
  const [visible3, setVisible3] = useState(false);
  const showDialog3 = () => {
    setVisible3(true);
  };

  const hideDialog3 = () => setVisible3(false);

  const hideDialog = () => setVisible(false);

  const deleteEv = () => {
    EvAPI.deleteEvent(id)
      .then((res) => res.text()) // or res.json()
      .then(() => refresh())
      .then(() => {
        showDialog2();
      })
      .catch((error) => {
        console.error(error);
      });
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
  const refresh = () => {
    fetchdata();
  };
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
        theme={{ colors: { accent: "#2c2c2c" } }}
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
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={editEv}
            >
              <Text style={[Style.text_300, { color: "white" }]}>
                แก้ไขข้อมูล
              </Text>
            </Button>
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                showDialog3();
                hideDialog();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ลบข้อมูล</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visible2} onDismiss={hideDialog2}>
          <Dialog.Title>
            <Text style={Style.text_300}>ผลการดำเนินการ</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>ลบข้อมูลสำเร็จ</Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={hideDialog2}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visible3} onDismiss={hideDialog3}>
          <Dialog.Title>
            <Text style={Style.text_300}>ยืนยันการลบข้อมูล</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>
              คุณต้องการลบข้อมูลศิลปิน {selectedName} ใช่ไหม ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                hideDialog3();
                deleteEv();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>

            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={hideDialog3}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
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

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Style from "../Style";
import {
  Searchbar,
  Card,
  Avatar,
  Paragraph,
  Dialog,
  Portal,
  Button,
  Provider,
  FAB,
  TextInput,
} from "react-native-paper";
import { EvAPI } from "./EventAPI";
import { useFocusEffect } from "@react-navigation/native";
const EventTicket = () => {
  const [ticket, setticket] = useState(null);
  const [visibleadd, setVisibleadd] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [isUpdate, setisUpdate] = useState(false);
  const showDialogadd = () => {
    setVisibleadd(true);
    setname("");
  };

  const hideDialogadd = () => setVisibleadd(false);
  const showDialogedit = (name, id) => {
    setVisibleedit(true);
    setname(name);
    setid(id);
  };

  const hideDialogedit = () => setVisibleedit(false);
  const fetchdata = () => {
    EvAPI.getTicket()
      .then((resp) => resp.json())
      .then((resp) => setticket(resp))
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

  useEffect(() => {
    if (isUpdate) {
      fetchdata();
    }
    return () => {
      setisUpdate(false);
    };
  }, [isUpdate]);

  const addTicket = () => {
    EvAPI.addTicket({ name })
      .then((resp) => resp.json())
      .then(() => setisUpdate(true))
      .then(() => setVisibleadd(false))
      .catch((error) => {
        console.error(error);
      });
  };

  const editTicket = () => {
    EvAPI.editTicket({ name }, id)
      .then((resp) => resp.json())
      .then(() => setVisibleedit(false))
      .then(() => setisUpdate(true))
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTicket = () => {
    EvAPI.deleteTicket(id)
      .then((res) => res.text()) // or res.json()
      .then(() => setisUpdate(true))
      .then(() => setVisibleedit(false))
      .catch((error) => {
        console.error(error);
      });
  };
  const MenuCard = ({ name, id }) => {
    return (
      <TouchableOpacity onPress={() => showDialogedit(name, id)}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center", flex: 1 }}>
              <Text style={Style.text_300}>{name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <FlatList
        data={ticket}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <MenuCard name={item.name} id={item.id.toString()}></MenuCard>
          </ScrollView>
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        size={100}
        onPress={() => showDialogadd()}
        theme={{ colors: { accent: "#90CAF9" } }}
      />
      <Dialog visible={visibleadd} onDismiss={hideDialogadd}>
        <Dialog.Title>
          <Text style={Style.text_400}>ช่องทางการซื้อบัตร</Text>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput value={name} onChangeText={(text) => setname(text)} />
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button style={{ flex: 1 }} onPress={addTicket}>
            <Text style={Style.text_300}> เพิ่มข้อมูล</Text>
          </Button>
          <Button style={{ flex: 1 }} onPress={() => console.log("as")}>
            <Text style={Style.text_300}> ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={visibleedit} onDismiss={hideDialogedit}>
        <Dialog.Title>
          <Text style={Style.text_400}>ช่องทางการซื้อบัตร</Text>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput value={name} onChangeText={(text) => setname(text)} />
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button style={{ flex: 1 }} onPress={editTicket}>
            <Text style={Style.text_300}> แก้ไขข้อมูล</Text>
          </Button>
          <Button style={{ flex: 1 }} onPress={deleteTicket}>
            <Text style={Style.text_300}> ลบข้อมูล</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Provider>
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default EventTicket;

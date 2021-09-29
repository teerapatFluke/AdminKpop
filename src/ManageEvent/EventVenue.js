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

const EventVenue = () => {
  const [venue, setvenue] = useState(null);
  const [visibleadd, setVisibleadd] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [isUpdate, setisUpdate] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [mapname, setMapname] = useState("");
  const [mapurl, setMapurl] = useState("");
  let apikey = "AIzaSyCAXUwhuh-byreLAy1POMQAcLAiNWEaHvM";

  const showDialogadd = () => {
    setVisibleadd(true);
    setname("");
  };

  const hideDialogadd = () => setVisibleadd(false);
  const showDialogedit = (name, id, map, url) => {
    setVisibleedit(true);
    setname(name);
    setMapname(map);
    setMapurl(url);
    setid(id);
  };

  const hideDialogedit = () => setVisibleedit(false);

  const fetchdata = () => {
    EvAPI.getVenue()
      .then((resp) => resp.json())
      .then((resp) => setvenue(resp))
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

  const addVenue = () => {
    EvAPI.addVenue({ name, mapname, mapurl })
      .then((resp) => resp.json())
      .then(() => setisUpdate(true))
      .then(() => setVisibleadd(false))
      .catch((error) => {
        console.error(error);
      });
  };

  const editVenue = () => {
    EvAPI.editVenue({ name, mapname, mapurl }, id)
      .then((resp) => resp.json())
      .then(() => setVisibleedit(false))
      .then(() => setisUpdate(true))
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteVenue = () => {
    EvAPI.deleteVenue(id)
      .then((res) => res.text()) // or res.json()
      .then(() => setisUpdate(true))
      .then(() => setVisibleedit(false))
      .catch((error) => {
        console.error(error);
      });
  };
  const MenuCard = ({ name, id, map, url }) => {
    return (
      <TouchableOpacity onPress={() => showDialogedit(name, id, map, url)}>
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
  const [showSearch, setshowSearch] = useState(false);
  const onChangeA = (text) => {
    setMapname(text);
    setshowSearch(true);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apikey}&input=${text}&language=th&components=country:th`;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((resp) => setPrediction(resp.predictions));
  };
  const placeSelected = (id, description) => {
    console.log(id);
    console.log(description);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${apikey}&language=th&fields=url`;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((resp) => setMapurl(resp.result.url));

    setMapname(description);
    setshowSearch(false);
  };
  return (
    <Provider>
      <FlatList
        data={venue}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <MenuCard
              name={item.name}
              id={item.id.toString()}
              map={item.mapname}
              url={item.mapurl}
            ></MenuCard>
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
          <Text style={Style.text_400}>สถานที่จัด</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ชื่อสถานที่จัด</Text>
          </View>
          <View style={{ marginBottom: 7 }}>
            <TextInput
              style={{ height: 40 }}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>Google Map</Text>
          </View>
          <View style={{ marginBottom: 7 }}>
            <TextInput
              style={{ height: 40 }}
              value={mapname}
              onChangeText={(text) => onChangeA(text)}
            />
          </View>
          {prediction && showSearch ? (
            <ScrollView>
              {prediction.map((item) => (
                <TouchableOpacity
                  onPress={() => placeSelected(item.place_id, item.description)}
                >
                  <View
                    style={{
                      marginLeft: 5,
                      borderBottomWidth: 1,
                      marginHorizontal: 15,
                    }}
                  >
                    <Text key={item.place_idasd}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : null}
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button style={{ flex: 1 }} onPress={addVenue}>
            <Text style={Style.text_300}> เพิ่มข้อมูล</Text>
          </Button>
          <Button style={{ flex: 1 }} onPress={hideDialogadd}>
            <Text style={Style.text_300}> ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={visibleedit} onDismiss={hideDialogedit}>
        <Dialog.Title>
          <Text style={Style.text_400}>ช่องทางการซื้อบัตร</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ชื่อสถานที่จัด</Text>
          </View>
          <View style={{ marginBottom: 7 }}>
            <TextInput
              style={{ height: 40 }}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>Google Map</Text>
          </View>
          <View style={{ marginBottom: 7 }}>
            <TextInput
              style={{ height: 40 }}
              value={mapname}
              onChangeText={(text) => onChangeA(text)}
            />
          </View>
          {prediction && showSearch ? (
            <ScrollView>
              {prediction.map((item) => (
                <TouchableOpacity
                  onPress={() => placeSelected(item.place_id, item.description)}
                >
                  <View
                    style={{
                      marginLeft: 5,
                      borderBottomWidth: 1,
                      marginHorizontal: 15,
                    }}
                  >
                    <Text key={item.id}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : null}
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button style={{ flex: 1 }} onPress={editVenue}>
            <Text style={Style.text_300}> แก้ไขข้อมูล</Text>
          </Button>
          <Button style={{ flex: 1 }} onPress={deleteVenue}>
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
export default EventVenue;

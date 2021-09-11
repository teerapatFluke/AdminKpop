import React, { useState, useEffect } from "react";
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
  Avatar,
  Paragraph,
  Dialog,
  Portal,
  Button,
  Provider,
  FAB,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { AsAPI } from "./Artist-api";
const ArtistMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [asSelect, setAsSelect] = useState("");
  const [asid, setAsSelectID] = useState("");
  const isFocused = useIsFocused();
  const showDialog = ({ artistname, asid }) => {
    setVisible(true);
    setAsSelect(artistname);
    setAsSelectID(asid.toString());
  };

  const hideDialog = () => setVisible(false);
  const [artist, setArtist] = useState(null);

  const edit = () => {
    navigation.navigate("แก้ไขข้อมูลศิลปิน", {
      id: asid,
    });
    hideDialog();
    setArtist(null);
  };

  const deleteAS = () => {
    AsAPI.deleteArtist(asid)
      .then((res) => res.text()) // or res.json()
      .then(refresh())
      .catch((error) => {
        console.error(error);
      });
    hideDialog();
  };
  const refresh = () => {
    AsAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    AsAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  const ArtistAvatar = ({ uri }) => {
    return (
      <Avatar.Image
        style={{
          marginRight: 15,
          backgroundColor: "none",
        }}
        size={60}
        source={{
          uri: uri,
        }}
      />
    );
  };
  const ArtsitCard = ({ artistname, uri, asid }) => {
    return (
      <TouchableOpacity onPress={() => showDialog({ artistname, asid })}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar uri={uri}></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>{artistname}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <Provider>
      <FlatList
        data={artist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <ArtsitCard
              artistname={item.artist_name_EN}
              uri={item.artist_picture}
              asid={item.id}
            ></ArtsitCard>
          </ScrollView>
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        size={100}
        onPress={() => navigation.navigate("เพิ่มข้อมูลศิลปิน")}
        theme={{ colors: { accent: "#90CAF9" } }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={styles.artist_name}>จัดการข้อมูลศิลปิน</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>{asSelect}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button style={{ flex: 1 }} onPress={edit}>
              <Text style={styles.artist_name}> แก้ไขข้อมูล</Text>
            </Button>
            <Button style={{ flex: 1 }} onPress={deleteAS}>
              <Text style={styles.artist_name}> ลบข้อมูล</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",
    marginBottom: 7,
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
    height: 77,
    alignSelf: "center",
    marginTop: 7,
  },
  artist_name: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default ArtistMenu;

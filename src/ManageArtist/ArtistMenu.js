import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

const ArtistMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [as, setas] = useState("");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const ArtistAvatar = () => {
    return (
      <Avatar.Image
        style={{
          marginRight: 15,
          backgroundColor: "none",
        }}
        size={60}
        source={require("../../a.jpg")}
      />
    );
  };
  const ArtsitCard = () => {
    return (
      <TouchableOpacity onPress={showDialog}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <ArtistAvatar></ArtistAvatar>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.artist_name}>Artist</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <Provider>
      <ScrollView>
        <ArtsitCard></ArtsitCard>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        size={100}
        onPress={() => navigation.navigate("เพิ่มข้อมูลศิลปิน")}
        theme={{ colors: { accent: "#90CAF9" } }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button style={{ flex: 1 }} onPress={() => setas("Pressed")}>
              Cancel
            </Button>
            <Button style={{ flex: 1 }} onPress={() => console.log({ as })}>
              Ok
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

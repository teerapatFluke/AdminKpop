import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import Style from "../Style";

const Request = ({ navigation }) => {
  const RequestCard = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("รายละเอียดคำขอ")}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={Style.text_400}>Artist</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={Style.text_400}>Artist</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <RequestCard></RequestCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",
    marginBottom: 7,
    borderRadius: 20,

    width: "92%",
    height: 60,
    alignSelf: "center",
    marginTop: 7,
    borderColor: "#000",
    borderWidth: 1,
  },
});

export default Request;

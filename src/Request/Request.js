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
import jwt_decode from "jwt-decode";

const Request = ({ navigation }) => {
  var decoded = jwt_decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  console.log(decoded);
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

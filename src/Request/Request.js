import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Card, Button, Provider, Divider } from "react-native-paper";
import Style from "../Style";
import jwt_decode from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "./RequestAPI";
const Request = ({ navigation }) => {
  const [event, setEvent] = useState(null);
  const [isEvent, setIsEvent] = useState(false);
  const [eventList, setEventList] = useState([]);
  const fetachdata = () => {
    API.getEventComplete()
      .then((resp) => resp.json())
      .then((resp) => setEvent(resp))
      .catch((error) => {
        console.error(error);
      })
      .then(() => setIsEvent(true));
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetachdata();
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const RequestCard = ({ name, date }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("รายละเอียดคำขอ")}>
        <Card style={styles.request}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={Style.text_400}>{name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={Style.text_400}>{date}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  const RequestCard2 = ({ name, date }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("รายละเอียดคำขอ")}>
        <Card style={styles.request}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text style={Style.text_200}>{name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={Style.text_200}>{date}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 7, marginTop: 7 }}>
            <Text style={Style.text_400}>รายการร้องขอ</Text>
          </View>
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <RequestCard
              name="ขอให้เพิ่มศิลปิน Davichi"
              date="18/09/21"
            ></RequestCard>
            <RequestCard2
              name="ขอให้เพิ่มอีเว้นท์ IU"
              date="18/09/21"
            ></RequestCard2>
          </ScrollView>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  request: {
    backgroundColor: "#fff",
    marginBottom: 7,
    borderRadius: 20,
    height: 60,
    marginTop: 7,

    marginHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  request2: {
    backgroundColor: "#fff",
    marginBottom: 7,
    borderRadius: 20,
    height: 60,
    marginTop: 7,

    marginHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Request;

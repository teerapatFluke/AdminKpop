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
import { API } from "../Request/RequestAPI";

const Home = ({ navigation }) => {
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

  const RequestCard = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("รายละเอียดคำขอ")}>
        <Card style={styles.request}>
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

  const EventCard = ({ event_name, selectedEvent, date_lastupdate }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TabEvents", {
            selectedEvent: selectedEvent,
            initial: false,
            screen: "แก้ไขข้อมูลอีเว้นท์",
            params: {
              selectedEvent: selectedEvent,
              screen: "จัดการข้อมูลอีเว้นท์",
            },
          })
        }
      >
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1 }}>
              <Text style={Style.text_400}>{event_name} </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={Style.text_status_finish}>
                วันที่เพิ่มข้อมูลล่าสุด : {date_lastupdate}
              </Text>
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
            <Text style={Style.text_400}>อีเว้นท์ที่ข้อมูลไม่ครบถ้วน</Text>
          </View>

          {event ? (
            <FlatList
              data={event}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ScrollView
                  style={{
                    flex: 1,
                  }}
                >
                  <EventCard
                    event_name={item.event_name}
                    selectedEvent={item}
                    date_lastupdate={item.date_lastupdate}
                  ></EventCard>
                </ScrollView>
              )}
            />
          ) : (
            console.log("null")
          )}
        </View>

        <Divider style={{ borderWidth: 0.2, marginHorizontal: 7 }}></Divider>
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
});

export default Home;
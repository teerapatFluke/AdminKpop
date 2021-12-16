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
import { useFocusEffect } from "@react-navigation/native";
import { API } from "./ReportAPI";
import moment from "moment";
import "moment/locale/th";
const Report = ({ navigation }) => {
  const [problem, setProblem] = useState(null);
  const [id, setID] = useState(0);
  const fetachdata = () => {
    API.getReport()
      .then((resp) => resp.json())
      .then((resp) => setProblem(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetachdata();
        setID(0);
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted && id !== 0) {
      API.reportRead(id)
        .then((resp) => resp.json())
        .then(() =>
          navigation.navigate("รายละเอียดปัญหา", {
            id: id,
          })
        )
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {
      isMounted = false;
      setID(0);
    };
  }, [id]);
  const ReportCard = ({ name, date, id, read }) => {
    return (
      <View>
        {read == 0 ? (
          <TouchableOpacity onPress={() => setID(id)}>
            <Card style={[styles.request, { backgroundColor: "#E5E5E5" }]}>
              <Card.Content style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 2.3, justifyContent: "center" }}>
                  <Text style={Style.text_400}>{name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Text style={Style.text_400}>
                    {moment(date).format("ll")}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("รายละเอียดปัญหา", {
                id: id,
              })
            }
          >
            <Card style={styles.request}>
              <Card.Content style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 2.3, justifyContent: "center" }}>
                  <Text style={Style.text_400}>{name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Text style={Style.text_400}>
                    {moment(date).format("ll")}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Provider>
      {problem ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 14, marginTop: 7 }}>
              <Text style={Style.text_400}>รายการร้องขอเรียนปัญหา</Text>
            </View>
            <ScrollView
              style={{
                flex: 1,
              }}
            >
              {problem.map((item) => (
                <ReportCard
                  id={item.id}
                  key={item.id}
                  name={item.problem_head}
                  date={item.problem_date}
                  read={item.problem_read}
                ></ReportCard>
              ))}
            </ScrollView>
          </View>
        </View>
      ) : null}
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
});

export default Report;

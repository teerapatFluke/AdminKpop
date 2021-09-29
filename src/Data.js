import React, { useState } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import IconBadge from "react-native-icon-badge";
import { useIsFocused } from "@react-navigation/native";

export function Aumber() {
  const [state, setRequest] = useState(0);
  fetch("http://192.168.1.4:80/api/request/?request_read=0", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => setRequest(Object.keys(resp).length))
    .catch((error) => {
      console.error(error);
    });

  return (
    <View>
      {state ? (
        <IconBadge
          MainElement={<Entypo name="list" size={30} />}
          BadgeElement={<Text>{state}</Text>}
          IconBadgeStyle={{
            position: "absolute",
            top: -5,
            right: -9,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF0000",
          }}
          //Hidden={this.state.BadgeCount == 0}
        />
      ) : (
        <IconBadge
          MainElement={<Entypo name="list" size={30} />}
          BadgeElement={<Text>{state}</Text>}
          IconBadgeStyle={{
            position: "absolute",
            top: -5,
            right: -9,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF0000",
          }}
          Hidden={true}
        />
      )}
    </View>
  );
}

const Data = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Data;

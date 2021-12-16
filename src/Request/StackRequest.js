import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Request from "./Request";
import RequestDetail from "./RequestDetail";
import EventEdit from "../ManageEvent/EventEdit";
import EventList from "../ManageEvent/EventMenu";
const Stack = createStackNavigator();
const StackRequest = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Kanit_400Regular",
          fontSize: 24,
          color: "white",
        },
        cardStyle: { backgroundColor: "#fff" },
        headerStyle: {
          backgroundColor: "#2c2c2c",
        },
        headerBackTitleStyle: { fontFamily: "Kanit_400Regular" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="รายการร้องขอ" component={Request} />
      <Stack.Screen
        name="รายละเอียดคำขอ"
        component={RequestDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackRequest;

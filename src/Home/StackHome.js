import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import EventEdit from "../ManageEvent/EventEdit";
import EventList from "../ManageEvent/EventMenu";
const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Kanit_400Regular",
          fontSize: 24,
        },
        cardStyle: { backgroundColor: "#fff" },
        headerStyle: {
          backgroundColor: "#90CAF9",
        },
        headerBackTitleStyle: { fontFamily: "Kanit_400Regular" },
      }}
    >
      <Stack.Screen name="หน้าหลัก" component={Home} />
    </Stack.Navigator>
  );
};

export default StackHome;

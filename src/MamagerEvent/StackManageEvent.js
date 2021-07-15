import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventMenu from "./EventMenu";
import EventAdd from "./EventAdd";
import EventList from "./EventList";
const Stack = createStackNavigator();
const StackManageEvent = () => {
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
      <Stack.Screen name="อีเว้นท์" component={EventMenu} />
      <Stack.Screen name="จัดการข้อมูลอีเว้นท์" component={EventList} />
      <Stack.Screen name="เพิ่มข้อมูลอีเว้นท์" component={EventAdd} />
    </Stack.Navigator>
  );
};

export default StackManageEvent;

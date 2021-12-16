import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventMenu from "./EventMenu";
import EventAdd from "./EventAdd";
import EventList from "./EventList";
import EventTicket from "./EventTicket";
import EventVenue from "./EventVenue";
import EventPromoter from "./EventPromoter";
import EventEdit from "./EventEdit";
const Stack = createStackNavigator();
const StackManageEvent = () => {
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
        headerBackTitleStyle: {
          fontFamily: "Kanit_400Regular",
          color: "white",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="อีเว้นท์" component={EventMenu} />
      <Stack.Screen name="จัดการข้อมูลอีเว้นท์" component={EventList} />
      <Stack.Screen name="เพิ่มข้อมูลอีเว้นท์" component={EventAdd} />
      <Stack.Screen
        name="จัดการข้อมูลช่องทางการซื้อบัตร"
        component={EventTicket}
        options={{ headerTitle: "ช่องทางการซื้อบัตร" }}
      />
      <Stack.Screen
        name="จัดการข้อมูลสถานที่จัด"
        component={EventVenue}
        options={{ headerTitle: "สถานที่จัด" }}
      />
      <Stack.Screen
        name="จัดการข้อมูลตัวแทนจัด"
        component={EventPromoter}
        options={{ headerTitle: "ตัวแทนจัด" }}
      />
      <Stack.Screen name="แก้ไขข้อมูลอีเว้นท์" component={EventEdit} />
    </Stack.Navigator>
  );
};

export default StackManageEvent;

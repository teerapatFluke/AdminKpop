import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistMenu from "./ArtistMenu";
import ArtistAdd from "./ArtistAdd";
import ArtistEdit from "./ArtistEdit";
import Test from "../Home/Test";
const Stack = createStackNavigator();

const StackManageArtist = () => {
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
      <Stack.Screen name="จัดการข้อมูลศิลปิน" component={ArtistMenu} />
      <Stack.Screen name="เพิ่มข้อมูลศิลปิน" component={ArtistAdd} />
      <Stack.Screen name="แก้ไขข้อมูลศิลปิน" component={ArtistEdit} />
    </Stack.Navigator>
  );
};

export default StackManageArtist;

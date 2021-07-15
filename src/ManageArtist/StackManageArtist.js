import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistMenu from "./ArtistMenu";
import ArtistAdd from "./ArtistAdd";
import ArtistEdit from "./ArtistEdit";
const Stack = createStackNavigator();

const StackManageArtist = () => {
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
      <Stack.Screen name="จัดการข้อมูลศิลปิน" component={ArtistMenu} />
      <Stack.Screen name="เพิ่มข้อมูลศิลปิน" component={ArtistAdd} />
      <Stack.Screen name="แก้ไขข้อมูลศิลปิน" component={ArtistEdit} />
    </Stack.Navigator>
  );
};

export default StackManageArtist;

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Request from "./Request";
import RequestDetail from "./RequestDetail";
const Stack = createStackNavigator();
const StackRequest = () => {
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
      <Stack.Screen name="รายการร้องขอ" component={Request} />
      <Stack.Screen
        name="รายละเอียดคำขอ"
        component={RequestDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackRequest;

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Report from "./Report";
import ReportDetail from "./ReportDetail";
const Stack = createStackNavigator();

const StackReport = () => {
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
      <Stack.Screen name="รายการร้องเรียนปัญหา" component={Report} />
      <Stack.Screen
        name="รายละเอียดปัญหา"
        component={ReportDetail}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackReport;

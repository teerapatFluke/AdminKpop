import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import EventEdit from "../ManageEvent/EventEdit";
import EventList from "../ManageEvent/EventMenu";
import Test from "./Test";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../Auth/AuthProvider";
import {
  Searchbar,
  Card,
  Avatar,
  TextInput,
  FAB,
  Dialog,
  Portal,
  Provider,
  Button,
} from "react-native-paper";
import Style from "../Style";
const Stack = createStackNavigator();

const StackHome = () => {
  const ActionBarImage = () => {
    return (
      <TouchableOpacity onPress={showDialog}>
        <View style={{ marginRight: 14 }}>
          <Ionicons name="exit-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  };
  const showDialog = () => setVisible(true);
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const { signOut } = useContext(AuthContext);
  return (
    <Provider>
      <Portal>
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
          <Stack.Screen
            name="หน้าหลัก"
            options={{
              headerRight: () => <ActionBarImage />,
            }}
            component={Home}
          />
        </Stack.Navigator>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ออกจากระบบ</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  marginTop: 7,
                  fontSize: 18,
                  fontFamily: "Kanit_300Light",
                }}
              >
                คุณต้องการออกจากระบบใช่ไหม​ ?
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                signOut();
                hideDialog();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={() => {
                hideDialog();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default StackHome;

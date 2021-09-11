import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackRequest from "./src/Request/StackRequest";
import StackManageArtist from "./src/ManageArtist/StackManageArtist";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import StackManageEvent from "./src/ManageEvent/StackManageEvent";
import IconBadge from "react-native-icon-badge";
import { Badge } from "react-native-paper";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_200ExtraLight,
  Kanit_300Light,
} from "@expo-google-fonts/kanit";
import AppLoading from "expo-app-loading";
import StackHome from "./src/Home/StackHome";
import { View, Text } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_200ExtraLight,
    Kanit_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const IconBange = () => {
    return (
      <View>
        <IconBadge
          MainElement={<Entypo name="list" size={30} />}
          BadgeElement={<Text style={{ color: "#FFFFFF" }}>3</Text>}
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
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "TabHome") {
              iconName = "home";
              return <Entypo name={iconName} size={size} color={color} />;
            } else if (route.name === "TabRequest") {
              iconName = "list";
              return <IconBange />;
            } else if (route.name === "TabArtist") {
              iconName = "modern-mic";
              return <Entypo name={iconName} size={size} color={color} />;
            } else if (route.name === "TabEvents") {
              iconName = "event";
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else if (route.name === "TabBug") {
              iconName = "bug";
              return <Entypo name={iconName} size={size} color={color} />;
            }

            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#000",
          inactiveTintColor: "#000",
          showLabel: false,
          pressOpacity: "gray",
          activeBackgroundColor: "#C3FDFF",
          inactiveBackgroundColor: "#5D99C6",
        }}
      >
        <Tab.Screen name="TabHome" component={StackHome} />
        <Tab.Screen name="TabRequest" component={StackRequest} />

        <Tab.Screen name="TabArtist" component={StackManageArtist} />
        <Tab.Screen name="TabEvents" component={StackManageEvent} />

        <Tab.Screen name="TabBug" component={StackRequest} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

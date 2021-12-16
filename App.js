import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useMemo, useReducer, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackRequest from "./src/Request/StackRequest";
import StackManageArtist from "./src/ManageArtist/StackManageArtist";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StackReport from "./src/Report/StackReport";
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
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/Auth/AuthProvider";
import jwt_decode from "jwt-decode";
import Auth from "./src/Auth/Auth";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_200ExtraLight,
    Kanit_300Light,
  });

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          if (action.token) {
            AsyncStorage.setItem("userToken", action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          AsyncStorage.removeItem("userToken");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {}
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", token: data.access });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {},
    }),
    []
  );
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        {state.userToken ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  size = 30;

                  if (route.name === "TabHome") {
                    iconName = "home";
                    return <Entypo name={iconName} size={size} color={color} />;
                  } else if (route.name === "TabBug") {
                    iconName = "bug";
                    return <Entypo name={iconName} size={size} color={color} />;
                  } else if (route.name === "TabArtist") {
                    iconName = "modern-mic";
                    return <Entypo name={iconName} size={size} color={color} />;
                  } else if (route.name === "TabEvents") {
                    iconName = "event";
                    return (
                      <Image
                        source={require("./stage.png")}
                        fadeDuration={0}
                        style={{ width: 30, height: 30, tintColor: color }}
                      />
                    );
                  } else if (route.name === "TabRequest") {
                    iconName = "list";
                    return (
                      <Image
                        source={require("./question.png")}
                        fadeDuration={0}
                        style={{ width: 30, height: 30, tintColor: color }}
                      />
                    );
                  }

                  // You can return any component that you like here!
                  return (
                    <AntDesign name={iconName} size={size} color={color} />
                  );
                },
              })}
              tabBarOptions={{
                activeTintColor: "#555555",
                inactiveTintColor: "white",
                showLabel: false,
                pressOpacity: "gray",
                activeBackgroundColor: "white",
                inactiveBackgroundColor: "#555555",
              }}
            >
              <Tab.Screen name="TabHome" component={StackHome} />

              <Tab.Screen name="TabArtist" component={StackManageArtist} />
              <Tab.Screen name="TabEvents" component={StackManageEvent} />
              <Tab.Screen name="TabRequest" component={StackRequest} />

              <Tab.Screen name="TabBug" component={StackReport} />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 24,
                  fontFamily: "Kanit_400Regular",
                },
                cardStyle: { backgroundColor: "#fff" },
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen name="เข้าสู่ระบบ" component={Auth} />
              {/* <Stack.Screen name="FeedDetail" component={FeedDetail}></Stack.Screen> */}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </AuthContext.Provider>
    );
  }
};
export default App;

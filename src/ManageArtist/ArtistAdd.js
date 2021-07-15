import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Provider, TextInput, Button } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Style from "../Style";
const ArtistAdd = ({ navigation }) => {
  const [text, setText] = React.useState("");

  return (
    <Provider>
      <View>
        <View style={{ alignSelf: "center", marginTop: 7, marginBottom: 7 }}>
          <TouchableOpacity style={style.addphoto_button}>
            <MaterialIcons name="add-a-photo" size={40} />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            label="ชื่อศิลปินภาษาไทย"
            value={text}
            onChangeText={(text) => setText(text)}
            style={style.text_input}
            theme={{
              fonts: {
                regular: {
                  fontFamily: "Kanit_400Regular",
                },
              },
            }}
          />
          <TextInput
            label="ชื่อศิลปินภาษาอังกฤษ"
            value={text}
            style={style.text_input}
            onChangeText={(text) => setText(text)}
            theme={{
              fonts: {
                regular: {
                  fontFamily: "Kanit_400Regular",
                },
              },
            }}
          />
        </View>
        <View style={{ alignSelf: "center", marginTop: 14 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("จัดการข้อมูลศิลปิน")}
            style={Style.Add_Button}
          >
            <Text style={Style.text_400}>เพิ่มข้อมูล</Text>
          </Button>
        </View>
      </View>
    </Provider>
  );
};

const style = StyleSheet.create({
  addphoto_button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text_input: {
    marginTop: 7,
    marginHorizontal: 14,
    justifyContent: "center",
  },
});
export default ArtistAdd;

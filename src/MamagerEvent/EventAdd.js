import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Style from "../Style";
import { TextInput, Provider, DefaultTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const EventAdd = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState();

  const genderList = [
    { label: "ชาย", value: "male" },

    { label: "หญิง", value: "female" },

    { label: "Others", value: "others" },
  ];
  const [text, setText] = useState("");

  return (
    <Provider>
      <ScrollView>
        <Text style={Style.text_400_add}>ศิลปิน</Text>
        <View style={Style.drop_down}>
          <DropDown
            value={gender}
            setValue={setGender}
            list={genderList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
            dropDownItemSelectedTextStyle={{ fontFamily: "Kanit_400Regular" }}
            dropDownItemTextStyle={{ fontFamily: "Kanit_400Regular" }}
          />
        </View>
        <TextInput
          label="ชื่ออีเว้นท์"
          value={text}
          style={Style.text_input}
          onChangeText={(text) => setText(text)}
          theme={theme}
        />
      </ScrollView>
    </Provider>
  );
};

const theme = {
  fonts: {
    regular: {
      fontFamily: "Kanit_400Regular",
    },
  },
};

export default EventAdd;

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Style from "../Style";
import { TextInput, Provider, DefaultTheme, Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";

const EventAdd = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState();

  const genderList = [
    { label: "ชาย", value: "male" },

    { label: "หญิง", value: "female" },

    { label: "Others", value: "others" },
  ];
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setText2(String(moment(date).calendar()));
    hideDatePicker();
  };

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
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="วันที่เริ่มอีเว้นท์"
              value={text2}
              style={Style.text_input_date}
              onChangeText={(text) => setText2(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="วันจบอีเว้นท์"
              value={text2}
              style={Style.text_input_date}
              onChangeText={(text) => setText2(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="วันที่เริ่มขายบัตร"
              value={text2}
              style={Style.text_input_date}
              onChangeText={(text) => setText2(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={Style.text_400_add}>ช่องทางการสั่งซื้อบัตร</Text>
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
        <Text style={Style.text_400_add}>สถานที่จัต</Text>
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
        <Text style={Style.text_400_add}>ตัวแทนผู้จัด</Text>
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
        <View style={{ alignSelf: "center", marginTop: 14, marginBottom: 14 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("จัดการข้อมูลศิลปิน")}
            style={Style.Add_Button}
          >
            <Text style={Style.text_400}>เพิ่มข้อมูล</Text>
          </Button>
        </View>
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

import React from "react";
import { View, Text } from "react-native";
import Style from "../Style";
const RequestDetail = () => {
  const Text_Detail = ({ header, detail }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginLeft: 14, marginTop: 7 }}>
          <Text style={Style.text_400}>{header}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            marginRight: 14,
            marginTop: 7,
          }}
        >
          <Text style={Style.text_200}>{detail}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text_Detail header="ผู้ส่งคำขอ" detail="detail"></Text_Detail>
      <Text_Detail header="ประเภทคำขอ" detail="detail"></Text_Detail>
      <Text_Detail header="หัวข้อ" detail="detail"></Text_Detail>
      <Text_Detail header="วันที่ส่ง" detail="detail"></Text_Detail>
      <View style={{ marginTop: 7, marginLeft: 14 }}>
        <Text style={Style.text_400}>รายละเอียด</Text>
      </View>
      <View style={{ marginTop: 7, marginLeft: 14 }}>
        <Text style={Style.text_200}>รายละเอียด</Text>
      </View>
    </View>
  );
};

export default RequestDetail;

import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import Style from "../Style";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "./RequestAPI";
import moment from "moment";
import "moment/locale/th";
const RequestDetail = ({ route }) => {
  const [request, setRequest] = useState({});
  const { id } = route.params;
  const fetachdata = () => {
    API.getRequestID(id)
      .then((resp) => resp.json())
      .then((resp) => setRequest(resp))
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted && id) {
        fetachdata();
      }
      return () => {
        id == 0;
      };
    }, [id])
  );

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
      {request ? (
        <View style={{ flex: 1 }}>
          <Text_Detail
            header="หมายเลขผู้ส่งคำขอ"
            detail={request.newuser}
          ></Text_Detail>
          {request.request_type == 1 ? (
            <Text_Detail
              header="ประเภทคำขอ"
              detail="ร้องขอศิลปิน"
            ></Text_Detail>
          ) : (
            <Text_Detail
              header="ประเภทคำขอ"
              detail="ร้องขออีเว้นท์"
            ></Text_Detail>
          )}
          <Text_Detail
            header="หัวข้อ"
            detail={request.request_header}
          ></Text_Detail>
          <Text_Detail
            header="วันที่ส่ง"
            detail={moment(request.request_date).format("ll")}
          ></Text_Detail>
          <View style={{ marginTop: 7, marginLeft: 14 }}>
            <Text style={Style.text_400}>รายละเอียด</Text>
          </View>
          <View style={{ marginTop: 7, marginLeft: 14 }}>
            <Text style={Style.text_200}>{request.request_detail}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default RequestDetail;

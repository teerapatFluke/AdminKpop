import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import Style from "../Style";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "./ReportAPI";

const ReportDetail = ({ route }) => {
  const [problem, setProblem] = useState({});
  const { id } = route.params;
  const fetachdata = () => {
    API.getReportID(id)
      .then((resp) => resp.json())
      .then((resp) => setProblem(resp))
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
      {problem ? (
        <View style={{ flex: 1 }}>
          <Text_Detail
            header="หมายเลขผู้ส่งคำขอ"
            detail={problem.newuser}
          ></Text_Detail>
          <Text_Detail
            header="หัวข้อ"
            detail={problem.problem_head}
          ></Text_Detail>
          <Text_Detail
            header="วันที่ส่ง"
            detail={problem.problem_date}
          ></Text_Detail>
          <View style={{ marginTop: 7, marginLeft: 14 }}>
            <Text style={Style.text_400}>รายละเอียด</Text>
          </View>
          <View style={{ marginTop: 7, marginLeft: 14 }}>
            <Text style={Style.text_200}>{problem.problem_detail}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ReportDetail;

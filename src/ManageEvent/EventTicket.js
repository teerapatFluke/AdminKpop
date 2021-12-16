import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Style from "../Style";
import {
  Searchbar,
  Card,
  Avatar,
  Paragraph,
  Dialog,
  Portal,
  Button,
  Provider,
  FAB,
  TextInput,
} from "react-native-paper";
import { EvAPI } from "./EventAPI";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
const EventTicket = () => {
  const [ticket, setticket] = useState(null);
  const [visibleadd, setVisibleadd] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [name, setname] = useState("");
  const [detail, setDetail] = useState("");
  const [id, setid] = useState("");
  const [isUpdate, setisUpdate] = useState(false);
  const [type, setType] = useState(1);
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  let apikey = "AIzaSyCAXUwhuh-byreLAy1POMQAcLAiNWEaHvM";
  const onChangeMap = (text) => {
    setText(text);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apikey}&input=${text}&language=th&components=country:th`;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((resp) => setPrediction(resp.predictions));
  };

  const showDialogadd = () => {
    setVisibleadd(true);
    setname("");
  };

  const hideDialogadd = () => setVisibleadd(false);
  const showDialogedit = (name, id, type, detail) => {
    setVisibleedit(true);
    setname(name);
    setid(id);
    setType(type);
    setDetail(detail);
  };
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => {
    setVisible2(true);
  };
  const hideDialog2 = () => setVisible2(false);

  const [visible3, setVisible3] = useState(false);
  const showDialog3 = () => {
    setVisible3(true);
  };
  const hideDialog3 = () => setVisible3(false);
  const [visible4, setVisible4] = useState(false);
  const showDialog4 = () => {
    setVisible4(true);
  };
  const hideDialog4 = () => setVisible4(false);
  const [visible5, setVisible5] = useState(false);
  const showDialog5 = () => {
    setVisible5(true);
  };
  const hideDialog5 = () => setVisible5(false);
  const [visible6, setVisible6] = useState(false);
  const showDialog6 = () => {
    setVisible6(true);
  };
  const hideDialog6 = () => setVisible6(false);
  const [visible7, setVisible7] = useState(false);
  const showDialog7 = () => {
    setVisible7(true);
  };
  const hideDialog7 = () => setVisible7(false);

  const hideDialogedit = () => setVisibleedit(false);
  const fetchdata = () => {
    setDetail("");
    EvAPI.getTicket()
      .then((resp) => resp.json())
      .then((resp) => setticket(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        fetchdata();
      }
      return () => {
        isMounted = false;
      };
    }, [])
  );

  useEffect(() => {
    if (isUpdate) {
      fetchdata();
    }
    return () => {
      setisUpdate(false);
    };
  }, [isUpdate]);

  const addTicket = () => {
    if (type == 1) {
      EvAPI.addTicket({ name: name, detail: name, type: type })
        .then((resp) => resp.json())
        .then(() => setisUpdate(true))
        .then(() => setVisibleadd(false))
        .then(() => showDialog7())
        .catch((error) => {
          console.error(error);
        });
    } else {
      EvAPI.addTicket({ name: name, detail: detail, type: type })
        .then((resp) => resp.json())
        .then(() => setisUpdate(true))
        .then(() => setVisibleadd(false))
        .then(() => showDialog7())
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const editTicket = () => {
    EvAPI.editTicket({ name, detail, type }, id)
      .then((resp) => resp.json())
      .then(() => setVisibleedit(false))
      .then(() => setisUpdate(true))
      .then(() => showDialog3())
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTicket = () => {
    EvAPI.deleteTicket(id)
      .then((res) => res.text()) // or res.json()
      .then(() => setisUpdate(true))
      .then(() => setVisibleedit(false))
      .then(() => showDialog5())
      .catch((error) => {
        console.error(error);
      });
  };
  const MenuCard = ({ name, id, type, detail }) => {
    return (
      <TouchableOpacity onPress={() => showDialogedit(name, id, type, detail)}>
        <Card style={styles.event}>
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ alignSelf: "center", flex: 1 }}>
              <Text style={Style.text_300}>{name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <FlatList
        data={ticket}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <MenuCard
              name={item.name}
              id={item.id.toString()}
              type={item.type}
              detail={item.detail}
            ></MenuCard>
          </ScrollView>
        )}
      />
      {visibleadd || visibleedit ? null : (
        <FAB
          style={styles.fab}
          icon="plus"
          size={100}
          onPress={() => showDialogadd()}
          theme={{ colors: { accent: "#2c2c2c" } }}
        />
      )}

      <Dialog visible={visibleadd} onDismiss={hideDialogadd}>
        <Dialog.Title>
          <Text style={Style.text_400}>ช่องทางการซื้อบัตร</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ชื่อช่องทาง</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 50, backgroundColor: "white", marginBottom: 7 }}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ประเภท</Text>
          </View>
          <View
            style={{
              marginBottom: 7,
              borderWidth: 1,
              height: 40,
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={type}
              style={Style.text_400}
              onValueChange={(itemValue) => setType(itemValue)}
              itemStyle={Style.text_400}
            >
              <Picker.Item value={1} label="สถานที่" />
              <Picker.Item value={2} label="หมายเลขโทรศัพท์" />
              <Picker.Item value={3} label="เว็บไซต์" />
            </Picker>
          </View>
          {(() => {
            if (type == 3)
              return (
                <View>
                  <View style={{ marginBottom: 7 }}>
                    <Text style={Style.text_200_head}>URL</Text>
                  </View>

                  <View>
                    <TextInput
                      placeholder={"www.example.com"}
                      style={{
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 7,
                      }}
                      value={detail}
                      onChangeText={(text) => setDetail(text)}
                    />
                  </View>
                </View>
              );
            else if (type == 2)
              return (
                <View>
                  <View style={{ marginBottom: 7 }}>
                    <Text style={Style.text_200_head}>หมายเลขโทรศัพท์</Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder={"0123456789"}
                      keyboardType="numeric"
                      style={{
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 7,
                      }}
                      value={detail}
                      onChangeText={(text) => setDetail(text)}
                    />
                  </View>
                </View>
              );
            else return null;
          })()}
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={showDialog6}
          >
            <Text style={[Style.text_300, { color: "white" }]}>
              เพิ่มข้อมูล
            </Text>
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={() => hideDialogadd()}
          >
            <Text style={[Style.text_300, { color: "white" }]}> ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={visibleedit} onDismiss={hideDialogedit}>
        <Dialog.Title>
          <Text style={Style.text_400}>ช่องทางการซื้อบัตร</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ชื่อช่องทาง</Text>
          </View>
          <View>
            <TextInput
              style={{ height: 50, backgroundColor: "white", marginBottom: 7 }}
              value={name}
              onChangeText={(text) => setname(text)}
            />
          </View>
          <View style={{ marginBottom: 7 }}>
            <Text style={Style.text_200_head}>ประเภท</Text>
          </View>
          <View
            style={{
              marginBottom: 7,
              borderWidth: 1,
              height: 40,
              justifyContent: "center",
            }}
          >
            <Picker
              selectedValue={type}
              style={Style.text_400}
              onValueChange={(itemValue) => setType(itemValue)}
              itemStyle={Style.text_400}
            >
              <Picker.Item value={1} label="สถานที่" />
              <Picker.Item value={2} label="หมายเลขโทรศัพท์" />
              <Picker.Item value={3} label="เว็บไซต์" />
            </Picker>
          </View>
          {(() => {
            if (type == 3)
              return (
                <View>
                  <View style={{ marginBottom: 7 }}>
                    <Text style={Style.text_200_head}>URL</Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder={"www.example.com"}
                      style={{
                        height: 50,
                        backgroundColor: "white",
                        marginBottom: 7,
                      }}
                      value={detail}
                      onChangeText={(text) => setDetail(text)}
                    />
                  </View>
                </View>
              );
            else if (type == 2)
              return (
                <View>
                  <View style={{ marginBottom: 7 }}>
                    <Text style={Style.text_200_head}>หมายเลขโทรศัพท์</Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder={"0123456789"}
                      keyboardType="numeric"
                      style={{ height: 50, backgroundColor: "white" }}
                      value={detail}
                      onChangeText={(text) => setDetail(text)}
                    />
                  </View>
                </View>
              );
            else return null;
          })()}
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={showDialog2}
          >
            <Text style={[Style.text_300, { color: "white" }]}>
              แก้ไขข้อมูล
            </Text>
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={showDialog4}
          >
            <Text style={[Style.text_300, { color: "white" }]}> ลบข้อมูล</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible2} onDismiss={hideDialog2}>
        <Dialog.Title>
          <Text style={Style.text_300}>ยืนยันการแก้ไขข้อมูล,</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>
            คุณต้องการแก้ไขข้อมูลช่องทางการสั่งซื้อบัตรใช่ไหม ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={() => {
              hideDialog2();
              editTicket();
            }}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>

          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog2}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible3} onDismiss={hideDialog3}>
        <Dialog.Title>
          <Text style={Style.text_300}>ผลการดำเนินการ</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>แก้ไขข้อมูลเสร็จสิ้น</Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog3}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible4} onDismiss={hideDialog4}>
        <Dialog.Title>
          <Text style={Style.text_300}>ยืนยันการลบข้อมูล,</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>
            คุณต้องการลบข้อมูลช่องทางการสั่งซื้อบัตรใช่ไหม ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={() => {
              hideDialog4();
              deleteTicket();
            }}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>

          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog4}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible5} onDismiss={hideDialog5}>
        <Dialog.Title>
          <Text style={Style.text_300}>ผลการดำเนินการ</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>ลบข้อมูลเสร็จสิ้น</Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog5}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible6} onDismiss={hideDialog6}>
        <Dialog.Title>
          <Text style={Style.text_300}>ยืนยันการเพิ่มข้อมูล</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>
            คุณต้องการเพิ่มข้อมูลช่องทางการสั่งซื้อบัตรใช่ไหม ?
          </Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={() => {
              hideDialog6();
              addTicket();
            }}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>

          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog6}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible7} onDismiss={hideDialog7}>
        <Dialog.Title>
          <Text style={Style.text_300}>ผลการดำเนินการ</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text style={Style.text_300}>เพิ่มข้อมูลเสร็จสิ้น</Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "black" }}
            onPress={hideDialog7}
          >
            <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Provider>
  );
};
const styles = StyleSheet.create({
  event: {
    backgroundColor: "#fff",

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "92%",
    height: 72,
    alignSelf: "center",
    marginTop: 7,
    marginBottom: 7,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
export default EventTicket;

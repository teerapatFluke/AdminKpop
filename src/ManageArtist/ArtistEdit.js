import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Provider,
  TextInput,
  Button,
  Portal,
  Dialog,
  HelperText,
} from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Style from "../Style";
import { AsAPI } from "./Artist-api";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
const ArtistEdit = ({ route, navigation }) => {
  const { id } = route.params;
  const [artist, setartist] = useState([]);
  const [artist_name_TH, setTH] = useState("");
  const [artist_name_EN, setEN] = useState("");
  const [artist_follow, setartist_follow] = useState("");
  const [chat_url, setchat_url] = useState("");
  const [image, setImage] = useState("");
  const [imgName, setImageName] = useState("");
  const [artist_picture, setArtist_picture] = useState("");
  const [Amazon, setAmazon] = useState({});
  const [nameTHErr, setNameTHErr] = useState(false);
  const [nameENErr, setNameENErr] = useState(false);
  const [pictureErr, setPictureErr] = useState(false);
  const [buttonhide, setbuttonhide] = useState(true);
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
    setbuttonhide(false);
  };

  const hideDialog = () => {
    setVisible(false);
    setbuttonhide(true);
  };
  const [visible2, setVisible2] = useState(false);

  const showDialog2 = () => {
    setVisible2(true);
    setbuttonhide(false);
  };

  const hideDialog2 = () => {
    setVisible2(false);
    setbuttonhide(true);
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      AsAPI.getArtistID(id)
        .then((resp) => resp.json())
        .then((resp) => setartist(resp))
        .catch((error) => {
          console.error(error);
        });
      AsAPI.getAmazon()
        .then((resp) => resp.json())
        .then((resp) => setAmazon(resp))
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);
  useEffect(() => {
    if (artist !== []) {
      setTH(artist.artist_name_TH);
      setEN(artist.artist_name_EN);
      setImage(artist.artist_picture);
      setArtist_picture(artist.artist_picture);
      setartist_follow(artist.artist_follow);
      setchat_url(artist.chat_url);
    }
  }, [artist]);

  const pickImage = async () => {
    let name = moment().format("MMMMDoYYYYhmmssa");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageName(name);
      setArtist_picture(
        "https://kpop1.s3.ap-southeast-1.amazonaws.com/" + name
      );
    }
  };

  const uploadFile = () => {
    if (Object.keys(image).length == 0) {
      alert("Please select image first");
      return;
    }
    RNS3.put(
      {
        uri: image,
        name: imgName,
        type: "image/jpeg",
      },
      {
        keyPrefix: "",
        bucket: "kpop1",
        region: "ap-southeast-1",
        accessKey: Amazon.accessKey,
        secretKey: Amazon.secretKey,
        successActionStatus: 201,
      }
    ).then((response) => {
      if (response.status !== 201) alert("Failed to upload image to S3");
    });
  };

  const editArtist = () => {
    if (imgName !== "") {
      uploadFile();
    }
    AsAPI.editArtist(artist.id, {
      artist_name_TH,
      artist_name_EN,
      artist_picture,
      artist_follow,
      chat_url,
    })
      .then((resp) => resp.json())
      .then((resp) => showDialog2())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Provider>
      <Portal>
        <View style={{ marginHorizontal: 7 }}>
          <View style={{ alignSelf: "center", marginTop: 7, marginBottom: 7 }}>
            {image ? (
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={style.addphoto_button}
                  source={{
                    uri: image,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ alignSelf: "center" }}>
                <TouchableOpacity
                  style={style.addphoto_button}
                  onPress={pickImage}
                >
                  <MaterialIcons name="add-a-photo" size={40} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {image ? null : (
            <View style={{ alignSelf: "center" }}>
              <HelperText type="error" visible={pictureErr}>
                กรุณาเลือกรูปภาพ
              </HelperText>
            </View>
          )}

          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>ชื่อศิลปินภาษาไทย</Text>
          </View>
          <View style={{ marginHorizontal: 14, marginTop: 7 }}>
            <TextInput
              placeholder="ชื่อศิลปินภาษาไทย"
              value={artist_name_TH}
              mode="flat"
              onChangeText={(artist_name_TH) => {
                setTH(artist_name_TH);
                setNameTHErr(false);
              }}
              style={Style.text_input}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit_400Regular",
                  },
                },
              }}
            />
          </View>
          <HelperText type="error" visible={nameTHErr}>
            กรุณาระบุข้อมูลชื่อศิลปินภาษาไทย
          </HelperText>
          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>ชื่อศิลปินภาษาอังกฤษ</Text>
          </View>

          <View style={{ marginHorizontal: 14, marginTop: 7 }}>
            <TextInput
              placeholder="ชื่อศิลปินภาษาอังกฤษ"
              value={artist_name_EN}
              style={Style.text_input}
              onChangeText={(artist_name_EN) => {
                setEN(artist_name_EN);
                setNameENErr(false);
              }}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit_400Regular",
                  },
                },
              }}
            />
            <HelperText type="error" visible={nameENErr}>
              กรุณาระบุข้อมูลชื่อศิลปินภาษาอังกฤษ
            </HelperText>
          </View>
          <View style={{ alignSelf: "center", marginTop: 14 }}>
            {buttonhide ? (
              <Button
                mode="contained"
                onPress={showDialog}
                style={Style.Add_Button}
              >
                <Text style={[Style.text_400, { color: "white" }]}>
                  แก้ไขข้อมูล
                </Text>
              </Button>
            ) : null}
          </View>
        </View>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ยืนยันการแก้ไขข้อมูล</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>
              คุณต้องการแก้ไขข้อมูลศิลปินใช่ไหม
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
                hideDialog();
                editArtist();
              }}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>

            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={hideDialog}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ยกเลิก</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={visible2} onDismiss={hideDialog2}>
          <Dialog.Title>
            <Text style={Style.text_300}>ผลการดำเนินการ</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>แก้ไขข้อมูลสำเร็จ</Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{ flex: 1, backgroundColor: "black" }}
              onPress={hideDialog2}
            >
              <Text style={[Style.text_300, { color: "white" }]}>ตกลง</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  },
  text_input: {
    width: "93%",
    marginTop: 7,
    alignSelf: "center",
    fontFamily: "Kanit_400Regular",
  },
});
export default ArtistEdit;

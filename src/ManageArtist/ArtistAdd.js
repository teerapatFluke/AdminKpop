import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Avatar, Provider, TextInput, Button } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Style from "../Style";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import moment from "moment";
import { AsAPI } from "./Artist-api";
const ArtistAdd = ({ navigation }) => {
  const [artist_name_TH, setartist_name_TH] = useState("");
  const [artist_name_EN, setartist_name_EN] = useState("");
  const [image, setImage] = useState("");
  const [imgName, setImageName] = useState("");
  const [artist_picture, setArtist_picture] = useState("");
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
        accessKey: "AKIA476CQJMRSGHUTNRE",
        secretKey: "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",
        successActionStatus: 201,
      }
    ).then((response) => {
      if (response.status !== 201) alert("Failed to upload image to S3");
      console.log(response.body);
      setImage(null);
      setImageName("");
      setartist_name_TH("");
      setartist_name_EN("");
    });
  };

  const addArtist = () => {
    uploadFile();
    AsAPI.addArtist({ artist_name_TH, artist_name_EN, artist_picture })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Provider>
      <View>
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
            <TouchableOpacity style={style.addphoto_button} onPress={pickImage}>
              <MaterialIcons name="add-a-photo" size={40} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TextInput
            label="ชื่อศิลปินภาษาไทย"
            value={artist_name_TH}
            onChangeText={(artist_name_TH) => setartist_name_TH(artist_name_TH)}
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
            value={artist_name_EN}
            style={style.text_input}
            onChangeText={(artist_name_EN) => setartist_name_EN(artist_name_EN)}
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
          <Button mode="contained" onPress={addArtist} style={Style.Add_Button}>
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
  },
  text_input: {
    marginTop: 7,
    marginHorizontal: 14,
    justifyContent: "center",
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    margin: 5,
  },
  tinyLogo: {
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
});
export default ArtistAdd;

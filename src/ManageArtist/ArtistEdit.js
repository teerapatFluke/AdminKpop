import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Avatar, Provider, TextInput, Button } from "react-native-paper";
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
  const [image, setImage] = useState("");
  const [imgName, setImageName] = useState("");
  const [artist_picture, setArtist_picture] = useState("");
  const [Amazon, setAmazon] = useState({});

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
      console.log(image);
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
      console.log(response.body);
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
    })
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
          {artist_picture !== "" ? (
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={style.addphoto_button}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <TextInput
            label="ชื่อศิลปินภาษาไทย"
            value={artist_name_TH}
            onChangeText={(text) => setTH(text)}
            style={style.text_input}
          />
          <TextInput
            label="ชื่อศิลปินภาษาอังกฤษ"
            value={artist_name_EN}
            style={style.text_input}
            onChangeText={(text) => setEN(text)}
          />
        </View>
        <View style={{ alignSelf: "center", marginTop: 14 }}>
          <Button
            mode="contained"
            onPress={editArtist}
            style={Style.Edit_Button}
          >
            <Text style={Style.text_400}>แก้ไขข้อมูล</Text>
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
    width: "93%",
    marginTop: 7,
    alignSelf: "center",
    fontFamily: "Kanit_400Regular",
  },
});
export default ArtistEdit;

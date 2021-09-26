import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { TextInput } from "react-native-paper";

const Test = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  let apikey = "AIzaSyCAXUwhuh-byreLAy1POMQAcLAiNWEaHvM";
  const onChangeA = (text) => {
    setText(text);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apikey}&input=${text}`;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((resp) => setPrediction(resp.predictions));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TextInput
          label="Place"
          value={text}
          onChangeText={(text) => onChangeA(text)}
        />
        {prediction ? (
          <ScrollView>
            {prediction.map((item) => (
              <View
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  marginBottom: 5,
                  borderWidth: 1,
                  marginHorizontal: 15,
                }}
              >
                <Text>{item.description}</Text>
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default Test;

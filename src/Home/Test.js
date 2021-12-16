import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import { Access, Secret, appId } from "@env";
import SendBird from "sendbird";
const Test = () => {
  const sb = new SendBird({ appId: appId });
  sb.connect("admin", function (user, error) {
    if (error) {
      // Handle error.
    } else {
      var params = new sb.GroupChannelParams();
      params.isPublic = true;
      params.isSuper = false;
      params.name = "test";

      sb.GroupChannel.createChannel(params, function (groupChannel, error) {
        if (error) {
          // Handle error.
        } else {
        }

        // A group channel with detailed configuration is successfully created.
        // By using groupChannel.channelUrl, groupChannel.members, groupChannel.data, groupChannel.customType, and so on,
        // you can access the result object from Sendbird server to check your GroupChannelParams configuration.
        const channelUrl = groupChannel.channelUrl;
      });
    }

    // The user is connected to Sendbird server.
  });
  return (
    <View>
      <Text>TEst</Text>
    </View>
  );
};

export default Test;

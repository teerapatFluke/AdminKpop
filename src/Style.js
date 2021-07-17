import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  text_400: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
  },
  text_200: {
    fontSize: 18,
    fontFamily: "Kanit_200ExtraLight",
  },
  Add_Button: {
    width: 144,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#8EDA5F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Edit_Button: {
    width: 144,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#FFE57F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text_300: {
    fontSize: 18,
    fontFamily: "Kanit_300Light",
    color: "#000",
  },
  text_status: {
    fontSize: 14,
    fontFamily: "Kanit_200ExtraLight",
  },
  text_400_add: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
    marginTop: 7,
    marginLeft: 14,
  },
  drop_down: {
    marginHorizontal: 14,
    justifyContent: "center",
    marginTop: 7,
    flex: 1,
  },
  text_input: {
    marginTop: 7,
    marginHorizontal: 14,
    justifyContent: "center",
  },
  text_input_date: {
    marginTop: 7,
    marginLeft: 14,
    justifyContent: "center",
  },
});

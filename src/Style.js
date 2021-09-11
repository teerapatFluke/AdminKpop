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
  text_status_unfinish: {
    fontSize: 14,
    fontFamily: "Kanit_200ExtraLight",
    color: "#FA3A3A",
  },
  text_status_finish: {
    fontSize: 14,
    fontFamily: "Kanit_200ExtraLight",
  },
  text_400_add: {
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    color: "#000",
    marginTop: 7,
    marginLeft: 15,
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
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
  },
  text_list: {
    marginLeft: 7,
    justifyContent: "center",
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
  },
  text_input_date: {
    marginTop: 7,
    marginLeft: 14,
    justifyContent: "center",
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
  },
  picker: {
    flex: 1,
    marginHorizontal: 14,
    height: 45,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
  },
});

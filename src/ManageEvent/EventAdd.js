import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import Style from "../Style";
import { TextInput, Provider, Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EvAPI } from "./EventAPI";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";

const EventAdd = () => {
  const [event_name, setEventName] = useState("");
  const [ticket_price, setTicketPrice] = useState("");
  const [show_day, setShow_day] = useState("");
  const [end_day, setEnd_day] = useState("");
  const [ticket_open, setTicket_open] = useState("");
  const [isDatePickerOpenVisible, setDatePickerOpenVisibility] =
    useState(false);
  const [isDatePickerEndVisible, setDatePickerEndVisibility] = useState(false);
  const [isDatePickerShowVisible, setDatePickerShowVisibility] =
    useState(false);
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const [venue, setSelectedVenue] = useState();
  const [promoter, setSelectedPromoter] = useState();
  const [artist, setArtist] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [venueList, setVenueList] = useState(null);
  const [promoterList, setPromoterList] = useState(null);
  const [isArtistAdd, setisArtistAdd] = useState(false);
  const [isTicketAdd, setisTicketAdd] = useState(false);
  const [isArtistDel, setisArtistDel] = useState(false);
  const [isTicketDel, setisTicketDel] = useState(false);
  const [artistList, setArtistList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [artistpost, setArtistPost] = useState([]);
  const [ticketpost, setTicketPost] = useState([]);
  const [eventID, setEventID] = useState(0);
  const [index, setindex] = useState(-1);
  const [test1, settest] = useState("");
  const hideDatePickerOpen = () => {
    setDatePickerOpenVisibility(false);
  };
  const handleConfirmOpen = (date) => {
    setTicket_open(moment(date).format("YYYY-MM-DD"));
    hideDatePickerOpen();
  };

  const hideDatePickerShow = () => {
    setDatePickerShowVisibility(false);
  };
  const handleConfirmShow = (date) => {
    setShow_day(moment(date).format("YYYY-MM-DD"));
    hideDatePickerShow();
  };

  const hideDatePickerEnd = () => {
    setDatePickerEndVisibility(false);
  };

  const handleConfirmEnd = (date) => {
    setEnd_day(moment(date).format("YYYY-MM-DD"));
    hideDatePickerEnd();
  };

  const Square = ({ name, id, type }) => (
    <View
      style={{
        marginHorizontal: 14,
        height: 45,
        backgroundColor: "#E5E5E5",
        marginTop: 7,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginRight: 7,
        }}
      >
        <Text style={Style.text_list}>{name}</Text>
      </View>
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() => deleteSquare(id, type)}
      >
        <View
          style={{
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 7,
          }}
        >
          <Ionicons name="close" size={32} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (isArtistDel) {
      var newartistList = artistList;
      newartistList.splice(index, 1);
      setArtistList(newartistList);

      var newartistPost = artistpost;
      newartistPost.splice(index, 1);
      setArtistPost(newartistPost);
    }
    return () => {
      setisArtistDel(false);
    };
  }, [isArtistDel]);

  useEffect(() => {
    if (isTicketDel) {
      var newticketList = ticketList;
      newticketList.splice(index, 1);
      setTicketList(newticketList);

      var newticketPost = ticketpost;
      newticketPost.splice(index, 1);
      setTicketPost(newticketPost);
    }
    return () => {
      setisTicketDel(false);
    };
  }, [isTicketDel]);

  const deleteSquare = (id, type) => {
    if (type == "artist") {
      setindex(artistpost.indexOf(id));
      setisArtistDel(true);
    } else {
      setindex(ticketpost.indexOf(id));
      setisTicketDel(true);
    }
  };
  const fetchdata = () => {
    EvAPI.getArtist()
      .then((resp) => resp.json())
      .then((resp) => setArtist(resp))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getTicket()
      .then((respo) => respo.json())
      .then((respo) => setTicket(respo))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getVenue()
      .then((respo) => respo.json())
      .then((respo) => setVenueList(respo))
      .catch((error) => {
        console.error(error);
      });
    EvAPI.getPromoter()
      .then((respo) => respo.json())
      .then((respo) => setPromoterList(respo))
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

  const artistPick = (itemValue, type) => {
    setSelectedArtist(itemValue);
    if (itemValue !== "0") {
      var result = artist.find((obj) => {
        return obj.id.toString() == itemValue;
      });
      let newartistList = artistList;
      newartistList.push(
        <Square
          name={result.artist_name_EN}
          id={result.id.toString()}
          type={type}
        />
      );
      setArtistList(newartistList);

      let newartistPost = artistpost;
      newartistPost.push(itemValue);
      setArtistPost(newartistPost);
    }
  };

  const ticketPick = (itemValue, type) => {
    setSelectedTicket(itemValue);
    if (itemValue !== "0") {
      var result = ticket.find((obj) => {
        return obj.id.toString() === itemValue;
      });

      let newticketList = ticketList;
      newticketList.push(
        <Square name={result.name} id={result.id.toString()} type={type} />
      );
      setTicketList(newticketList);

      let newticketPost = ticketpost;
      newticketPost.push(itemValue);
      setTicketPost(newticketPost);
    }
  };
  const checkComplete = () => {
    if (
      event_name &&
      artistpost.length > 0 &&
      ticketpost.length > 0 &&
      show_day &&
      end_day &&
      ticket_open &&
      promoter &&
      venue
    ) {
      return 1;
    } else {
      return 0;
    }
  };
  const addEvent = () => {
    let complete = checkComplete();

    EvAPI.addEvent({
      event_name,
      artistpost,
      ticketpost,
      show_day,
      end_day,
      ticket_open,
      ticket_price,
      promoter,
      venue,
      complete,
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp.id))
      .catch((error) => {
        console.error(error);
      });
  };
  const test = () => {
    console.log(checkComplete());
    console.log(ticketpost.length > 0);
  };
  return (
    <Provider>
      <ScrollView>
        {/*<Button onPress={test}>test</Button> */}
        <Text style={Style.text_400_add}>ศิลปิน</Text>

        {artist !== null ? (
          <View style={Style.picker}>
            <Picker
              selectedValue={selectedArtist}
              style={Style.text_400}
              onValueChange={(itemValue) => artistPick(itemValue, "artist")}
              itemStyle={Style.text_400}
            >
              <Picker.Item label="กรุณาเลือกศิลปิน" value="0" />

              {artist.map((item, index) => {
                return (
                  <Picker.Item
                    value={item.id.toString()}
                    label={item.artist_name_EN}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        ) : null}

        {artistList
          ? artistList.map((elem, index) => {
              return <View key={index}>{elem}</View>;
            })
          : null}
        <TextInput
          label="ชื่ออีเว้นท์"
          value={event_name}
          style={Style.text_input}
          onChangeText={(text) => setEventName(text)}
          theme={theme}
        />

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="วันที่เริ่มอีเว้นท์"
              value={show_day}
              style={Style.text_input_date}
              onChangeText={(text) => setShow_day(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerShowVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerShowVisible}
          mode="date"
          onConfirm={handleConfirmShow}
          onCancel={hideDatePickerShow}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="วันจบอีเว้นท์"
              value={end_day}
              style={Style.text_input_date}
              onChangeText={(text) => setEnd_day(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerEndVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerEndVisible}
            mode="date"
            onConfirm={handleConfirmEnd}
            onCancel={hideDatePickerEnd}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ width: "100%" }}
              label="วันที่เริ่มขายบัตร"
              value={ticket_open}
              style={Style.text_input_date}
              onChangeText={(text) => setTicket_open(text)}
              theme={theme}
              disabled
            />
          </View>
          <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
            <TouchableOpacity onPress={() => setDatePickerOpenVisibility(true)}>
              <AntDesign name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerOpenVisible}
            mode="date"
            onConfirm={handleConfirmOpen}
            onCancel={hideDatePickerOpen}
          />
        </View>
        <Text style={Style.text_400_add}>ช่องทางการสั่งซื้อบัตร</Text>
        {ticket !== null ? (
          <View style={Style.picker}>
            <Picker
              selectedValue={selectedTicket}
              style={Style.text_400}
              onValueChange={(itemValue) => ticketPick(itemValue, "ticket")}
            >
              <Picker.Item label="กรุณาเลือกช่องทางการสั่งซื้อบัตร" value="0" />
              {ticket.map((item, index) => {
                return (
                  <Picker.Item
                    value={item.id.toString()}
                    label={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        ) : null}
        {ticketList
          ? ticketList.map((elem, index) => {
              return <View key={index}>{elem}</View>;
            })
          : null}
        <TextInput
          label="ราคาบัตร"
          value={ticket_price}
          style={Style.text_input}
          onChangeText={(text) => setTicketPrice(text)}
          theme={theme}
        />

        <Text style={Style.text_400_add}>สถานที่จัต</Text>
        {venueList !== null ? (
          <View style={Style.picker}>
            <Picker
              selectedValue={venue}
              style={Style.text_400}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVenue(itemValue)
              }
            >
              <Picker.Item label="กรุณาเลือกสถานที่จัด" value="0" />
              {venueList.map((item, index) => {
                return (
                  <Picker.Item
                    value={item.id.toString()}
                    label={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        ) : null}
        <Text style={Style.text_400_add}>ตัวแทนผู้จัด</Text>
        {promoterList !== null ? (
          <View style={Style.picker}>
            <Picker
              selectedValue={promoter}
              style={Style.text_400}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPromoter(itemValue)
              }
            >
              <Picker.Item label="กรุณาเลือกตัวแทนผู้จัด" value="0" />
              {promoterList.map((item, index) => {
                return (
                  <Picker.Item
                    value={item.id.toString()}
                    label={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>
          </View>
        ) : null}
        <View style={{ alignSelf: "center", marginTop: 14, marginBottom: 14 }}>
          <Button mode="contained" onPress={addEvent} style={Style.Add_Button}>
            <Text style={Style.text_400}>เพิ่มข้อมูล</Text>
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
};

const theme = {
  fonts: {
    regular: {
      fontFamily: "Kanit_400Regular",
    },
  },
};
export default EventAdd;

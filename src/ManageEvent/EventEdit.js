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
import {
  TextInput,
  Provider,
  Button,
  Portal,
  Dialog,
  HelperText,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EvAPI } from "./EventAPI";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";

const EventEdit = ({ route, navigation }) => {
  const { selectedEvent } = route.params;
  const [ticket_price_end, setTicketPriceEnd] = useState("");

  const [event_name, setEventName] = useState("");
  const [ticket_price, setTicketPrice] = useState("");
  const [show_day, setShow_day] = useState(null);
  const [ticket_open, setTicket_open] = useState(null);
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
  const [isSquareAdd, setisSquareAdd] = useState(false);
  const [isArtistDel, setisArtistDel] = useState(false);
  const [isTicketDel, setisTicketDel] = useState(false);
  const [artistList, setArtistList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [artistpost, setArtistPost] = useState([]);
  const [ticketpost, setTicketPost] = useState([]);
  const [ticketApi, setTicketApi] = useState(null);
  const [artistApi, setArtistApi] = useState(null);
  const [eventID, setEventID] = useState(0);
  const [follow, setFollow] = useState(0);
  const [index, setindex] = useState(-1);
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

  const Square = ({ id, name, type }) => (
    <View
      style={{
        marginHorizontal: 14,
        height: 50,
        backgroundColor: "#FFF",
        marginTop: 7,
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 1,
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

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      if (isMounted) {
        fetchdata();
        setEventName(selectedEvent.event_name);
        setShow_day(selectedEvent.show_day);
        setTicketPriceEnd(selectedEvent.ticket_price_end);
        setTicket_open(selectedEvent.ticket_open);
        setTicketPrice(selectedEvent.ticket_price);
        setSelectedVenue(selectedEvent.venue);
        setSelectedPromoter(selectedEvent.promoter);
        setArtistPost(selectedEvent.artistpost);
        setTicketPost(selectedEvent.ticketpost);
        setEventID(selectedEvent.id);
        setFollow(selectedEvent.event_follower);
      }
      return () => {
        isMounted = false;
        setArtistPost([]);
        setTicketPost([]);
        setArtistList([]);
        setArtistPost([]);
      };
    }, [])
  );
  useEffect(() => {
    let isMouted = true;
    if (artist !== null && isMouted) {
      selectedEvent.artistpost.map((item) => {
        var result = artist.find((obj) => {
          return obj.id.toString() == item;
        });
        let newartistList = artistList;

        newartistList.push(
          <Square name={result.artist_name_EN} id={item} type={"artist"} />
        );
        setArtistList(newartistList);
      });
    }
    return () => {
      isMouted = false;
    };
  }, [artist]);

  useEffect(() => {
    let isMouted = true;
    if (ticket !== null && isMouted) {
      selectedEvent.ticketpost.map((item) => {
        var result = ticket.find((obj) => {
          return obj.id.toString() == item;
        });
        let newticketList = ticketList;

        newticketList.push(
          <Square name={result.name} id={item} type={"ticket"} />
        );
        setTicketList(newticketList);
      });
    }
    return () => {
      isMouted = false;
    };
  }, [ticket]);

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
      artistpost.indexOf(id);
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
    setisSquareAdd(true);
  };

  const artistPick = (itemValue, type) => {
    setSelectedArtist(itemValue);
    if (itemValue !== "0") {
      if (
        artistpost.indexOf(itemValue) == -1 &&
        artistpost.indexOf(parseInt(itemValue)) == -1
      ) {
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
    }
  };

  const ticketPick = (itemValue, type) => {
    setSelectedTicket(itemValue);
    if (itemValue !== "0") {
      if (
        ticketpost.indexOf(itemValue) == -1 &&
        ticketpost.indexOf(parseInt(itemValue)) == -1
      ) {
        var result = ticket.find((obj) => {
          return obj.id.toString() == itemValue;
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
    }
  };

  const checkComplete = () => {
    if (
      event_name &&
      artistpost.length > 0 &&
      ticketpost.length > 0 &&
      show_day &&
      ticket_open &&
      promoter &&
      venue
    ) {
      return 1;
    } else {
      return 0;
    }
  };
  const editEvent = () => {
    let complete = checkComplete();
    if (artistpost.length == 0) {
      setArtistErr(true);
    } else if (event_name == "") {
      setEventErr(true);
    } else {
      EvAPI.editEvent(
        {
          event_name,
          artistpost,
          ticketpost,
          show_day,
          ticket_open,
          ticket_price,
          promoter,
          venue,
          complete,
          ticket_price_end,
        },
        eventID
      )
        .then((resp) => resp.json())
        .then((resp) => {
          if (show_day !== null) {
            EvAPI.addNoti({
              title: event_name,
              body: "พรุ่งนี้จะถึงวันเริ่มการแสดง " + event_name + "แล้ว",
              event: resp.id,
              date: moment(show_day).subtract(1, "days").format("YYYY-MM-DD"),
            });
          }
          if (ticket_open !== null) {
            EvAPI.addNoti({
              title: event_name,
              body: "พรุ่งนี้จะถึงวันจำหน่ายบัตร " + event_name + "แล้ว",
              event: resp.id,
              date: moment(ticket_open)
                .subtract(1, "days")
                .format("YYYY-MM-DD"),
            });
          }
          showDialog2();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [artistErr, setArtistErr] = useState(false);
  const [eventErr, setEventErr] = useState(false);
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

  return (
    <Provider>
      <Portal>
        <ScrollView style={{ marginHorizontal: 7 }}>
          {/*<Button onPress={test}>test</Button> */}
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Text style={Style.text_400_add}>ศิลปิน</Text>

            {artist !== null ? (
              <View style={[Style.picker]}>
                <Picker
                  selectedValue={selectedArtist}
                  style={Style.text_400}
                  onValueChange={(itemValue) => {
                    artistPick(itemValue, "artist");
                    setArtistErr(false);
                  }}
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
          </View>
          <HelperText type="error" visible={artistErr}>
            กรุณาเลือกศิลปินอย่่างน้อย1คน
          </HelperText>
          <View style={{ backgroundColor: "white", height: 7 }}></View>
          <View style={{ backgroundColor: "#E5E5E5" }}>
            <View style={{ marginLeft: 14, marginTop: 7 }}>
              <Text style={Style.text_400}>ชื่ออีเว้นท์</Text>
            </View>

            <View style={{ marginHorizontal: 7, marginTop: 7 }}>
              <TextInput
                placeholder="ชื่ออีเว้นท์"
                value={event_name}
                style={Style.text_input}
                onChangeText={(text) => {
                  setEventName(text);
                  setEventErr(false);
                }}
                theme={theme}
              />
            </View>
            <HelperText type="error" visible={eventErr}>
              กรุณาระบุข้อมูลชื่ออีเว้นท์
            </HelperText>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View style={{ marginLeft: 14, marginTop: 7 }}>
                  <Text style={Style.text_400}>วันที่เริ่มการแสดง</Text>
                </View>

                <View style={{ marginHorizontal: 7, marginTop: 7 }}>
                  <TextInput
                    placeholder="วันที่เริ่มอีเว้นท์"
                    value={
                      show_day ? moment(show_day).locale("th").format("ll") : ""
                    }
                    style={Style.text_input_date}
                    onChangeText={(text) => setShow_day(text)}
                    theme={theme}
                    disabled
                  />
                </View>
              </View>

              <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
                <TouchableOpacity
                  onPress={() => setDatePickerShowVisibility(true)}
                >
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
          </View>
          <View style={{ backgroundColor: "#E5E5E5", height: 21 }}></View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View style={{ marginLeft: 14, marginTop: 7 }}>
                <Text style={Style.text_400}>วันที่เริ่มขายบัตร</Text>
              </View>

              <View style={{ marginHorizontal: 7, marginTop: 7 }}>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="วันที่เริ่มขายบัตร"
                  value={
                    ticket_open
                      ? moment(ticket_open).locale("th").format("ll")
                      : ""
                  }
                  style={Style.text_input_date}
                  onChangeText={(text) => setTicket_open(text)}
                  theme={theme}
                  disabled
                />
              </View>
            </View>
            <View style={{ marginHorizontal: 14, alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => setDatePickerOpenVisibility(true)}
              >
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
                <Picker.Item
                  label="กรุณาเลือกช่องทางการสั่งซื้อบัตร"
                  value="0"
                />
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
          <View style={{ marginLeft: 14, marginTop: 7 }}>
            <Text style={Style.text_400}>ราคาบัตร</Text>
          </View>

          <View
            style={{ marginHorizontal: 7, marginTop: 7, flexDirection: "row" }}
          >
            <View style={{ flex: 2 }}>
              <TextInput
                placeholder="0000"
                value={ticket_price}
                style={{ width: "100%", height: 50, backgroundColor: "white" }}
                onChangeText={(text) => setTicketPrice(text)}
                theme={theme}
              />
            </View>
            <View
              style={{
                flex: 0.2,
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "black",
                height: 2,
                marginHorizontal: 5,
              }}
            ></View>
            <View style={{ flex: 2 }}>
              <TextInput
                placeholder="9999"
                value={ticket_price_end}
                style={{ width: "100%", height: 50, backgroundColor: "white" }}
                onChangeText={(text) => setTicketPriceEnd(text)}
                theme={theme}
              />
            </View>
          </View>
          <View style={{ backgroundColor: "white", height: 21 }}></View>
          <View style={{ backgroundColor: "#E5E5E5" }}>
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
                        value={item.id}
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
                        value={item.id}
                        label={item.name}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : null}
          </View>
          <View style={{ backgroundColor: "#E5E5E5", height: 21 }}></View>
          <View
            style={{ alignSelf: "center", marginTop: 14, marginBottom: 14 }}
          >
            <Button
              mode="contained"
              onPress={showDialog}
              style={Style.Add_Button}
            >
              <Text style={[Style.text_400, { color: "white" }]}>
                แก้ไขข้อมูล
              </Text>
            </Button>
          </View>
        </ScrollView>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text style={Style.text_300}>ยืนยันการแก้ไขข้อมูล</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={Style.text_300}>
              คุณต้องการแก้ไขข้อมูลอีเว้นท์ใช่ไหม
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
                editEvent();
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

const theme = {
  fonts: {
    regular: {
      fontFamily: "Kanit_400Regular",
    },
  },
};

export default EventEdit;

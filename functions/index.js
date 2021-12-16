const functions = require("firebase-functions");
const fetch = require("node-fetch");
const moment = require("moment");

exports.scheduledFunction = functions
  .region("asia-east2")
  .pubsub.schedule("0 8 * * *")
  .onRun((context) => {
    const today = moment().format("YYYY-MM-DD");
    const dayurl = "http://128.199.116.6/api/notification/?date=" + today;
    fetch(dayurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resp.map((item) => {
          const fwurl = "http://128.199.116.6/api/eventfw/?event=" + item.event;
          fetch(fwurl, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((rsp) => rsp.json())
            .then((rsp) => {
              rsp.map((data) => {
                const userurl =
                  "http://128.199.116.6/api/user/" + data.user + "/";
                fetch(userurl, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                })
                  .then((rs) => rs.json())
                  .then((rs) => {
                    const message = {
                      to: rs.expo_noti,
                      sound: "default",
                      title: item.title,
                      body: item.body,
                      data: { someData: "goes here" },
                    };
                    fetch("https://exp.host/--/api/v2/push/send", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(message),
                    }).then(console.log(message));
                  });
              });
            });
        });
      });

    return null;
  });

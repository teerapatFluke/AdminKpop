export class API {
  static getEventComplete() {
    return fetch("http://192.168.1.4:80/api/event/?complete=0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export class API {
  static getEventComplete() {
    return fetch("http://192.168.1.4:80/api/event/?complete=0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getRequest() {
    return fetch("http://192.168.1.4:80/api/request/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static requestRead(id) {
    return fetch(`http://192.168.1.4:80/api/request/${id}/requestread/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getRequestID(id) {
    return fetch(`http://192.168.1.4:80/api/request/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

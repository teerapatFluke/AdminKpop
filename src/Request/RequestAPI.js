export class API {
  static getEventComplete() {
    return fetch("http://128.199.116.6/api/event/?complete=0&o=-date", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getRequest() {
    return fetch("http://128.199.116.6/api/request/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static requestRead(id) {
    return fetch(`http://128.199.116.6/api/request/${id}/requestread/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getRequestID(id) {
    return fetch(`http://128.199.116.6/api/request/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

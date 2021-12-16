export class API {
  static getReport() {
    return fetch("http://128.199.116.6/api/problem/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static reportRead(id) {
    return fetch(`http://128.199.116.6/api/problem/${id}/problemread/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getReportID(id) {
    return fetch(`http://128.199.116.6/api/problem/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export class AsAPI {
  static addArtist(body) {
    return fetch("http://128.199.116.6/api/artist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static getArtist() {
    return fetch("http://128.199.116.6/api/artist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtistID(id) {
    return fetch(`http://128.199.116.6/api/artist/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static editArtist(id, body) {
    return fetch(`http://128.199.116.6/api/artist/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static deleteArtist(id) {
    return fetch(`http://128.199.116.6/api/artist/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getAmazon() {
    return fetch("http://128.199.116.6/api/amazon/1/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static addChatUrl(id, body) {
    return fetch(`http://128.199.116.6/api/artist/${id}/add_chaturl/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

export class AsAPI {
  static addArtist(body) {
    return fetch("https://kpopevent2.herokuapp.com/api/artist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

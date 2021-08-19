export class AsAPI {
  static addArtist(body) {
    return fetch(`http://127.0.0.1:8000/api/artist/`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        //Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }
}

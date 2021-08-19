export class AsAPI {
  static addArtist(body) {
    return fetch(`https://kpopevent2.herokuapp.com/api/artist/`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        //Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

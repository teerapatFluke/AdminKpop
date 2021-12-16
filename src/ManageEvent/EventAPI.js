export class EvAPI {
  static addTicket(body) {
    return fetch("http://128.199.116.6/api/ticket/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static getTicket() {
    return fetch("http://128.199.116.6/api/ticket/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static editTicket(body, id) {
    return fetch(`http://128.199.116.6/api/ticket/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static deleteTicket(id) {
    return fetch(`http://128.199.116.6/api/ticket/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static addVenue(body) {
    return fetch("http://128.199.116.6/api/venue/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static getVenue() {
    return fetch("http://128.199.116.6/api/venue/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static editVenue(body, id) {
    return fetch(`http://128.199.116.6/api/venue/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static deleteVenue(id) {
    return fetch(`http://128.199.116.6/api/venue/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static addPromoter(body) {
    return fetch("http://128.199.116.6/api/promoter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  static getPromoter() {
    return fetch("http://128.199.116.6/api/promoter/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static editPromoter(body, id) {
    return fetch(`http://128.199.116.6/api/promoter/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static deletePromoter(id) {
    return fetch(`http://128.199.116.6/api/promoter/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
  static addEvent(body) {
    return fetch("http://128.199.116.6/api/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static addEventArtist(body) {
    return fetch("http://128.199.116.6/api/artistev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static addEventTicket(body) {
    return fetch("http://128.199.116.6/api/ticketev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static getEvent() {
    return fetch("http://128.199.116.6/api/event/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static editEvent(body, id) {
    return fetch(`http://128.199.116.6/api/event/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static addNoti(body) {
    return fetch(`http://128.199.116.6/api/notification/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  static deleteEvent(id) {
    return fetch(`http://128.199.116.6/api/event/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static getArtisFW(artist) {
    return fetch(`http://128.199.116.6/api/artistfw/?artist=${artist}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static postEventFw(body) {
    return fetch(`http://128.199.116.6/api/eventfw/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

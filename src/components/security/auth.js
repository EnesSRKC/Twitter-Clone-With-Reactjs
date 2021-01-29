import alertify from "alertifyjs";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  signin(user, cb) {
    let reqOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch("https://socialmediaapinodejs.herokuapp.com/signin", reqOptions)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || res.status;

          return Promise.reject(error);
        }
        alertify.success(data.message);
        cb(data.token, user.username);
      })
      .catch((err) => {
        err.message === "Failed to fetch"
          ? alertify.error("Yanıt alınamadı..")
          : alertify.error(err);
        cb(null);
      });
  }

  signout(callback) {
    this.authenticated = false;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();

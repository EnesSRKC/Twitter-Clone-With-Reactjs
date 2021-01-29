import React, { Component } from "react";
import alertify from "alertifyjs";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      name: "",
      isValidEmail: null,
      email: "",
      day: 0,
      month: 0,
      year: 0,
      username: "",
      password: "",
      repassword: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  signupBackHandler() {
    let page1 = document.getElementById("signup-page-one");
    let page2 = document.getElementById("signup-page-two");

    let exitButton = document.getElementById("signup-exit");
    let backButton = document.getElementById("signup-back");
    let routes = document.getElementsByClassName("signup-route");

    page2.style.display = "none";
    page1.style.display = "block";

    routes[0].classList.add("signup-route-selected");
    routes[1].classList.remove("signup-route-selected");

    exitButton.style.display = "block";
    backButton.style.display = "none";

    let fwBtn = document.getElementById("signup-nextButton");
    fwBtn.style.visibility = "visible";
  }

  signupExitHandler() {
    let signup = document.getElementById("signup-page");
    signup.style.transform = "translateY(-100vh)";
    signup.style.visibility = "hidden";
  }

  signupForwardHandler() {
    let page1 = document.getElementById("signup-page-one");
    let page2 = document.getElementById("signup-page-two");

    let routes = document.getElementsByClassName("signup-route");

    let exitButton = document.getElementById("signup-exit");
    let backButton = document.getElementById("signup-back");

    page1.style.display = "none";
    page2.style.display = "block";
    routes[0].classList.remove("signup-route-selected");
    routes[1].classList.add("signup-route-selected");

    exitButton.style.display = "none";
    backButton.style.display = "block";

    let fwBtn = document.getElementById("signup-nextButton");
    fwBtn.style.visibility = "hidden";
  }

  inputFocusHandler(i) {
    let inputContainers = document.getElementsByClassName(
      "signup-input-container"
    );
    if (inputContainers[i].className === "signup-input-container") {
      inputContainers[i].className =
        "signup-input-container signup-novalid-container";
      inputContainers[i].childNodes[0].className =
        "signup-input-text signup-novalid-input-text";
    }
  }

  onChangeHandler(e, inputNumber) {
    let inputContainers = document.getElementsByClassName(
      "signup-input-container"
    );

    //Name input
    if (e.target.value.length <= 50 && inputNumber === 0) {
      this.setState((state) => ({
        name: e.target.value,
      }));

      if (e.target.value === "") {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      }
    }

    //Email input
    if (inputNumber === 1) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let email = e.target.value;

      if (!re.test(email)) {
        this.setState((state) => ({ isValidEmail: false }));

        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      } else {
        this.setState((state) => ({ isValidEmail: true, email: email }));

        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      }
    }

    //Day input
    if (inputNumber === 2) {
      let day = parseInt(e.target.value);
      this.setState((state) => ({ day: day }));
      if (day !== 0) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      }
    }

    //Month input
    if (inputNumber === 3) {
      let month = parseInt(e.target.value);
      this.setState((state) => ({ month: month }));
      if (month !== 13) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      }
    }

    //Year input
    if (inputNumber === 4) {
      let year = parseInt(e.target.value);
      this.setState((state) => ({ year: year }));
      if (year !== 0) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      }
    }

    //Username input
    if (inputNumber === 5) {
      this.setState((state) => ({
        username: e.target.value,
      }));

      if (e.target.value.length < 6) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      }
    }

    //Password input
    if (inputNumber === 6) {
      this.setState((state) => ({
        password: e.target.value,
      }));

      if (e.target.value.length <= 6 || e.target.value > 16) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      }
    }

    //Repassword input
    if (inputNumber === 7) {
      this.setState((state) => ({ repassword: e.target.value }));

      if (e.target.value !== this.state.password) {
        inputContainers[inputNumber].className =
          "signup-input-container signup-invalid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-invalid-input-text";
      } else {
        inputContainers[inputNumber].className =
          "signup-input-container signup-valid-container";
        inputContainers[inputNumber].childNodes[0].className =
          "signup-input-text signup-valid-input-text";
      }
    }
  }

  submitHandler(event) {
    event.preventDefault();

    let valids = document.querySelectorAll("form .signup-valid-container");
    let inputsLength = document.getElementsByClassName("signup-input-container")
      .length;

    if (valids.length !== inputsLength) {
      alertify.error("Lütfen tüm alanları belirtilen şekilde doldurunuz..");
      return;
    }

    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;

    let birthday = new Date(year, month, day);

    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      name: this.state.name,
      birthday: birthday,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch("https://socialmediaapinodejs.herokuapp.com/signup", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        alertify.success(data.message);

        this.setState((state) => ({
          userId: data.createdUser._id,
        }));

        
      })
      .catch((error) => {
        alertify.error("Hata oluştu: " + error);
        console.error("There was an error!", error);
      });
  }

  render() {
    var days = [];
    var years = [];

    for (let i = 1; i < 32; i++) {
      days.push(i);
    }

    var currentYear = new Date().getFullYear();
    for (let j = 1970; j < currentYear; j++) {
      years.push(j);
    }

    return (
      <div id="signup-page">
        {this.state.userId && <Redirect to="/signin" />}

        <div id="signup-container">
          <div id="signup-header">
            <button
              id="signup-exit"
              className="signup-back-button"
              onClick={() => this.signupExitHandler()}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              id="signup-back"
              className="signup-back-button"
              onClick={() => this.signupBackHandler()}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div id="signup-logo">
              <i className="fas fa-snowflake"></i>
            </div>
            <button
              id="signup-nextButton"
              className="signup-next-button"
              onClick={() => this.signupForwardHandler()}
            >
              İleri
            </button>
          </div>
          <div id="signup-text">Hesabını oluştur</div>

          <form onSubmit={this.submitHandler}>
            <div id="signup-page-one">
              <div className="signup-input-box">
                <div className="signup-input-container">
                  <div className="signup-input-text">İsim ve Soyisim</div>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    maxLength="50"
                    onFocus={() => this.inputFocusHandler(0)}
                    onChange={(e) => this.onChangeHandler(e, 0)}
                  />
                </div>
                <div className="signup-message">
                  <div className="signup-check-length">
                    {this.state.name.length}/50
                  </div>
                </div>
              </div>

              <div className="signup-input-box">
                <div className="signup-input-container">
                  <div className="signup-input-text">E-posta</div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    onFocus={() => this.inputFocusHandler(1)}
                    onChange={(e) => this.onChangeHandler(e, 1)}
                  />
                </div>
                <div className="signup-message">
                  {this.state.isValidEmail === false ? (
                    <div className="signup-invalid">
                      <span>{String.fromCharCode("10005")}</span>Geçersiz email
                      adresi
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="signup-input-box">
                <div className="signup-select-box">
                  <div className="signup-input-container">
                    <div className="signup-input-text">Gün</div>
                    <select
                      defaultValue=""
                      name="birth-day"
                      id="birth-day"
                      onFocus={() => this.inputFocusHandler(2)}
                      onChange={(e) => this.onChangeHandler(e, 2)}
                    >
                      <option value="0"></option>
                      {days.map((day) => {
                        return (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="signup-input-container">
                    <div className="signup-input-text">Ay</div>
                    <select
                      defaultValue=""
                      name="birth-month"
                      id="birth-month"
                      onFocus={() => this.inputFocusHandler(3)}
                      onChange={(e) => this.onChangeHandler(e, 3)}
                    >
                      <option value="13"></option>
                      <option key={0} value="0">
                        Ocak
                      </option>
                      <option key={1} value="1">
                        Şubat
                      </option>
                      <option key={2} value="2">
                        Mart
                      </option>
                      <option key={3} value="3">
                        Nisan
                      </option>
                      <option key={4} value="4">
                        Mayıs
                      </option>
                      <option key={5} value="5">
                        Haziran
                      </option>
                      <option key={6} value="6">
                        Temmuz
                      </option>
                      <option key={7} value="7">
                        Ağustos
                      </option>
                      <option key={8} value="8">
                        Eylül
                      </option>
                      <option key={9} value="9">
                        Ekim
                      </option>
                      <option key={10} value="10">
                        Kasım
                      </option>
                      <option key={11} value="11">
                        Aralık
                      </option>
                    </select>
                  </div>
                  <div className="signup-input-container">
                    <div className="signup-input-text">Yıl</div>
                    <select
                      defaultValue=""
                      name="birth-year"
                      id="birth-year"
                      onFocus={() => this.inputFocusHandler(4)}
                      onChange={(e) => this.onChangeHandler(e, 4)}
                    >
                      <option value="0"></option>
                      {years.map((year) => {
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="signup-message"></div>
              </div>
            </div>

            <div id="signup-page-two">
              <div className="signup-input-box">
                <div className="signup-input-container">
                  <div className="signup-input-text">Kullanıcı Adı</div>
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    minLength="6"
                    maxLength="16"
                    onFocus={() => this.inputFocusHandler(5)}
                    onChange={(e) => this.onChangeHandler(e, 5)}
                  />
                </div>
                {/* <div className="signup-message">
                                    <div className="signup-valid"><span>{String.fromCharCode("10003")}</span>Geçerli/Your Message</div>
                                    <div className="signup-invalid"><span>{String.fromCharCode("10005")}</span>Geçersiz/Your Message</div>
                                </div> */}
                {this.state.username.length < 6 && (
                  <div className="signup-invalid">
                    <span>{String.fromCharCode("10005")}</span>Kullanıcı adınız
                    en az 6, en fazla 16 karakter uzunluğunda olmalıdır.
                  </div>
                )}
              </div>
              <div className="signup-input-box">
                <div className="signup-input-container">
                  <div className="signup-input-text">Şifre</div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    maxLength="16"
                    onFocus={() => this.inputFocusHandler(6)}
                    onChange={(e) => this.onChangeHandler(e, 6)}
                  />
                </div>
                <div className="signup-message">
                  {this.state.password.length <= 6 ||
                  this.state.password.length > 16 ? (
                    <div className="signup-invalid">
                      <span>{String.fromCharCode("10005")}</span>Şifreniz en az
                      6, en fazla 16 karakter uzunluğunda olmalıdır.
                    </div>
                  ) : (
                    <div className="signup-valid">
                      <span>{String.fromCharCode("10003")}</span>Geçerli şifre
                    </div>
                  )}
                </div>
              </div>
              <div className="signup-input-box">
                <div className="signup-input-container">
                  <div className="signup-input-text">Şifre Tekrarı</div>
                  <input
                    type="password"
                    name="repassword"
                    autoComplete="off"
                    maxLength="25"
                    onFocus={() => this.inputFocusHandler(7)}
                    onChange={(e) => this.onChangeHandler(e, 7)}
                  />
                </div>
                <div className="signup-message">
                  {this.state.password === this.state.repassword &&
                  this.state.password.length !== 0 ? (
                    <div className="signup-valid">
                      <span>{String.fromCharCode("10003")}</span>Geçerli
                    </div>
                  ) : (
                    <div className="signup-invalid">
                      <span>{String.fromCharCode("10005")}</span>Şifreniz
                      eşleşmiyor
                    </div>
                  )}
                </div>
              </div>
              <input type="submit" className="signin-button" value="Kaydol" />
            </div>
          </form>

          <div id="signup-page-route">
            <div className="signup-route signup-route-selected"></div>
            <div className="signup-route"></div>
          </div>
        </div>
      </div>
    );
  }
}

function profileTabs(e, tabIndex) {
  var tabButtons = document.getElementsByClassName("profile-main-tablinks");

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  tabButtons[tabIndex].className = "profile-main-tablinks active";

  var tabContents = document.getElementsByClassName("profile-main-tabcontent");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  tabContents[tabIndex].style.display = "block";
}


function notifSettingsToggle(e, notifIndex) {
  var settingsBoxes = document.getElementsByClassName(
    "notification-settings-collapse"
  );
  settingsBoxes[notifIndex].classList.toggle("settings-active");
}

function notifTabChange(tabIndex) {
  var tabButtons = document.getElementsByClassName("notification-header");
  for (let index = 0; index < tabButtons.length; index++) {
    const element = tabButtons[index];
    element.classList.remove("notification-header-active");
  }
  tabButtons[tabIndex].classList.add("notification-header-active");

  var tabs = document.getElementsByClassName("notification-tab");
  for (let index = 0; index < tabs.length; index++) {
    const element = tabs[index];
    element.style.display = "none";
  }
  tabs[tabIndex].style.display = "block";
}

function mesInputFocusHandler() {
  var inputContainer = document.getElementById("main-messages-search");
  var inputIcon = document.getElementById("main-messages-search-icon");

  var input = document.getElementById("main-messages-search-input");

  input.addEventListener("focus", () => {
    inputContainer.classList.add("focused");
    inputIcon.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    inputContainer.classList.remove("focused");
    inputIcon.classList.remove("focused");
  });
}

function messageActiveChange(msgIndex) {
  var sticks = document.getElementsByClassName("main-messages-user-stick");

  for (let i = 0; i < sticks.length; i++) {
    sticks[i].classList.remove("active");
  }

  sticks[msgIndex].classList.add("active");
}




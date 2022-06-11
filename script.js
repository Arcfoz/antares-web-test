function darkmode() {
  dark_Mode = localStorage.getItem("dark-mode");
  const element = document.querySelector(".darklight");
  const sec = document.querySelector(".sec");
  const toggle = document.querySelector(".toggle");
  sec.classList.toggle("dark");
  if (element.innerHTML === "Dark") {
    element.innerHTML = "Light";
  } else {
    element.innerHTML = "Dark";
  }
  if (dark_Mode !== "enable") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

let dark_Mode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "enable");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", null);
};

if (dark_Mode === "enable") {
  document.querySelector(".sec").classList.toggle("dark");
}

var data = {};
const timeout = setTimeout(datajson, 2000);
const link = "http://localhost/api";

setInterval(function () {
  fetch(link)
    .then((hasil) => hasil.json())
    .then((res) => {
      // console.log(res);
      data = res;
      // console.log(data);
      document.getElementById("suhu").innerHTML = res.temperature.toString() + "°C";
      document.getElementById("kelembaban").innerHTML = res.humidity.toString() + "%";
      if (data.lampu == 1) {
        document.getElementById("lampu").innerHTML = value = "ON";
        document.getElementById("switchlampu").checked = true;
        data.lampu == 1
      } else {
        document.getElementById("lampu").innerHTML = value = "OFF";
        document.getElementById("switchlampu").checked = false;
        data.lampu == 0
      }
      if (res.kipas == 1) {
        document.getElementById("kipas").innerHTML = value = "ON";
        document.getElementById("switchkipas").checked = true;
      } else {
        document.getElementById("kipas").innerHTML = value = "OFF";
        document.getElementById("switchkipas").checked = false;
      }
    });
}, 1000);

function datajson() {
  console.log(data);
}

function nilailampu(value) {
  if (value == true) {
    value = "ON";
    data.lampu = 1;
  } else {
    value = "OFF";
    data.lampu = 0;
  }
  document.getElementById("lampu").innerHTML = value;
}

function nilaikipas(value) {
  if (value == true) {
    value = "ON";
    data.kipas = 1;
  } else {
    value = "OFF";
    data.kipas = 0;
  }
  document.getElementById("kipas").innerHTML = value;
}

const postBtnlampu = document.getElementById("switchlampu");
postBtnlampu.addEventListener("click", postInfolampu);

function postInfolampu() {
  const res = fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: data,
    }),
  });
}

const postBtnkipas = document.getElementById("switchkipas");
postBtnkipas.addEventListener("click", postInfokipas);

function postInfokipas() {
  const res = fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: data,
    }),
  });
}

setInterval(function () {
  console.log(data);
}, 100);

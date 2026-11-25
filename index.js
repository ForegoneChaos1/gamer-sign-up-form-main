const op = document.querySelector(".opname");

const callSign = document.getElementById("callsign");
const mail = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("confirm-password");

const checkbox = document.querySelector(".terms-checkbox");

const userReq = document.querySelector(".user");
const emailReq = document.querySelector(".mail");
const termReq = document.querySelector(".term");
const passReq = document.querySelector(".passw");
const confPassReq = document.querySelector(".confpassw")

const callSignWarning = document.querySelector(".callsignwarn");
const emailWarning = document.getElementById("emailwarn")

const eye = document.querySelectorAll(".eye");
const confeye = document.querySelectorAll(".eye-conf");

const lines = document.querySelector(".lines");
const stats = document.querySelector(".status");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

callSign.addEventListener("input", () => {
  if (callSign.value.length >= 3) {
    op.textContent = callSign.value;
    op.style.color = "hsl(208 49% 92%)";
    userReq.textContent = "OK";
    userReq.style.color = "hsl(211 18% 68%)";
    lines.style.width = "100%";
    userReq.style.width = "5%";
    callSignWarning.innerHTML = `3-20 characters: letters, numbers, _ or -`;
    callSignWarning.style.color = "hsl(210 18% 42%)";
  } else {
    op.textContent = "UNASSIGNED";
    op.style.color = "hsl(210 18% 42%)";
    userReq.textContent = "TOO SHORT";
    userReq.style.color = "hsl(4 100% 74%)";
    lines.style.width = "85%";
    userReq.style.width = "15%";
    callSignWarning.innerHTML = `<img src="./assets/images/icon-alert.svg">  Use at least 3 characters`;
    callSignWarning.style.color = "hsl(4 100% 74%)";
  }
});

mail.addEventListener("input", (event) => {
  const email = mail.value.trim();
  if (emailRegex.test(email)) {
    emailReq.textContent = "OK";
    emailReq.style.color = "hsl(211 18% 68%)";
    lines.style.width = "100%";
    emailReq.style.width = "5%";
    emailWarning.style.display = "none"
  } else {
    emailReq.textContent = "malformed";
    emailReq.style.color = "hsl(4 100% 74%)";
    lines.style.width = "85%";
    emailReq.style.width = "15%";
    emailWarning.style.display = "flex";
  }
});

password.addEventListener("input", (event) =>{
  if (password.value.length >= 8) {
    passReq.textContent = "OK";
    lines.style.width = "100%";
    passReq.style.width = "5%";
    passReq.style.color = "hsl(211 18% 68%)";
  } else {
    passReq.textContent = "TOO SHORT";
    passReq.style.color = "hsl(4 100% 74%)";
    lines.style.width = "83%";
    passReq.style.width = "17%";
  }
})

confPassword.addEventListener("input", (event) =>{
  if (confPassword.value = password.value) {
    confPassReq.textContent = "OK";
    confPassReq.style.color = "hsl(211 18% 68%)";
  } else {
    confPassReq.textContent = "mismatch";
    confPassReq.style.color = "hsl(4 100% 74%)";
  }
})

eye.forEach((card) => {
  card.addEventListener("click", (event) => {
    const childImg = event.currentTarget.querySelector("img");
    if (!childImg) return;

    const currentSrc = childImg.src;

    childImg.src = childImg.dataset.altSrc;
    childImg.dataset.altSrc = currentSrc;
  });
});

confeye.forEach((card) => {
  card.addEventListener("click", (event) => {
    const childImg = event.currentTarget.querySelector("img");
    if (!childImg) return;

    const currentSrc = childImg.src;

    childImg.src = childImg.dataset.altSrc;
    childImg.dataset.altSrc = currentSrc;
  });
});

function myFunction() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function myFunctionConf() {
  if (confPassword.type === "password") {
    confPassword.type = "text";
  } else {
    confPassword.type = "password";
  }
}

checkbox.addEventListener("change", (event) => {
  if (event.target.checked) {
    termReq.textContent = "OK";
    termReq.style.color = "hsl(211 18% 68%)";
  } else {
    termReq.textContent = "required";
    termReq.style.color = "hsl(210 18% 42%)";
  }
});

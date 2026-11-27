const op = document.querySelector(".opname");
const form = document.querySelector("form");

const callSign = document.getElementById("callsign");
const mail = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("confirm-password");
const checkbox = document.querySelector(".terms-checkbox");

const userReq = document.querySelector(".user");
const emailReq = document.querySelector(".mail");
const termReq = document.querySelector(".term");
const passReq = document.querySelector(".passw");
const confPassReq = document.querySelector(".confpassw");

const callSignWarning = document.querySelector(".callsignwarn");
const emailWarning = document.getElementById("emailwarn");
const confPassWarn = document.getElementById("confpasswarn");
const termsWarn = document.getElementById("termswarn");

const eye = document.querySelectorAll(".eye");
const confeye = document.querySelectorAll(".eye-conf");

const levelBars = document.querySelectorAll(".pass .pass-levels div");
const passHint = document.querySelector(
  '.pass .pass-levels + label[for="password"]',
);
const passStrength = document.querySelector(".pass-strength");
const passLine = document
  .querySelectorAll(".requirement")[2]
  .querySelector(".lines");

const callCheck = document.querySelector(".call .call-check");
const emailCheck = document.querySelector(".elecmail .email-check");
const passCheck = document.querySelector(".pass .pass-check");
const confPassCheck = document.querySelector(".confpass .confpass-check");

const lines = document.querySelector(".lines");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submitBtn = document.querySelector(".submit-btn");
const defaultBtnText = submitBtn.textContent;

const handshakeComplete = document.getElementById("handshake-complete");
const provisionedCallsign = document.getElementById("provisioned-callsign");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!checkbox.checked) {
    termsWarn?.classList.add("is-visible");
    return;
  }

  termsWarn?.classList.remove("is-visible");
  submitBtn.disabled = true;
  submitBtn.textContent = "TRANSMITTING_";
  submitBtn.classList.add("is-transmitting");

  setTimeout(() => {
    form.hidden = true;
    if (provisionedCallsign) {
      provisionedCallsign.textContent = callSign.value.trim();
    }
    lockStatusRows();
    if (handshakeComplete) {
      handshakeComplete.hidden = false;
    }
  }, 700);
});

callSign.addEventListener("input", () => {
  if (callSign.value.length >= 3) {
    op.textContent = callSign.value;
    op.style.color = "hsl(208 49% 92%)";
    userReq.textContent = "OK";
    userReq.style.color = "hsl(211 18% 68%)";
    lines.style.width = "100%";
    userReq.style.width = "auto";
    callSignWarning.innerHTML = `3-20 characters: letters, numbers, _ or -`;
    callSignWarning.style.color = "hsl(210 18% 42%)";
    callCheck.classList.add("is-visible");
  } else {
    op.textContent = "UNASSIGNED";
    op.style.color = "hsl(210 18% 42%)";
    userReq.textContent = "TOO SHORT";
    userReq.style.color = "hsl(4 100% 74%)";
    lines.style.width = "100%";
    userReq.style.width = "auto";
    callSignWarning.innerHTML = `<img src="./assets/images/icon-alert.svg">  Use at least 3 characters`;
    callSignWarning.style.color = "hsl(4 100% 74%)";
    callCheck.classList.remove("is-visible");
  }
  updateReadyCounter();
});

mail.addEventListener("input", (event) => {
  const email = mail.value.trim();
  if (emailRegex.test(email)) {
    emailReq.textContent = "OK";
    emailReq.style.color = "hsl(211 18% 68%)";
    lines.style.width = "100%";
    emailReq.style.width = "auto";
    emailWarning.style.display = "none";
    emailCheck.classList.add("is-visible");
  } else {
    emailReq.textContent = "malformed";
    emailReq.style.color = "hsl(4 100% 74%)";
    lines.style.width = "100%";
    emailReq.style.width = "auto";
    emailWarning.style.display = "flex";
    emailCheck.classList.remove("is-visible");
  }
  updateReadyCounter();
});

password.addEventListener("input", (event) => {
  const val = password.value;
  const hasMinLen = val.length >= 8;
  const hasNumber = /\d/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);

  let level = 0;
  let label = "";
  let color = "hsl(210 18% 28%)";

  if (val.length === 0) {
    level = 0;
  } else if (!hasMinLen) {
    level = 1;
    label = "WEAK";
    color = "hsl(4 100% 74%)";
  } else if (hasMinLen && hasNumber && hasSpecial) {
    level = 4;
    label = "STRONG";
    color = "hsl(75 100% 50%)";
  } else if (hasMinLen && hasNumber) {
    level = 3;
    label = "GOOD";
    color = "hsl(75 100% 50%)";
  } else {
    level = 2;
    label = "FAIR";
    color = "hsl(38 100% 58%)";
  }

  levelBars.forEach((bar, i) => {
    bar.style.backgroundColor = i < level ? color : "hsl(210 18% 28%)";
  });

  passStrength.textContent = label;
  passStrength.style.color = color;

  if (val.length > 0 && !hasMinLen) {
    passHint.innerHTML = `<img src="./assets/images/icon-alert.svg" alt=""> Use at least 8 characters`;
    passHint.style.color = "hsl(4 100% 74%)";
  } else {
    passHint.textContent = "At least 8 characters";
    passHint.style.color = "hsl(210 18% 42%)";
  }

  if (level === 4) {
    passReq.textContent = "OK";
    passReq.style.color = "hsl(211 18% 68%)";
    passLine.style.width = "100%";
    passReq.style.width = "auto";
    passCheck.classList.add("is-visible");
  } else {
    passCheck.classList.remove("is-visible");

    if (val.length > 0 && !hasMinLen) {
      passReq.textContent = "too short";
      passReq.style.color = "hsl(4 100% 74%)";
      passLine.style.width = "100%";
      passReq.style.width = "auto";
    } else {
      passReq.textContent = "pending";
      passReq.style.color = "hsl(210 18% 42%)";
      passLine.style.width = "100%";
      passReq.style.width = "auto";
    }
  }
  if (confPassword.value.length > 0) {
    validateConfirmPassword();
    updateReadyCounter();
  }
});

confPassword.addEventListener("input", (event) => {
  if (password.value.length > 0 && confPassword.value === password.value) {
    confPassReq.textContent = "OK";
    confPassReq.style.color = "hsl(211 18% 68%)";
    confPassCheck.classList.add("is-visible");
  } else {
    confPassReq.textContent = "mismatch";
    confPassReq.style.color = "hsl(4 100% 74%)";
    confPassCheck.classList.remove("is-visible");
  }
  validateConfirmPassword();
  updateReadyCounter();
});

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

function validateConfirmPassword() {
  const confVal = confPassword.value;
  const passVal = password.value;

  if (confVal.length === 0) {
    confPassWarn.classList.remove("is-visible");
    confPassReq.textContent = "pending";
    confPassReq.style.color = "hsl(210 18% 42%)";
  } else if (passVal.length > 0 && confVal === passVal) {
    confPassWarn.classList.remove("is-visible");
    confPassReq.textContent = "OK";
    confPassReq.style.color = "hsl(211 18% 68%)";
  } else {
    confPassWarn.classList.add("is-visible");
    confPassReq.textContent = "mismatch";
    confPassReq.style.color = "hsl(4 100% 74%)";
  }
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    termReq.textContent = "OK";
    termReq.style.color = "hsl(211 18% 68%)";
    termsWarn?.classList.remove("is-visible");
  } else {
    termReq.textContent = "required";
    termReq.style.color = "hsl(4 100% 74%)";
  }

  updateReadyCounter();
});

const readyCountEl = document.querySelector(".op span");
const statusElements = [userReq, emailReq, passReq, confPassReq, termReq];

function updateReadyCounter() {
  const readyCount = statusElements.filter(
    (el) => el && el.textContent.trim().toUpperCase() === "OK",
  ).length;

  console.log(
    "Statuses:",
    statusElements.map((el) => el && el.textContent.trim()),
    "Ready:",
    readyCount,
  );

  if (!readyCountEl) return;

  readyCountEl.textContent = `${readyCount}/5 READY`;
  readyCountEl.style.color =
    readyCount === statusElements.length ? "hsl(77 66% 56%)" : "";
}

function lockStatusRows() {
  if (readyCountEl) {
    readyCountEl.textContent = "PROVISIONED";
    readyCountEl.style.color = "hsl(77 66% 56%)";
  }

  statusElements.forEach((element) => {
    if (!element) return;
    element.textContent = "LOCKED";
    element.style.color = "hsl(204 60% 97%)";
  });
}

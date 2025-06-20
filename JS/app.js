import { languages_data } from "./language.js";

const currentLanguage = document.getElementById("current--language");
const contactBtn = document.querySelector(".contact");
const languageSelectionList = document.getElementById(
  "language--selection--list"
);
const languages = document.querySelectorAll(".languages");

const about = document.getElementById("about");
const skills = document.getElementById("skills");
const services = document.getElementById("services");
const contact = document.getElementById("contact");
const mainTitle = document.getElementById("mainTitle");
const miniTitle = document.getElementById("miniTitle");
const mainText = document.getElementById("mainText");
const myRole = document.getElementById("role");
const burger = document.getElementById("mobile--burger");
const burger_icon = document.querySelector(".mobile_burger--icon");
const header_list = document.querySelector(".header__list");

let hideTimeOut;
let currentLang;

// Tillar menyusini ko‘rsatish va avtomatik yopish
currentLanguage.addEventListener("click", () => {
  languageSelectionList.style.transform = "scale(1)";
  clearTimeout(hideTimeOut);
  hideTimeOut = setTimeout(() => {
    languageSelectionList.style.transform = "scale(0)";
  }, 3000);
});

// Random role va miniTitle ni yangilovchi funksiya
function RandomRoleFun(lang) {
  const roles = languages_data[lang].miniTitleRandomHalf;
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  myRole.textContent = randomRole;
  miniTitle.textContent = languages_data[lang].miniTitle + " " + randomRole;
}

// Sahifadagi matnlarni yangilovchi funksiya
const changeLangFun = (lang) => {
  currentLang = lang;
  about.textContent = languages_data[lang].nav.about;
  skills.textContent = languages_data[lang].nav.skills;
  services.textContent = languages_data[lang].nav.services;
  contact.textContent = languages_data[lang].nav.contact;
  mainTitle.textContent = languages_data[lang].mainTitle;
  mainText.textContent = languages_data[lang].mainText;
  contactBtn.textContent = languages_data[lang].nav.contact;

  RandomRoleFun(currentLang);
};

// Til tanlanganda ishlovchi kod
languages.forEach((language) => {
  const lang = language.dataset.lang;
  language.addEventListener("click", () => {
    currentLanguage.textContent = language.textContent;
    localStorage.setItem("selectedLang", lang);
    languageSelectionList.style.transform = "scale(0)";
    clearTimeout(hideTimeOut);
    changeLangFun(lang);
  });
});

// Sahifa yuklanganda default yoki saqlangan tilni yuklash
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLang");

  if (savedLang && languages_data[savedLang]) {
    const selectedLanguageElement = Array.from(languages).find(
      (language) => language.dataset.lang === savedLang
    );
    if (selectedLanguageElement) {
      currentLanguage.textContent = selectedLanguageElement.textContent;
    }
    changeLangFun(savedLang);
  } else {
    currentLanguage.textContent = "EN 🇬🇧";
    changeLangFun("EN");
  }
});

// Har 2 soniyada Random Role yangilanadi
setInterval(() => {
  if (currentLang) {
    RandomRoleFun(currentLang);
  }
}, 5000);

let isMenuOpen = false;

window.addEventListener("resize", function () {
  if (this.window.innerWidth > 768) {
    header_list.style.height = 26 + "px";
    header_list.style.overflow = "hidden";
  } else {
    header_list.style.height = 0;
    burger_icon.style.transform = "rotate(0deg)";
    isMenuOpen = false;
  }
});

function openMenu() {
  header_list.style.height = 1 + "px";
  header_list.style.overflow = "auto";
  header_list.style.transition = "all 300ms";
  burger_icon.style.transition = "all 300ms";
  if (!isMenuOpen) {
    console.log(header_list.scrollHeight);
    burger_icon.style.transform = "rotate(180deg)";
    header_list.style.height = header_list.scrollHeight + "px";
    console.log(header_list.scrollHeight);
    isMenuOpen = true;
  } else {
    header_list.style.height = 0 + "px";
    burger_icon.style.transform = "rotate(0deg)";
    isMenuOpen = false;
  }
}

burger.addEventListener("click", openMenu);

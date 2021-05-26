//import css from "./main.css";
import scss from "./sass/main.scss";
import { crumbs } from "./crumbs";
// import { options } from './config';

const body = document.querySelector("body");

body.insertAdjacentHTML('afterbegin', `
  <div class="lightbox hidden" style="display: none;">
    <div class="lightbox-content">
      <div class="close-btn"></div>
      <div class="logo">
        <img src="${options.logoURL}" />
      </div>
      <div class="container-image">
        <img src="${options.imageURL}" />
      </div>
      <div class="container-form">
        <h1>${options.title}</h1>
        <p>${options.paragraph}</p>
        <form action="https://act.amnestyusa.org/page/9082/subscribe/1?ac=LIGHTBOXBUTTON" method="get">
          <input name="supporter.firstName" type="text" placeholder="First Name" id="lightbox-first-name" role="input">
          <input name="supporter.emailAddress" type="text" placeholder="Email" id="lightbox-email" role="input">
          <button id="lightbox-submit" type="submit" value="Act Now" role="input">${options.button}</button>
        </form>
        <p class="italic">${options.info}</p>
      </div>
    </div>
  </div>`
);

const lightbox = document.querySelector(".lightbox");
const hideSignUpForm = !!parseInt(crumbs.get(options.cookie_name)); // Get cookie

const setLightbox = () => {

  if (lightbox && !hideSignUpForm) {
    crumbs.set(options.cookie_name, 0, {
      type: "day",
      value: 1,
    });
  }

  if (!lightbox || !isBetweenDates() || isBlacklisted() || !isWhitelisted() || hideSignUpForm) {
    return;
  }

  const lightBoxClose = document.querySelector(".close-btn");
  lightBoxClose && lightBoxClose.addEventListener('click', closeLightbox);

  const submitBtn = document.querySelector("#lightbox-submit");
  submitBtn && submitBtn.addEventListener('click', () => {
    crumbs.set(options.cookie_name, 1, {
      type: "month",
      value: 12,
    }); // Create one year cookie
  });

  setTimeout(function(){ 
    lightbox.style.display = "flex";
  }, (options.trigger-100));

  setTimeout(function(){ 
    lightbox.classList.remove("hidden");
    lightbox.classList.add("visible");
    body.style.overflow = "hidden";
  }, options.trigger);

  lightbox.addEventListener('transitionend', () => {
    if (lightbox.classList.contains("hidden")) {
      lightbox.style.display = "none";
    }
    if (lightbox.classList.contains("visible")) {
      lightbox.style.display = "flex";
    }
  });

  lightbox.addEventListener('click', e => {
    if (e.target == lightbox) {
      closeLightbox();
    }
  });
};
setLightbox();

function closeLightbox() {
  lightbox.classList.remove("visible");
  lightbox.classList.add("hidden");
  body.style.overflow = "auto";
  crumbs.set(options.cookie_name, 1, { type: "day", value: 1 });
}

function isWhitelisted() {
  let result = true;
  if (options.whitelist.length) {
    let url = window.location.pathname + window.location.search;
    // Change the default since now we need to show ONLY in whitelisted places
    result = false;
    options.whitelist.forEach((test) => {
      if (url.match(new RegExp(test))) result = true;
    });
  }
  return result;
}

function isBlacklisted() {
  let result = false;
  if (options.blacklist.length) {
    let url = window.location.pathname + window.location.search;
    options.blacklist.forEach((test) => {
      if (url.match(new RegExp(test))) result = true;
    });
  }
  return result;
}

function isBetweenDates() {
  let result = true;
  // Check if the there are dates defined
  if (options.dates.length) {
    let now = new Date();
    let start = new Date(options.dates[0]);
    let end = new Date(options.dates[1] + " 23:59:59");
    if (now < start || now > end) {
      result = false;
    }
  }
  return result;
}

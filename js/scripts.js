AOS.init();
emailjs.init("wIMVm0sPdJQlgGwdp");
// scroll to top
$(window).scroll(() => {
  if ($(this).scrollTop() > 40) {
    $(".scroll-to-top").fadeIn();
  } else {
    $(".scroll-to-top").fadeOut();
  }
});

$(".scroll-to-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});

// humberger menu script
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".main-nav ul");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".main-nav ul li a");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// add sticky style effect on header
window.onscroll = function () {
  myFunction();
};

var header = document.querySelector("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// get current theme mode
let localstrg = localStorage.getItem("theme-md");
if (localstrg == "true") {
  $("body").addClass("dark-mode");
  $("body").addClass("dark");
  $(".dark-toggle i").attr("class", "fa fa-sun");
} else {
  $("body").removeClass("dark-mode");
  $("body").removeClass("dark");
  $(".dark-toggle i").attr("class", "fa fa-moon");
}
// change theme mode
$(".dark-toggle").click(function () {
  $("body").toggleClass("dark-mode");
  $("body").toggleClass("dark");

  if ($("body").hasClass("dark-mode")) {
    $(".dark-toggle i").attr("class", "fa fa-sun");
    localStorage.setItem("theme-md", true);
  } else {
    $(".dark-toggle i").attr("class", "fa fa-moon");
    localStorage.setItem("theme-md", null);
  }
});

// store contact form data to firebase
document
  .querySelector(".contact-form form")
  .addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
  // get all inputs values
  let names = getInputVal("names");
  let email = getInputVal("email");
  let subject = getInputVal("subject");
  let message = getInputVal("message");

  document.querySelectorAll("form span").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelector(".message-error").style.display = "none";
  if (names === "" && email === "" && subject === "") {
    document.querySelectorAll("form span").forEach((el) => {
      el.style.display = "flex";
    });
  } else if (names === "") {
    document.querySelector("#names-error").style.display = "flex";
  } else if (email === "") {
    document.querySelector("#email-error").style.display = "flex";
  } else if (subject === "") {
    document.querySelector("#subject-error").style.display = "flex";
  } else if (message === "") {
    document.querySelector(".message-error").style.display = "flex";
  } else {
    document.querySelector(".message-error").style.display = "flex";
    document.querySelector(".message-error").style.backgroundColor = "#212121";
    document.querySelector(".message-error").innerHTML = "Please wait...";
    emailjs
      .sendForm("service_y2tcurt", "template_91rrdqq", this)
      .then(function () {
        document.querySelector(".contact-form form").reset();
        document.querySelector(".message-error").style.backgroundColor =
          "#0a3702";
        document.querySelector(".message-error").innerHTML =
          "Yay!!! Message sent successful. see you back in a moment";
        setTimeout(() => {
          document.querySelector(".message-error").style.display = "none";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        document.querySelector(".message-error").style.backgroundColor =
          "#d6374a";
        document.querySelector(".message-error").innerHTML =
          "Whoops!!! Something went wrong, try again later";
      });
  }
}

// function to get ids of inputs
const getInputVal = (id) => {
  return document.querySelector(`#${id}`).value;
};

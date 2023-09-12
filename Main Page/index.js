window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
});




//Social media functions
document.getElementById("email-link").addEventListener("click", () => {
  console.log("This is from email link button");

  // Replace 'your.email@gmail.com' with the actual Gmail address you want to link to
  var email = "az889480@gmail.com";

  // Replace 'Subject' and 'Body' with the desired subject and email body
  var subject = "This is the subject of my email";
  var body = "Hello,\n\nI want to contact you about...";

  // Construct the mailto link
  var mailtoLink =
    "mailto:" +
    email +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // Open the user's default email client
  window.location.href = mailtoLink;
});

document.getElementById("linkedIn-page").addEventListener("click", () => {
  console.log("Linked In button is clicked");
  var linkedIn = "https://www.linkedin.com/in/ameer-hamza-645930243";

  window.location.href = linkedIn;
});

document.getElementById("gitHub-page").addEventListener("click", () => {
  var gitHub = "https://github.com/HAMZA889480";
  window.location.href = gitHub;
});








//gettting the stored values
var personalData = localStorage.getItem("userData") || [];

//var existingEducationData = localStorage.getItem("educationData") || [];






//Load card, Project and education dynamiaclly



window.onload = function () {
  
  //alert('Window is loaded');
  //showExperienceCard();
  //showEducationCard();
};




















//Add More Project
var element5=document.getElementById('add-project');
element5.addEventListener('click',()=>{

  window.location.href='../projectPage/projects.html';
});


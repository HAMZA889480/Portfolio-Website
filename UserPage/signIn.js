//Making Nav Bar Responsive
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

document.getElementById("sign-in-btn").addEventListener("click", function () {
  //prevent from reloading

  //Getting the input field data
  let emailField = document.getElementById("email").value;
  let passwordField = document.getElementById("password").value;

  if (emailField == "" || passwordField == "") {
    alert("Fill and the space");
  } else {
    //Retrive the userData
    const retriveUserData = JSON.parse(localStorage.getItem("userData"));
    console.log(retriveUserData);

    let signIn = false;
    retriveUserData.forEach((obj) => {
      if (obj.emailAddress == emailField && obj.password == passwordField) {
        
        localStorage.setItem('signInUserEmail',obj.emailAddress);
        signIn = true;

        window.location.href="../Main Page/index.html"
      }
    });
    if (signIn == false) {
      alert("Sign In NOT successful");
    }

    //Clear the fields
    // document.getElementById('email').value='';
    // document.getElementById('password').value='';
  }
});

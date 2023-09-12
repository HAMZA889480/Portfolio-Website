//Nav Bar Responsive Code
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



//Using Browser local storage to store data
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    //prevent from reloading for further processing
    event.preventDefault();

    let fName = document.getElementById("firstname").value;
    let lName = document.getElementById("secName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    let confPassword = document.getElementById("confPassword").value;
    let phone = document.getElementById("phone").value;
    let description = document.getElementById("description").value;

    //console.log(fName+','+lName+','+email+','+password+','+confPassword+','+phone+','+description);
    //if password do not match
    if (password != confPassword) {
      alert("Password Do not Match");
    }
    else {
      //Getting previous data stored if any
      var existingData = JSON.parse(localStorage.getItem("userData")) || [];
      //When connecting to data Base currSize should be removed
      let currSize=existingData.length;


      // console.log(existingData);
      // localStorage.removeItem('userData');
      // existingData = JSON.parse(localStorage.getItem("userData")) || [{}];
      // console.log(existingData);

      const newUser = {
          id:(currSize+1).toString(),
          // id property will be removed. DB assigns the id itself
          image: "",
          firstName: fName,
          lastName: lName,
          emailAddress: email,
          password: password,
          confirmationPass: confPassword,
          phoneNum: phone,
          role: description,
          aboutSelf:"",


          
        };
      

      //Email should be unique
      // let emailTaken = false;
      // existingData.forEach((obj) => {
      //   if (obj["emailAddress"] == email) {
      //     console.log("Email Already Taken");
      //     emailTaken = true;
      //   }
      // });


      console.log(newUser);

      //if (emailTaken == false) {
        //push data in the arrayree
        existingData.push(newUser);

        //Store back the updated data to browser local storage
        localStorage.setItem("userData", JSON.stringify(existingData));

        console.log('User Added');

        //Saving the ID for later data storage
        //Call to API that returns ID fo the sign Up user will occur here
        //Replace this code with fetch ID function when connect to database
        localStorage.setItem('newUserID',currSize+1); 
        localStorage.setItem('signInUserEmail',email);
        


        //clear the input fields
      document.getElementById("firstname").value = "";
      document.getElementById("secName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      document.getElementById("confPassword").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("description").value = "";

      window.location.href='../UserData/userData.html';
      //}
      
    }
  });

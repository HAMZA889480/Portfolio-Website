window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//getUserID
//imgInput
//parDiv
var menu = document.querySelector(".menu");
var menuBtn = document.querySelector(".menu-btn");
var closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
});

const getUserID = localStorage.getItem("newUserID");
var retriveUserData = JSON.parse(localStorage.getItem("userData"));

//Getting the id of new User from local storage

// console.log(ID);

//Calling the read All function whenever the page load
window.onload = searchUser();

function searchUser() {
  //fetch all records from the data base

  //searching for specific record using Id

  var fName = document.getElementById("fullName");
  var email = document.getElementById("email");
  var description = document.getElementById("description");

  retriveUserData.forEach((obj) => {
    if (obj.id == getUserID) {
      // when id matches
      //console.log("Data Found");

      //set the input fields
      fName.value = obj["firstName"] + " " + obj["lastName"];
      email.value = obj["emailAddress"];
      description.value = obj["role"];

      //Making the input fields read only
      // fName.setAttribute('readonly'=true);
      // email.setAttribute('readonly'=true);
      // description.setAttribute('readonly'=true);
    }
  });
}

//Getting the ikmage of the user

//Selecting the elements to work with image
const imgInput = document.getElementById("file");
const parDiv = document.querySelector(".image");
const btn = document.querySelector(".image-btn");

//Creating an image element to add when select an image
//and than remove when to clear the input fields
const pic = document.createElement("img");

//stores the image URL
var imageUrl = "";

// Function to replace the button with an image
function replaceWithImage() {
  // Trigger a click event on the file input
  console.log("Button is clicked");
  imgInput.click();
}

// Event listener for the file input change event
imgInput.addEventListener("change", function () {
  // Get the selected file
  const selectedFile = imgInput.files[0];

  // Check if a file is selected

  if (selectedFile) {
    const reader = new FileReader();

    // Define an onload event handler to process the selected file
    reader.onload = () => {
      imageUrl = reader.result;

      // // Create an image element

      pic.src = imageUrl;

      //adding the image and removing the button
      parDiv.removeChild(btn);
      parDiv.appendChild(pic);
      parDiv.classList.add("border-style");
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(selectedFile);
  } else {
    alert("No file selected.");
  }
});

document.getElementById("upload-pic-btn").addEventListener("click", () => {
  //Get the required DOM elements
  const aboutInput = document.getElementById("about-input").value;

  retriveUserData.forEach((obj) => {
    if (obj.id == getUserID) {
      // when id matches

      //adding image and about details
      obj.image = imageUrl;
      obj.aboutSelf = aboutInput;

      // console.log(retriveUserData);

      //Then push back the data to local storage.
      localStorage.setItem("userData", JSON.stringify(retriveUserData));
    } else {
      console.log("Data is not found");
    }
  });

  console.log(retriveUserData);
});

//Store the education as array of object
var existingEducationData =
  JSON.parse(localStorage.getItem("educationData")) || [];

document.getElementById("submit-degree").addEventListener("click", () => {
  //Getting the required DOM elemenst
  var level = document.getElementById("degree-level").value;
  var from = document.getElementById("degree-from").value;
  var major = document.getElementById("major-subjects").value;
  var eduDesc = document.getElementById("edu-desc").value;

  //Check that all inputs are given
  if (level == "" || from == "" || major == "") {
    alert("Fill all details");
  }

  //Getting all previous
  if (IsLevelUnique(level)) {
    //level is unique

    var userEmail = { emailID: "" };
    getEmail(userEmail);

    let currSize = existingEducationData.length;
    var newEducation = {
      id: currSize + 1,
      email: userEmail.emailID,
      eduLevel: level,
      eduComments: eduDesc,
      eduFrom: from,
      eduMajor: major,
    };

    existingEducationData.push(newEducation);
  } else {
    alert("Info already Added ");
  }

  //console.log(education);

  document.getElementById("degree-level").value = "";
  document.getElementById("degree-from").value = "";
  document.getElementById("major-subjects").value = "";
  document.getElementById("edu-desc").value = "";
});

//Store the experienec
var existingExperience = JSON.parse(localStorage.getItem("experience")) || [];
var element6=document
  .getElementById("add-experience");
  if(element6){
  element6.addEventListener("click", function () {
    var type = document.getElementById("exp-type").value;
    var house = document.getElementById("exp-from").value;
    var role = document.getElementById("exp-role").value;
    var time = document.getElementById("exp-duration").value;
    var journey = document.getElementById("exp-journey").value;

    let currSize = existingExperience.length;

    //House and Role can not be same
    if (IsExpUnique(house, role)) {
      //get the email address
      var userEmail = { emailID: "" };
      getEmail(userEmail);

      var newExperience = {
        id: currSize + 1,
        email: userEmail.emailID,
        position: role,
        softwareHouse: house,
        workDuration: time,
        workType: type,
        profJourney: journey,
      };

      existingExperience.push(newExperience);
    } else {
      alert("Experience already added");
    }

    //Clear the input fields
    document.getElementById("exp-type").value = "";
    document.getElementById("exp-from").value = "";
    document.getElementById("exp-role").value = "";
    document.getElementById("exp-duration").value = "";
    document.getElementById("exp-journey").value = "";

    //console.log(experienceData);
  });

}

//When form is submitted save the data and go to home page
element7=document.getElementById("save-details");
if(element7){
element7.addEventListener("click", () => {
  //var existingEducationData=JSON.parse(localStorage.getItem('educationData'))||[];

  //existingEducationData.push(education);

  console.log(existingEducationData);
  //Store back the updated data to browser local storage
  localStorage.setItem("educationData", JSON.stringify(existingEducationData));

  //Store back the updated data to browser local storage
  localStorage.setItem("experience", JSON.stringify(existingExperience));

  window.location.href = "../projectPage/projects.html";
});
}

//For updating the Experience

//getting the url Parameters
var urlParams = new URLSearchParams(window.location.search);

//extracting the function parameter
var functionName = urlParams.get("function");

//Check if the passed function is same with the function you want to call
if (functionName === "displayExperience") {
  //call the required Function
  displayExperience(urlParams.get("expID"));
}

//This function will display a specific expereince using the card ID
function displayExperience(expCardID) {
  //console.log(expCardID);

  //get the exprience fromlocal storage

  // console.log(expData);

  let searchIndex = "";

  // expData.forEach((obj,index)=>{

  //   if(obj.id==expCardID);{
  //   searchIndex=index;

  //   }
  // });

  existingExperience.forEach((obj, index) => {
    if (obj.id == expCardID) {
      searchIndex = index;
    }
  });

  //console.log(expData[searchIndex]);
  console.log(searchIndex);

  //getting the DOM elemets to displayexpreinec

  let expType = document.getElementById("exp-type");
  let expFrom = document.getElementById("exp-from");
  let expRole = document.getElementById("exp-role");
  let expJourney = document.getElementById("exp-journey");
  let expDuration = document.getElementById("exp-duration");

  //Here you will set al other fields to readOnly
  //document.getElementById('degree-level').readOnly=true;

  //setting the values
  expType.value = existingExperience[searchIndex].workType;
  expFrom.value = existingExperience[searchIndex].softwareHouse;
  expRole.value = existingExperience[searchIndex].position;
  expJourney.value = existingExperience[searchIndex].profJourney;
  expDuration.value = existingExperience[searchIndex].workDuration;

  var prvSumbitBtn = document.getElementById("save-details");
  var parDiv = document.getElementById("form-btn");
  var parDivTwo = document.getElementById("rem-add");
  var remAdd = document.getElementById("add-experience");
  parDiv.removeChild(prvSumbitBtn);
  parDivTwo.removeChild(remAdd);

  //Creating a new btn to add

  var newSumbitBtn = document.createElement("button");
  newSumbitBtn.classList.add("submit-btn");
  newSumbitBtn.setAttribute("id", "saveEdit-btn");
  newSumbitBtn.textContent = "Save Cahnges";
  newSumbitBtn.setAttribute("type", "button");
  parDiv.appendChild(newSumbitBtn);

  newSumbitBtn.addEventListener("click", () => {
    updateExperience(searchIndex);
  });
}

//This function will update a specific expereince. It takes the index number at
//which update is required. So first search the specific index and than call this function
function updateExperience(index) {
  //console.log(index);

  //geeting the updated values from input fields
  let newExpType = document.getElementById("exp-type").value;
  let newExpFrom = document.getElementById("exp-from").value;
  let newExpRole = document.getElementById("exp-role").value;
  let newExpJourney = document.getElementById("exp-journey").value;
  let newExpDuration = document.getElementById("exp-duration").value;

  if (
    newExpFrom == "" ||
    newExpDuration == "" ||
    newExpJourney == "" ||
    newExpType == "" ||
    newExpRole == ""
  ) {
    alert("fill all the spaces");
  } else {
    //the index we get as parameter represents the index at which the id of experience is found
    console.log(existingExperience);

    existingExperience[index].position = newExpRole;
    existingExperience[index].profJourney = newExpJourney;
    existingExperience[index].softwareHouse = newExpFrom;
    existingExperience[index].workDuration = newExpDuration;
    existingExperience[index].workType = newExpType;

    localStorage.setItem("experience", JSON.stringify(existingExperience));

    //Clear the input fileds
    newExpType = "";
    newExpDuration = "";
    newExpFrom = "";
    newExpJourney = "";
    newExpDuration = "";

    alert("Cahnges saved");

    var experience = localStorage.getItem("experience") || [];
    expD = JSON.parse(experience);
    console.log(expD);

    window.location.href = "../Main Page/index.html";
  }
}

function deleteExperience(expID) {
  //get the experience Data
  let existingExp = JSON.parse(localStorage.getItem("experience")) || [];

  //Match the id using for Each loop
  existingExp.forEach((obj, index) => {
    if (obj.id == expID) {
      //splice the data at index where id's will match
      existingExp.splice(index, 1);
      // //modify the data in the local storage
      localStorage.setItem("experience", JSON.stringify(existingExp));
      console.log('Experinece Deleted!!');
      alert('Experienec Deleted!!');
      return;
    }
  });
}




if (functionName === "displayEducation") {
  //call the required Function
  displayEducation(urlParams.get("educationID"));
}



function displayEducation(eduNum){
  
  //getting the required inputs

  let degLevel= document.getElementById('degree-level');
  let degFrom=document.getElementById('degree-from');
  let degSubjects=document.getElementById('major-subjects');
  let degCommnts=document.getElementById('edu-desc');



  let searchIndex = "";

  
  //searching for specific index using eduNum
  existingEducationData.forEach((obj, index) => {
    if (obj.id == eduNum) {
      searchIndex = index;
    }
  });


  degLevel.value=existingEducationData[searchIndex].eduLevel;
  degFrom.value=existingEducationData[searchIndex].eduFrom;

  degSubjects.value=existingEducationData[searchIndex].eduMajor;

  degCommnts.value=existingEducationData[searchIndex].eduComments;


  hideContent();




}





function hideContent(){
  
  let prvDegPar=document.getElementById('degree-sub-btn');
  let prvDegBtn=document.getElementById('submit-degree');

  prvDegPar.removeChild(prvDegBtn);

  let newDegBtn=document.createElement('button');
  newDegBtn.classList.add('degree-btn');
  newDegBtn.setAttribute('id', 'newBtn');
  newDegBtn.textContent='Edit Degree';

  prvDegPar.appendChild(newDegBtn);

  //Hide the experience Section
  let expSection=document.getElementById('exp-main');
  let expParent=document.getElementById('box');

  expParent.classList.remove('')
  expParent.classList.add('box-space');

  expParent.removeChild(expSection);




}






function getEmail(userEmail) {
  retriveUserData.forEach((obj) => {
    if (obj["id"] == getUserID) {
      userEmail.emailID = obj.emailAddress;
      return;
    }
  });
}
function IsLevelUnique(level) {
  if (existingEducationData.length == 0) {
    return true;
  } else {
    //using forEach loop to check that level is unique
    existingEducationData.forEach((obj) => {
      console.log(obj.eduLevel);
      if (obj.eduLevel == level) {
        return false; //level found
      }
    });

    return true;
  }
}

function IsExpUnique(house, role) {
  if (existingExperience.length == 0) {
    return true;
  } else {
    existingExperience.forEach((obj) => {
      if (obj["softwareHouse"] == house && obj["position"] == role) {
        return false;
      }
    });

    return true;
  }
}

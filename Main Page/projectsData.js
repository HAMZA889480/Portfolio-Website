var projData = [];
var email = localStorage.getItem("signInUserEmail");

getProjectData(email);

showProjects();

function showProjects() {
  //Getting the projects data from local storage

  if (Array.isArray(projData) && projData.length === 0) {
    // proj is an empty array
    console.log("proj is empty");
  } else {
    // proj is not empty

    for (let i = 0; i < projData.length; i++) {
      var sourceBtn = document.createElement("button");
      sourceBtn.textContent = "Source Code";
      sourceBtn.classList.add("button");

      var readMoreBtn = document.createElement("button");
      readMoreBtn.textContent = "Read More";
      readMoreBtn.classList.add("button2");

      readMoreBtn.id = projData[i].id.toString(); //add ID dynamically from project Data using for loop
      readMoreBtn.setAttribute("onclick", "toogle(" + projData[i].id + ")"); //toogle is defined in index.js

      //Create child Child div to append buttons
      var childChildDiv = document.createElement("div");
      childChildDiv.classList.add("buttons");
      //append the buttons to the childChildDiv
      childChildDiv.append(sourceBtn);
      childChildDiv.append(readMoreBtn);

      //imageClass to add .proj-img

      //Below is tested code  //Child 2 code
      var projImage = document.createElement("img");
      projImage.src = projData[i].projectImage;

      projImage.classList.add("proj-img");

      //geting the parent of the imag
      var childTwo = document.createElement("div");
      childTwo.classList.add("project-image");

      //appending the image with child 2
      childTwo.append(projImage);

      //creating h2 tag present inside the child 1
      var proTitle = document.createElement("h2");
      proTitle.textContent = projData[i].projectTitle;
      proTitle.classList.add("project-title");

      //creating p tag present inside the child1
      var prodescription = document.createElement("p");

      prodescription.classList.add("project-description");

      //first we split the long text in to short
      let longText = projData[i].projectDes;
      //Split the text on basis of '. ' and store in an array
      let lines = longText.split(". ");

      //Get first 3 line from 0 to 3
      let firstThreeLines = lines.slice(0, 3);

      //join the 3 lines
      let textDisplay = firstThreeLines.join(". ");

      prodescription.textContent = textDisplay;

      var child1 = document.createElement("div");
      child1.classList.add("project-details");

      var parent = document.createElement("div");
      parent.classList.add("projects-container");
      //parent.append(child1);
      //parent.append(childTwo);

      // document.getElementById("proj-parent").append(parent);

      //Test is test for icons
      var icon1 = document.createElement("i");

      icon1.className = "fa-solid fa-pen-to-square";

      icon1.addEventListener("click", function () {
        //calling the edit Project function present in project.js inside Folder ProjectPages and passing the ID
        var projID = projData[i].id;
        var functionName = "displayProject";

        var url = `../projectPage/projects.html?projID=${projID}&function=${functionName}`;
        window.location.href = url;
      });

      var icon2 = document.createElement("i");

      icon2.className = "fa-solid fa-trash";

      icon2.addEventListener("click", () => {
        //deleteProject function is defined in projects.js
        deleteProject(projData[i].id);

        //reload the page after deleting the project
        window.location.reload();
      });

      var iconDiv = document.createElement("div");
      iconDiv.classList.add("title-icons");

      //append the icons with the iconDiv
      iconDiv.append(icon1);
      iconDiv.append(icon2);

      var hIconDiv = document.createElement("div");
      hIconDiv.classList.add("title-edit");
      hIconDiv.append(proTitle);
      hIconDiv.append(iconDiv);

      child1.append(hIconDiv);
      child1.append(prodescription);
      child1.append(childChildDiv);

      parent.append(child1);
      parent.append(childTwo);

      document.getElementById("proj-parent").append(parent);
    }

    //append the projDiv with parentDiv using for loop
  }
}

function getProjectData(para) {
  var proj = JSON.parse(localStorage.getItem("projectsData") || []);

  console.log(proj);
  console.log(para);

  if (Array.isArray(proj) && proj.length === 0) {
    console.log("Project is empty");
  } else {
    proj.forEach((obj, index) => {
      if (obj.emailAddress == para) {
        projData.push(proj[index]);
        found = true;
      }
    });
  }
}

function toogle(cardID) {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");

  var popup = document.getElementById("popup");
  popup.classList.toggle("active");

  //console.log(cardID);

  changePopUpData(cardID);
}

function changePopUpData(cardID) {
  //get the required index of array by matching the project id

  projData.forEach((obj, index) => {
    if (obj.id == cardID) {
      searchIndex = index;
      return;
    }
  });

  document.getElementById("popup-title").innerHTML =
    projData[searchIndex].projectTitle;
  document.getElementById("popUp-des").innerHTML =
    projData[searchIndex].projectDes;
  document.getElementById("popup-img").src = projData[searchIndex].projectImage;
  document.getElementById("tag1").innerHTML = projData[searchIndex].proTags[1];
  document.getElementById("tag2").innerHTML = projData[searchIndex].proTags[2];
  document.getElementById("tag3").innerHTML = projData[searchIndex].proTags[3];
}

const requestURL = "/json/taylor_swift.json";

let lyricpool = [];
let top5 = [];

let artistVariable = null;
// console.log(artistVariable);

let albumTitle = null;

var checkboxElems = null;

let songFunctionAddedArray = [];

let albumFunctionAddedArray = [];

let songPostFunctionArray = [];

let albumPostFunctionArray = [];

// let testAlbumArray = [
//   "Brand New Album One",
//   "Brand New Album Two",
//   "Brand New Album Three",
// ];

// let album0songs = ["Album Song one", "Album song two", "Album Song three"];

// let album1songs = ["Album Song one", "Album song two", "Album Song three"];

// let album2songs = ["Album Song one", "Album song two", "Album Song three"];

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })

  .then(function (jsonObject) {
    console.table(jsonObject);

    // testAlbumArray;

    const selectedArtist = "Taylor Swift";
    // I need to make this fetched from the HTML selector later

    //This could be replaces with a "if taylor swift then {var = 0} else{var = 1}  "
    for (var i = 0; i < jsonObject.artists.length; i++) {
      if (jsonObject.artists[i].artistName != selectedArtist) {
        null;
      } else artistVariable = [i];
    }
    // console.log(artistVariable);
    // console.log(jsonObject.artists[artistVariable].albums.length);

    for (var i = 0; i < jsonObject.artists[artistVariable].albums.length; i++) {
      albumTitle = jsonObject.artists[artistVariable].albums[i].albumName;
      createAlbumElement(albumTitle, albumTitle);
      albumFunctionAddedArray.push(albumTitle);
      //
      //
      for (
        var j = 0;
        j < jsonObject.artists[artistVariable].albums[i].songs.length;
        j++
      ) {
        songTitle = jsonObject.artists[artistVariable].albums[i].songs[j].song;
        addListElements(songTitle, songTitle, albumTitle);
        songFunctionAddedArray.push(songTitle);
        checkboxElemsFunction();

        // console.log(songTitle);
      }
    }
    // console.log(jsonObject.artists[artistVariable].albums[0].songs[0]);

    // This is working\/
    // console.log(jsonObject.artists[artistVariable].artistName);
  });

function createAlbumElement(albumFunctionTitle, albumIndexiVariable) {
  const variableToggleFunction = createToggleButton(albumIndexiVariable);

  const albumElement = document.createElement("li");
  albumElement.appendChild(variableToggleFunction);

  const textnode = document.createTextNode(albumFunctionTitle);
  const albumElementChildOne = document.createElement("p");
  const albumElementChildTwoSongList = document.createElement("ul");

  const albumElementDropDownButton = document.createElement("input");
  albumElementDropDownButton.setAttribute("type", "image");
  albumElementDropDownButton.setAttribute(
    "id",
    albumFunctionTitle + "dropDownButtonId"
  );
  albumElementDropDownButton.classList.add("flipButtonBefore");
  albumElementDropDownButton.src = "images/dropDownArrow128px.png";
  albumElementDropDownButton.height = 34;
  albumElementDropDownButton.setAttribute(
    "onclick",
    "toggleDropdown('" +
      albumFunctionTitle +
      "'); addClass('" +
      albumFunctionTitle +
      "')"
  );
  // albumElementDropDownButton.setAttribute(
  //   "onclick",
  //   "addClass('" + albumFunctionTitle + "')"
  // );

  albumElementChildTwoSongList.classList.add("songList");
  albumElementChildTwoSongList.setAttribute("id", albumFunctionTitle + "ul");

  albumElementChildOne.appendChild(textnode);
  albumElement.appendChild(albumElementChildOne);
  albumElement.appendChild(albumElementDropDownButton);
  albumElement.appendChild(albumElementChildTwoSongList);

  document.getElementById("albums").appendChild(albumElement);
}
function createToggleButton(indexValueIdPassthrough) {
  const switchButton = document.createElement("label");
  switchButton.classList.add("switch");
  const switchButtonElementOne = document.createElement("input");
  switchButtonElementOne.type = "checkbox";

  switchButtonElementOne.setAttribute("id", indexValueIdPassthrough);
  switchButtonElementOne.checked = true;

  const switchButtonElementTwo = document.createElement("span");
  switchButtonElementTwo.classList.add("slider");
  switchButtonElementTwo.classList.add("round");

  switchButton.appendChild(switchButtonElementOne);
  switchButton.appendChild(switchButtonElementTwo);
  return switchButton;

  // document.getElementById("albums").appendChild(switchButton);
}

function addListElements(songFunctionTitle, songIndexiVariable, parentAlbumid) {
  const variableToggleFunction = createToggleButton(songIndexiVariable);
  const listElement = document.createElement("li");
  listElement.appendChild(variableToggleFunction);
  const textnode = document.createTextNode(songFunctionTitle);
  listElement.appendChild(textnode);
  document.getElementById(parentAlbumid + "ul").appendChild(listElement);
}

function checkboxElemsFunction() {
  checkboxElems = document.querySelectorAll("input[type='checkbox']");
  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("click", checkboxUpdater);
    // console.log("checkbox elems working");
  }
}

function checkParentCheckbox() {
  toggleDropdown("Taylor Swift");
  // console.log(checkboxElems);
  // console.log("switch has been flipped");
  // songParentId = document.getElementById(songArray[0]);
  // console.log(songParentId.parentNode.parentNode.parentNode.getAttribute("id"));
}

console.log(albumFunctionAddedArray);

function checkboxUpdater() {
  // console.log("CheckboxUpdater Fired");
  for (i = 0; i < albumFunctionAddedArray.length; i++) {
    // console.log([i] + " fire instance");

    let albumId = albumFunctionAddedArray[i];
    // console.log(albumId);

    parentCheckboxControlVerification(albumId);
  }

  for (i = 0; i < songFunctionAddedArray.length; i++) {
    songPostFunctionArray = [];
    albumPostFunctionArray = [];
    // console.log(songFunctionAddedArray[i]);
    if (isCheckboxChecked(songFunctionAddedArray[i])) {
      let parentAlbumId = getParentAlbumId(songFunctionAddedArray[i]);
      checkBoxTurnChecked(parentAlbumId);
    }
  }
}

// Add song to list that get lyrics, make a checker to see if song is selected

function getParentAlbumId(songId) {
  // console.log("getParentAlbumId fired songID =" + songId);
  let songParentAlbumId = document.getElementById(songId);

  return songParentAlbumId.parentNode.parentNode.parentNode
    .getAttribute("id")
    .slice(0, -2);
  // .slice removes the 'ul' from the parent ID, so it matches the album name
}

function isCheckboxChecked(checkboxId) {
  // console.log("isCheckboxChecked fired checkbox Id = " + checkboxId);
  if (document.getElementById(checkboxId).checked == true) {
    return true;
  } else {
    return false;
  }
}

function checkBoxTurnChecked(checkboxId) {
  // console.log("checkBoxTurnChecked fired checkboxId = " + checkboxId);
  document.getElementById(checkboxId).checked = true;
}

function parentCheckboxControlVerification(albumTitle) {
  let albumDocumentReference = document.getElementById(albumTitle);
  let albumListDocumentReference = document.getElementById(albumTitle + "ul");

  // console.log(albumDocumentReference);
  // console.log(albumListDocumentReference);

  if (albumListDocumentReference.classList.contains("responsive")) {
    return null;
  } else if (albumDocumentReference.checked == false) {
    findAllChildrenAndCheckOrUncheck(albumTitle, false);
  } else if (albumDocumentReference.checked == true) {
    findAllChildrenAndCheckOrUncheck(albumTitle, true);
  } else {
    return null;
  }
}

function findAllChildrenAndCheckOrUncheck(albumTitle, bool) {
  let childSongElements = document
    .getElementById(albumTitle + "ul")
    .querySelectorAll("input[type='checkbox']");

  for (var i = 0; i < childSongElements.length; i++) {
    childSongElements[i].checked = bool;
  }
}

function toggleDropdown(albumId) {
  // console.log("tog dropdowncalled");
  document.getElementById(albumId + "ul").classList.toggle("responsive");
}

function addClass(albumId) {
  // console.log(albumId + "dropDownButtonId");
  document
    .getElementById(albumId + "dropDownButtonId")
    .classList.toggle("flipButton");
}

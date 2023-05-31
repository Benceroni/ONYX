const requestURL = "json/taylor_swift.json";

let lyricpool = [];
let top5 = [];

let artistVariable = "Taylor Swift";
// console.log(artistVariable);

let albumTitle = null;

var checkboxElems = null;

let songFunctionAddedArray = [];

let albumFunctionAddedArray = [];

let activeSongArray = [];

let activeAlbumArray = [];

let activeLyricsArray = [];

var activeWordsArray = [];

var activeWordsCountArray = [];
var activeWordsCountCountArray = [];

// let testAlbumArray = [
//   "Brand New Album One",
//   "Brand New Album Two",
//   "Brand New Album Three",
// ];

// let album0songs = ["Album Song one", "Album song two", "Album Song three"];

// let album1songs = ["Album Song one", "Album song two", "Album Song three"];

// let album2songs = ["Album Song one", "Album song two", "Album Song three"];
let selectedArtist = "Taylor Swift";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })

  .then(function (jsonObject) {
    console.table(jsonObject);

    // testAlbumArray;

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
        updateActiveSongArray();

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

function checkboxUpdater() {
  // console.log("CheckboxUpdater Fired");
  for (var i = 0; i < albumFunctionAddedArray.length; i++) {
    // console.log([i] + " fire instance");

    let albumId = albumFunctionAddedArray[i];
    // console.log(albumId);

    parentCheckboxControlVerification(albumId);
  }

  for (var i = 0; i < songFunctionAddedArray.length; i++) {
    songPostFunctionArray = [];
    albumPostFunctionArray = [];
    // console.log(songFunctionAddedArray);
    if (isCheckboxChecked(songFunctionAddedArray[i])) {
      let parentAlbumId = getParentAlbumId(songFunctionAddedArray[i]);
      checkBoxTurnChecked(parentAlbumId);
    }
  }
  updateActiveSongArray();
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
  // console.log(document.getElementById(checkboxId));
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

function updateActiveSongArray() {
  // console.log("album function array: " + albumFunctionAddedArray);
  activeAlbumArray = [];
  for (let i = 0; i < albumFunctionAddedArray.length; i++) {
    // console.log(i);
    if (isCheckboxChecked(albumFunctionAddedArray[i]) === false) {
      null;
    } else {
      activeAlbumArray.push(albumFunctionAddedArray[i]);
      // console.log(activeAlbumArray);
    }
    activeSongArray = [];
    for (let j = 0; j < songFunctionAddedArray.length; j++) {
      if (isCheckboxChecked(songFunctionAddedArray[j]) === false) {
        null;
      } else {
        activeSongArray.push(songFunctionAddedArray[j]);
        // console.log(activeSongArray);
      }
    }
  }
  scrapeActiveSongLyrics();
}

function scrapeActiveSongLyrics() {
  // console.log("Active Albums: " + activeAlbumArray);
  // console.log("Active Songs" + activeSongArray);
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (jsonObject) {
      // console.log(jsonObject.artists[0]);

      for (var i = 0; i < jsonObject.artists.length; i++) {
        // console.log("First for loop has run " + (i + 1) + " Time(s)");
        if (jsonObject.artists[i].artistName === selectedArtist) {
          // console.log("First if has run " + (i + 1) + " Time(s)");
          activeWordsArray = [];
          for (var j = 0; j < jsonObject.artists[i].albums.length; j++) {
            // console.log("Second for loop has run " + (j + 1) + " Time(s)");
            if (
              activeAlbumArray.includes(
                jsonObject.artists[i].albums[j].albumName
              )
            ) {
              // console.log("second if has run");
              // console.log(
              //   "Second if album name " +
              //     jsonObject.artists[i].albums[j].albumName
              // );
              for (
                var k = 0;
                k < jsonObject.artists[i].albums[j].songs.length;
                k++
              ) {
                if (
                  activeSongArray.includes(
                    jsonObject.artists[i].albums[j].songs[k].song
                  )
                )
                  addLyricsToLyricsArray(
                    jsonObject.artists[i].albums[j].songs[k].lyrics
                  );
                // console.log("Lryics characters:");
                // console.log(
                //   jsonObject.artists[i].albums[j].songs[k].lyrics.length
                // );
              }
            }
          }
        }
      }
      countLyrics();
    });
}

function clearArraysAndCallLyrics() {
  scrapeActiveSongLyrics();
  countLyrics();
}

function addLyricsToLyricsArray(completeLyrics) {
  var cleanerLyrics = completeLyrics.replace(/[.,?"!]/g, "");
  var cleanedLyrics = cleanerLyrics.replace(/\s{2,}/g, " ");

  var cleanedWords = cleanedLyrics.split(" ");
  var lowerCleanedWords = cleanedWords.map((word) => word.toLowerCase());

  for (var i = 0; i < lowerCleanedWords.length; i++) {
    // console.log(cleanedWords[i]);
    activeWordsArray.push(lowerCleanedWords[i]);
  }
  // console.log("active words array is:");
  // console.log(activeWordsArray);
}

function countLyrics() {
  // console.log(activeWordsArray);
  activeWordsCountArray = [];
  activeWordsCountCountArray = [];

  for (var i = 0; i < activeWordsArray.length; i++) {
    // console.log(activeWordsArray[i]);
    // console.log(activeWordsCountArray);
    if (activeWordsCountArray.includes(activeWordsArray[i])) {
      var indexValue = activeWordsCountArray.indexOf(activeWordsArray[i]);
      // var indexValue = oppositeArrayIndexValueFinder(activeWordsArray[i]);
      activeWordsCountCountArray[indexValue] += 1;
    } else {
      activeWordsCountArray.push(activeWordsArray[i]);
      activeWordsCountCountArray.push(1);
    }
  }
  // console.log(activeWordsCountArray);
  // console.log(activeWordsCountCountArray);
  topFiveWords();
  // console.log(activeWordsCountArray);
}

function printStuffOut() {
  // console.log(activeWordsCountArray);
  console.log("active word count count array " + activeWordsCountCountArray);
  topFiveWords();
}

let firstLargest = null;
let secondLargest = null;
let thirdLargest = null;
let fourthLargest = null;
let fifthLargest = null;
let firstLargestWord = null;

function topFiveWords() {
  firstLargest = activeWordsCountCountArray[0];
  console.log(
    "Active Word count count length is: " + activeWordsCountCountArray.length
  );
  console.log(activeWordsCountCountArray);
  // console.log("first Largest: " + firstLargest);
  for (var i = 0; i < activeWordsCountCountArray.length; i++) {
    // console.log([i] + " run through");
    // console.log(
    //   "first Largest: " +
    //     firstLargest +
    //     "compared to: " +
    //     activeWordsCountCountArray[i]
    // );
    // console.log(
    //   activeWordsCountCountArray.indexOf(activeWordsCountCountArray[i])
    // );
    if (firstLargest < activeWordsCountCountArray[i]) {
      // console.log(firstLargest);
      // console.log(activeWordsCountArray[i]);
      // console.log(activeWordsCountCountArray[i]);
      var indexValue = activeWordsCountCountArray.indexOf(
        activeWordsCountCountArray[i]
      );
      // console.log("first largest is  " + firstLargest);
      fifthLargest = fourthLargest;
      fourthLargest = thirdLargest;
      thirdLargest = secondLargest;
      secondLargest = firstLargestWord;
      firstLargestWord = activeWordsCountArray[indexValue];
      // console.log("First largest " + firstLargestWord);
      // console.log("second largest " + secondLargest);

      // console.log(
      //   "Most common words are:" +
      //     firstLargestWord +
      //     ", " +
      //     secondLargest +
      //     ", " +
      //     thirdLargest +
      //     ", " +
      //     fourthLargest +
      //     ", " +
      //     fifthLargest
      // );
    }
  }
}

// function oppositeArrayIndexValueFinder(
//   valueYouWantToFindMatchingIndexValueFor
// ) {
//   var indexValue = null;

//   if (typeof valueYouWantToFindMatchingIndexValueFor === Number) {
//     indexValue = activeWordsCountCountArray.indexOf(
//       valueYouWantToFindMatchingIndexValueFor
//     );
//   } else {
//     indexValue = activeWordsArray.indexOf(
//       valueYouWantToFindMatchingIndexValueFor
//     );
//   }
//   return indexValue;
// }

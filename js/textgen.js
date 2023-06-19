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
var activeLyricCountAndLyric = [];

var lyricsAlreadyInLyricCountArray = [];

let excludedLyricsArray = ["kaelei", "seven"];

let selectedArtist = "Taylor Swift";

function logAllArrays() {
  console.log(
    "songFunctionAddedArray: " +
      songFunctionAddedArray +
      " albumFunctionAddedArray: " +
      songFunctionAddedArray +
      "albumFunctionAddedArray: " +
      albumFunctionAddedArray +
      " lyricsAlreadyInLyricCountArray: " +
      lyricsAlreadyInLyricCountArray
  );
}

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
      }
    }

    updateActiveSongArray();
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
  const textnode = document.createElement("p");
  listElement.appendChild(variableToggleFunction);
  const childPElementTextHolder = document.createTextNode(songFunctionTitle);
  textnode.appendChild(childPElementTextHolder);
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
  console.log("CheckboxUpdater Fired");
  console.log("album function added array is " + albumFunctionAddedArray);
  for (var i = 0; i < albumFunctionAddedArray.length; i++) {
    // console.log([i] + " fire instance");

    let albumId = albumFunctionAddedArray[i];
    // console.log(albumId);

    parentCheckboxControlVerification(albumId);
  }
  console.log("song function added array is: " + songFunctionAddedArray);
  for (var i = 0; i < songFunctionAddedArray.length; i++) {
    // console.log(songFunctionAddedArray);
    if (isCheckboxChecked(songFunctionAddedArray[i])) {
      let parentAlbumId = getParentAlbumId(songFunctionAddedArray[i]);
      checkBoxTurnChecked(parentAlbumId);
    }
  }
  console.log("Update active song array SHOULD be called next");
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
  console.log("update active song array fired");
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
  console.log("scrape active songs lyrics function fired");

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
            // console.log(jsonObject.artists[i].albums.length);
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
                ) {
                  addLyricsToLyricsArray(
                    jsonObject.artists[i].albums[j].songs[k].lyrics
                  );
                }
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
  console.log("clear arrays and call lyrics function fired");

  scrapeActiveSongLyrics();
}

function addLyricsToLyricsArray(completeLyrics) {
  console.log("add lyrics to lyrics array function fired");

  var cleanerLyrics = completeLyrics.replace(/[.,?"!]/g, "");
  var cleanedLyrics = cleanerLyrics.replace(/\s{2,}/g, " ");

  var cleanedWords = cleanedLyrics.split(" ");
  var lowerCleanedWords = cleanedWords.map((word) => word.toLowerCase());

  for (var i = 0; i < lowerCleanedWords.length; i++) {
    // console.log(cleanedWords[i]);
    activeWordsArray.push(lowerCleanedWords[i]);
  }
  // console.log(activeLyricCountAndLyric);

  // console.log("active words array is:");
  // console.log(activeWordsArray);
}

function countLyrics() {
  activeLyricCountAndLyric = [];
  lyricsAlreadyInLyricCountArray = [];

  for (var i = 0; i < activeWordsArray.length; i++) {
    // console.log(activeWordsArray[i]);
    // console.log(activeWordsCountArray);
    // console.log(activeLyricCountAndLyric);

    var word = activeWordsArray[i];
    // console.log(word);
    if (lyricsAlreadyInLyricCountArray.includes(word)) {
      // find key value pair and add 1 to count
      var indexValue = activeWordsCountArray.indexOf(word);
      var indexValue = activeLyricCountAndLyric
        .map(function (obj) {
          return obj.lyric;
        })
        .indexOf(word);

      // console.log(activeLyricCountAndLyric[indexValue].count);
      // console.log(activeLyricCountAndLyric);

      activeLyricCountAndLyric[indexValue].count += 1;
      // console.log(activeLyricCountAndLyric);
    } else {
      activeLyricCountAndLyric.push({ count: 1, lyric: word });
      lyricsAlreadyInLyricCountArray.push(word);
    }
  }
  // console.log(activeLyricCountAndLyric);
  // console.log(lyricsAlreadyInLyricCountArray);
  rankOrderLyricAndLyricCountArray();
}

function printStuffOut() {
  console.log("Print stuff out function fired");
  // console.log("active word count count array " + activeWordsCountCountArray);
  rankOrderLyricAndLyricCountArray();
}

function rankOrderLyricAndLyricCountArray() {
  console.log("rank order Lyric and lyric count array function fired");

  let unfilteredTopWordsArray = activeLyricCountAndLyric.sort(
    (b, a) => a.count - b.count
  );
  console.log("bouta hit that fat for function");
  console.log(excludedLyricsArray);
  console.log(unfilteredTopWordsArray);
  let topFiveWords = unfilteredTopWordsArray.filter(
    (word) => !excludedLyricsArray.includes(word.lyric)
  );
  console.log(topFiveWords);
  console.log(topFiveWords.slice(0, 5));
}

function updateExcludedWordElements() {
  if (document.getElementById("excludedWordsul").lastElementChild) {
    removeAllChildren("excludedWordsul");
  }
  for (var i = 0; i < excludedLyricsArray.length; i++) {
    const listElement = document.createElement("li");
    const excludedWord = document.createElement("p");
    const wordRemover = document.createElement("input");
    wordRemover.type = "image";
    wordRemover.src = "'x'ImageHolder";
    wordRemover.setAttribute(
      "onclick",
      "removeWordFromExclusionArray('" + excludedLyricsArray[i] + "')"
    );
    const textNode = document.createTextNode(excludedLyricsArray[i]);

    excludedWord.appendChild(textNode);
    listElement.appendChild(excludedWord);
    listElement.appendChild(wordRemover);
    document.getElementById("excludedWordsul").appendChild(listElement);
  }
}

function removeWordFromExclusionArray(wordToRemove) {
  console.log(wordToRemove);
  console.log(excludedLyricsArray);
  excludedLyricsArray = excludedLyricsArray.filter(
    (word) => word !== wordToRemove
  );
  console.log(excludedLyricsArray);
  updateExcludedWordElements();
}

function removeAllChildren(elementIdToRemove) {
  const myNode = document.getElementById(elementIdToRemove);
  console.log(myNode.lastElementChild);
  while (myNode.lastElementChild) {
    console.log(myNode.lastElementChild);
    myNode.removeChild(myNode.lastElementChild);
  }
}

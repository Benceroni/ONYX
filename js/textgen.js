const requestURL = "/json/taylor_swift.json";

let lyricpool = [];
let top5 = [];

let artistVariable = null;
console.log(artistVariable);

let albumTitle = null;

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

    const selectedArtist = "Brand New";
    // I need to make this fetched from the HTML selector later

    //This could be replaces with a "if taylor swift then {var = 0} else{var = 1}  "
    for (var i = 0; i < jsonObject.artists.length; i++) {
      if (jsonObject.artists[i].artistName != selectedArtist) {
        null;
      } else artistVariable = [i];
    }
    console.log(artistVariable);
    console.log(jsonObject.artists[artistVariable].albums.length);

    for (var i = 0; i < jsonObject.artists[artistVariable].albums.length; i++) {
      albumTitle = jsonObject.artists[artistVariable].albums[i].albumName;
      createAlbumElement(albumTitle, albumTitle);
      for (
        var j = 0;
        j < jsonObject.artists[artistVariable].albums[i].songs.length;
        j++
      ) {
        songTitle = jsonObject.artists[artistVariable].albums[i].songs[j].song;
        addListElements(songTitle, songTitle, albumTitle);
        console.log(songTitle);
      }
    }
    console.log(jsonObject.artists[artistVariable].albums[0].songs[0]);
    // for (song in songs)

    // works with original data structure
    // console.log(
    //   jsonObject.artists[0]["Taylor Swift"][0]["Taylor Swift"][0].song
    // );
    //New Data structure

    // This is working\/
    console.log(jsonObject.artists[artistVariable].artistName);

    // console.log(jsonObject.artists.length);

    // const artist = jsonObject.artists["Taylor Swift"][0];

    // let forLoopAlbumLength = jsonObject[selectedArtist].length;

    // for (var i = 0; i < forLoopAlbumLength; i++) {
    //   createAlbumElement(testAlbumArray[i], "albumIndexid" + i);
    //   const album = "album" + [i] + "songs";
    //   console.log(album);
    //   for (var j = 0; j < album.length; j++) {
    //     // console.log([j]);
    //   }
    // }
  });

// let bruh = jsonObject.artists[0];
function createAlbumElement(albumFunctionTitle, albumIndexiVariable) {
  const variableToggleFunction = createToggleButton(albumIndexiVariable);

  const albumElement = document.createElement("li");
  albumElement.appendChild(variableToggleFunction);

  const textnode = document.createTextNode(albumFunctionTitle);
  const albumElementChildOne = document.createElement("p");
  const albumElementChildTwoSongList = document.createElement("ul");
  albumElementChildTwoSongList.setAttribute("id", albumFunctionTitle + "ul");

  albumElementChildOne.appendChild(textnode);
  albumElement.appendChild(albumElementChildOne);
  albumElement.appendChild(albumElementChildTwoSongList);

  document.getElementById("albums").appendChild(albumElement);
  document.getElementById(albumIndexiVariable).checked = true;
}
function createToggleButton(indexValueClassPassthrough) {
  const switchButton = document.createElement("label");
  switchButton.classList.add("switch");
  const switchButtonElementOne = document.createElement("input");
  switchButtonElementOne.type = "checkbox";
  // switchButtonElementOne.classList.add(indexValueClassPassthrough);
  switchButtonElementOne.setAttribute("id", indexValueClassPassthrough);

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

// Checking functions. NOT to remain in the code.
function clickCheck() {
  for (var i = 0; i < testAlbumArray.length; i++) {
    console.log("albumIndexid" + [i]);
    if (document.getElementById("albumIndexid" + [i]).checked) {
      console.log(i);
    } else {
      console.log("This item isn't checked");
    }
  }
}

function clickCheckSimplified() {
  if (document.getElementById("albumIndexid0").checked) {
    console.log("First Button is Checked");
  }
}

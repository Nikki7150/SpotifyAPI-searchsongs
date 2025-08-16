const params = new URLSearchParams(window.location.search);
const albumId = params.get("album");


if (!albumId) {
  document.getElementById("album-info").innerText = "No album selected.";
} else {
  fetchAlbumTracks(albumId);
}


// Replace these with your actual clientId and clientSecret
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;


// Get Spotify access token
async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}


// Fetch album details including tracks
async function fetchAlbumTracks(albumId) {
  const token = await getAccessToken();


  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });


  const album = await response.json();


  // Display album cover and name
  const albumInfo = document.getElementById("album-info");
  albumInfo.innerHTML = `
    <img src="${album.images[0].url}" alt="${album.name}" width="300">
    <h2>${album.name}</h2>
    <p>${album.artists.map(a => a.name).join(", ")}</p>
  `;


  // Display track list
  const trackList = document.getElementById("track-list");
  album.tracks.items.forEach(track => {
    const li = document.createElement("li");
    li.textContent = `${track.track_number}. ${track.name}`;
    trackList.appendChild(li);
  });
}


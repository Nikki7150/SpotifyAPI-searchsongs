const params = new URLSearchParams(window.location.search);
const albumId = params.get("album");
const accessToken = params.get("token");

async function loadTracks() {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();

  const trackList = document.getElementById("track-list");
  data.items.forEach(track => {
    const div = document.createElement("div");
    div.textContent = track.name;
    trackList.appendChild(div);
  });
}

loadTracks();

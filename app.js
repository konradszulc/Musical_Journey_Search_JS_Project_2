/*App.js
Author: Konrad Szulc 
Date Submitted: Dec 3rd 2025
Brain of the webpage, enables fetching of API, and elements  on index to then display parsed info*/

/*-----Global Variables-----*/

//Using a proxy server to hide API key from public, change URL based on environment, localhost for development (teacher can use locally), or Render URL as backend for github pages deployment
const API_URL = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000/api/lastfm' : 'https://musical-journey-search-js-project-2.onrender.com/api/lastfm'; //Render URL

//checking if API URL is set correctly, and shows which environment is being used
console.log('Using API URL:', API_URL);
//Last.fm API key is now hidden in the backend server, so we don't expose it here

//Finding all needed elements from index.html with specific IDs to be used later
const artistSearch = document.getElementById('artistSearch');
const searchBtn = document.getElementById('searchBtn');
const artistInfo = document.getElementById('artistInfo');
const artistResults = document.getElementById('artistResults');
const albumGrid = document.getElementById('albumGrid');
const albumDetails = document.getElementById('albumDetails');
const errorMsg = document.getElementById('errorMsg');
const spinner = document.getElementById('spinner');
const statusMsg = document.getElementById('statusMsg');

/*-----Functions-----*/

//Function to show loading spinner while waiting for API response
function showSpinner() {
    //Check if spinner element exists
    if (!spinner) return;
    //show spinner
    spinner.classList.remove('hidden');
    spinner.setAttribute('aria-hidden', 'false');
    // Will disable controls while loading
    searchBtn.disabled = true;
    artistSearch.disabled = true;

    //Setting timer to hide spinner after 90 seconds in case of network issues to then allow user to try again
    window.spinnerTimeout = setTimeout(() => {
        hideSpinner();
        setError('Request timed out due to Server wake up. Please try again by clicking the search button.');
    }, 90000);
};

//Function to hide loading spinner once API response is received
function hideSpinner() {
    
    //Clear timeout if spinner is hidden before timeout occurs
    if (window.spinnerTimeout) {
        clearTimeout(window.spinnerTimeout);
        window.spinnerTimeout = null;
    }

    if (!spinner) return;
    //hide spinner
    spinner.classList.add('hidden');
    spinner.setAttribute('aria-hidden', 'true');
    searchBtn.disabled = false;
    artistSearch.disabled = false;
};

//Function to set status message
function setStatus(message = '') {
    statusMsg.textContent = message;
}
//Function to set error message
function setError(message = '') {
    errorMsg.textContent = message;
}

//Remove HTML from Last.fm API summary text
function cleanHtml(html = '') {
    return html.replace(/<[^>]*>/g, '').trim();
}


//Function to search for artist using the API, must be async to wait for fetch
async function searchArtist(artistName) {

    //clear previous results and set messages
    setError('');
    setStatus('');
    artistInfo.innerHTML = '';
    artistInfo.hidden = true;
    albumGrid.innerHTML = '';
    albumGrid.hidden = true;
    artistResults.innerHTML = '';
    artistResults.hidden = true;
    albumDetails.hidden = true;

    //Show loading spinner while fetching data
    showSpinner();

    //fetch artist data from the API, using try catch to handle errors
    try {
        //Fetch artist search results from API, using backend API proxy 
        const dataResponse = await fetch(API_URL + '?method=artist.search&artist=' + encodeURIComponent(artistName));

        //Check if response is ok, if not throw error
        if (!dataResponse.ok) throw new Error('Returned with status ' + dataResponse.status);
        //Parse JSON data from response
        const data = await dataResponse.json();
        //get array of artists from data
        const artistListInfo = data?.results?.artistmatches?.artist;

        //Check if artistListInfo is an array or single object
        const artistList = Array.isArray(artistListInfo) ? artistListInfo : (artistListInfo ? [artistListInfo] : []);

        //Check if artist was not found display error message
        if (artistList.length === 0) {
            setError('No artist found with that name');
            hideSpinner();
            return;
        }
        //Hide spinner once data is fetched
        hideSpinner();
        //Display artist results to click on
        displayArtistResults(artistList);
        setStatus('Found ' + artistList.length + ' artists matching "' + artistName + '". Please click on an artist to view more info.');

    } catch (err) {
        hideSpinner();
        setError('Error fetching artist data: ' + err.message);
        return;
    };
};

//Funtion to display artist names to click on from search results
function displayArtistResults(artistList) {
    //clear previous results
    artistResults.innerHTML = '';
    artistResults.hidden = false;
    //For each artist in the list, create a div with their name, that is clickable
    artistList.forEach(artist => {
        //Create div element for artist name
        const div = document.createElement('div');
        //Set class name for styling
        div.className = 'artist-search-result';
        //Make div focusable
        div.tabIndex = 0;
        //Set div text content to artist name and listeners if available
        div.textContent = `${artist.name} ${artist.listeners ? `(${artist.listeners} listeners)` : ''}`;

        //When artist name is clicked, fetch and display their info
        div.addEventListener('click', () => {
            fetchArtistInfo(artist.name);
        });
        //Also allow enter key to fetch artist info when focused
        div.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                fetchArtistInfo(artist.name);
        });
        //Append the div to the artist results section
        artistResults.appendChild(div);
    });
};

//Function to fetch and display artist info and albums
async function fetchArtistInfo(artistName) {
    //clear previous album results and set messages
    setError('');
    setStatus('');
    artistInfo.innerHTML = '';
    artistInfo.hidden = true;
    albumGrid.innerHTML = '';
    albumGrid.hidden = true;
    albumDetails.hidden = true;

    //Show loading spinner while fetching data
    showSpinner();

    //try catch to handle errors during fetch
    try {
        //Fetch artist info from API, using backend API proxy
        const infoResponse = await fetch(API_URL + '?method=artist.getinfo&artist=' + encodeURIComponent(artistName));

        //check infoResponse is ok, if not throw error
        if (!infoResponse.ok) throw new Error('Server returned status ' + infoResponse.status);
        const data = await infoResponse.json();
        const artist = data?.artist;

        //Check if artist info was found, if not show error message
        if (!artist) {
            setError('No info found for artist: ' + artistName);
            hideSpinner();
            return;
        }
        //Hide spinner once data is fetched
        hideSpinner();

        //Show artist info section
        artistInfo.hidden = false;
        //Create elements to display artist info
        const artistDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.textContent = artist.name;
        artistDiv.appendChild(title);

        const stats = document.createElement('p');
        stats.className = 'muted';
        //display listeners and playcount, with fallback if not available
        stats.textContent = `Listeners: ${artist.stats?.listeners ?? 'N/A'} | Playcount: ${artist.stats?.playcount ?? 'N/A'}`;
        artistDiv.appendChild(stats);

        const bioText = document.createElement('p');
        //Clean HTML from bio summary or content
        bioText.textContent = cleanHtml(artist.bio?.summary || artist.bio?.content || 'No biography available.');
        artistDiv.appendChild(bioText);

        artistInfo.appendChild(artistDiv);

        //Fetch artist's top albums from API, using backend API proxy
        const albumsResponse = await fetch(API_URL + '?method=artist.gettopalbums&artist=' + encodeURIComponent(artistName));

        //simillar check as before, if not ok throw error
        if (!albumsResponse.ok) throw new Error('Server returned status ' + albumsResponse.status);
        const albumsData = await albumsResponse.json();
        const albumsInfo = albumsData?.topalbums?.album;

        //Check if albums were found as array or single object
        const albums = Array.isArray(albumsInfo) ? albumsInfo : (albumsInfo ? [albumsInfo] : []);
        //If no albums found, show message
        if (albums.length === 0) {
            setStatus('No albums found for artist: ' + artistName);
            hideSpinner();
            return;
        }

        //Display albums in grid
        displayAlbums(albums, artistName);
        setStatus('Found ' + albums.length + ' albums for artist "' + artistName + '". Click on an album to view the details.');
        hideSpinner();
    }
    catch (err) {
        hideSpinner();
        setError('Error fetching artist info: ' + err.message);
        return;
    };

};

//Function to display albums in grid
function displayAlbums(albums, artistName) {
    //clear previous album results and show album grid  
    albumGrid.hidden = false;
    albumGrid.innerHTML = '';
    //For each album, create a div with album art and name
    albums.forEach(album => {
        const albumCard = document.createElement('article');
        albumCard.className = 'album-card';
        albumCard.tabIndex = 0;

        //Display album art
        const albumImg = document.createElement('img');
        //Use large size image from API, with fallback if not available
        albumImg.src = album.image?.[3]['#text'] || 'images/place_holder_album_img.jpg';
        albumImg.alt = `Album art for ${album.name} by ${artistName}`;
        albumCard.appendChild(albumImg);

        //Display album name
        const albumTitle = document.createElement('h3');
        albumTitle.textContent = album.name;
        albumCard.appendChild(albumTitle);

        //Display playcount with fallback
        const info = document.createElement('p');
        info.className = 'muted';
        info.textContent = `Playcount: ${album.playcount || 'N/A'}`;
        albumCard.appendChild(info);

        //When album is clicked, fetch and display album details
        albumCard.addEventListener('click', () => {
            fetchAlbumDetails(artistName, album.name);
        });
        //Also allow enter key to fetch album details when focused
        albumCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                fetchAlbumDetails(artistName, album.name);
        });

        //Append album card to album grid
        albumGrid.appendChild(albumCard);
    });

};

//Function to fetch and display album details
async function fetchAlbumDetails(artistName, albumName) {
    //clear previous album details and set messages
    setError('');
    setStatus('');
    albumDetails.innerHTML = '';
    albumDetails.hidden = false;
    showSpinner();

    //try catch to handle errors during fetch
    try {
        //Fetch album info from API, using backend API proxy
        const albumDetailsResponse = await fetch(API_URL + '?method=album.getinfo&artist=' + encodeURIComponent(artistName) + '&album=' + encodeURIComponent(albumName));
        if (!albumDetailsResponse.ok) throw new Error('Server returned status ' + albumDetailsResponse.status);
        const albumData = await albumDetailsResponse.json();
        const album = albumData?.album;
        if (!album) {
            setError('No details found for album: ' + albumName);
            hideSpinner();
            return;
        }
        //Hide spinner once data is fetched
        hideSpinner();

        //Create elements to display album details
        const header = document.createElement('div');
        const title = document.createElement('h4');
        title.textContent = `${album.name} — ${album.artist}`;
        header.appendChild(title);
        //Display album summary if available
        if (album.wiki?.summary) {
            const summary = document.createElement('p');
            summary.className = 'muted';
            summary.textContent = cleanHtml(album.wiki.summary);
            header.appendChild(summary);
        }
        //Append header to album details section
        albumDetails.appendChild(header);

        //Display track list if available
        const tracks = album.tracks?.track;
        //Check if tracks exist
        if (!tracks || tracks.length === 0) {
            const noTracksMsg = document.createElement('p');
            noTracksMsg.textContent = 'No tracks found for this album.';
            albumDetails.appendChild(noTracksMsg);
            return;
        }
        //Create track list
        const trackList = tracks.length ? tracks : [tracks];
        //For each track, create a div with track name
        trackList.forEach((track, index) => {
            const trackItem = document.createElement('div');
            trackItem.className = 'track';
            trackItem.textContent = `${index + 1}. ${track.name}`;
            albumDetails.appendChild(trackItem);
        });

    } catch (err) {
        hideSpinner();
        setError('Error fetching album details: ' + err.message);
        return;
    };
};

/*-----Event Listeners-----*/

//When search button is clicked, call searchArtist function, using event listener
searchBtn.addEventListener('click', () => {
    const artistName = artistSearch.value.trim();
    // Validation to check if input is empty, if so show error message
    if (!artistName) {
        setError('You must enter an artist name!');
        return;
    }
    //call searchArtist function with the artist name from input
    searchArtist(artistName);

});

//When enter keydown while in the search input, call searchArtist function instead of just using button
artistSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const artistName = artistSearch.value.trim();
        if (!artistName) {
            setError('You must enter an artist name!');
            return;
        };
        searchArtist(artistName);
    }
});
# **Konrad's Musical Journey Search** 

Welcome to my Musical Jouney Search Repo. This was my second project for my Dynamic Web Applications with Javascript Course. This project focused on being able to utilize AJAX to fetch information from an API, to display information to the user. In this case I utilized the LastFM api: https://www.last.fm/api to provide music artist infomartion, such as their descriptions, listner count, produced albums, and album information. This is to allow the user of my site to search any artist name to get their information that is available from Last.fm.

## Key Features

The Key Features are:

1. Ability to search for Music Artist off name
2. View Various Different Artist Information
3. View a selected artist tob albums
4. View an album's tracks and information
5. Validation, such as no empty text in search bar
6. Error handling with messages, and Status Messages
7. Accessibility features such as keyboard navigation and screen reader
8. Simple, clean grid/card design responsive to many different screen sizes

## project structure

```
├── index.html              # Main HTML page with flow structure
├── app.js                  # Frontend JavaScript (the brain) - API calls and DOM manipulation
├── styles.css              # CSS styling with responsive grid layout using cards
├── server.js               # Backend Express server to proxy Last.fm API (to hide API key)
├── package.json            # Node.js dependencies (express, cors, dotenv)
├── package-lock.json       # Locked dependencies versions for consistent installs
├── .env                    # Environment variables (API key - not in git)
├── .gitignore              # Excludes node_modules and .env from version control
└──  images/                # Placeholder images for missing album art and screenshots
        ├── place_holder_album_img.jpg
        ├──
        └── 
```

## How Can I run It?

### Live Links

- GitHub Pages (for frontend): https://konradszulc.github.io/Musical_Journey_Search_JS_Project_2/
- Render Backend (for API proxy): https://musical-journey-search-js-project-2.onrender.com/api/lastfm

NOTE: Render deployment is on free version thus will sleep due to inactivity until called upon, before testing give some time for backend to boot up. After it is up and running, requests will be faster.

### Local Testing (how to deploy)

1. Clone the repository:
    ```bash
    git clone
    cd 
    ```

2. Go into Code editor
    ```bash
    code .
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a '.env' file to put your own API key inside:
    ```
    LASTFM_API_KEY="your_api_key_here"
    ```
    API Key can be given at https://www.last.fm/api

5. Start the backend server:
    ```bash 
    npm start
    ```

6. Open `index.html` in your browser or use the Live Server Extension

7. Enjoy Searching and Open developer tools to view console logs and verify no errors

    - For Windows press F12 or CTRL + SHIFT + I
    - For Mac press CMD + OPTION + I

## Screenshots


## Self Assesment

### Core functionality and usability (10 points)

-Primary User Stories: no blockers, search, repeat search, and recieve results all clear (4pts)
-Result Quality: Specifically brings up ALbums and info related to selected Artist name (3 pts)
-Error and Edge Cases: Validation for empty name, displays error messages if fetch does not work, has loading spinner to show state during fetch commands, though noticed some hiccups in speed (1.5pts)
-Retry and Navigation: Can search as much as needed without needing to refresh, no broken links (1pt)

points: 9.5/10

### API integration and data handling (8 points)

-Request Construction: Uses correct API endpoints and Query parameters (methods) as shown on Last.fm website, API is hidden in backend proxy (3pts)
-Parsing and Selection: Grabs most needed info like artist name, and album however, maybe grabs too many results such as artist name with collaborations (1pt)
-Error Handling for API: checks for null values, checks if values are array or single object, shows error in any case of no data fetched (2pts)
-Polite Usage: only fetches on needed functions (1pt)

points: 7/8

### Front end layout and interaction (5 points)

-Layout and Grouping: Search, results, and info clearly seperated, Page easy to scan, may be to minimal for some (1.5pt)
-Interaction: Shows results seamlessly, shows loading indicator for user engagement (1pt)
-Responsiveness: Clean layout, no broken overflow, works on lower size screens and still usable (1pt)
-Visual Consistency: CSS styles are consistent throughout whole app (1pt)

points: 4.5/5

### Code quality and architecture (5 points)

-Structure: Files organized and shown in readme, barely any folders, may have been useful (1pt)
-Naming and Comments: Meaningful names to display intent, lots of comments could be too much depenging on person perspective (.5pt)
-Logic and Flow: flow is self explantory similar structure to display, only nessecary functions (1pt)
-Basic Defensive Coding: has input validation for API calls, Try-catch blocks for error catching. (1pt)

points: 3.5/5

### Documentation (2 points)

-README essentails: Has feature list, all other essentials, API mention and usage details (1pt)
-Clarity and Reflection Text: Provided insightful reflection of lessons learned, limitations and future (1pt)

points: 2/2

### Demo video and Git portfolio (5 points)

-Video Structure and Clarity:
-Evidence in Video:
-Git Portfolio Quality: Repo is clean, .gitignore is in place, no secrets or API's, no commits story due to working locally (.5pts)
-Links and Access: Links fully operational and Given to proper areas (1pt)

points:

### Total Points

Points: /35

## Reflection

As the course comes to an end, this project put to the test various amounts of knowledge that we have had to demonstrate throughout the course.However, more prominently the new skill of using AJAX to dynamically and asynchronously update the page by fetching data from an API was quite the fun challenge. The ability to smoothly update a page with a wide amount of information because of an API was very satisfying. As well, I found that our previous project 1 greatly helped to understand and implement the general structure. In my case with developing option 2, I early on understood, that first I would want to search, which then would need to display the search results, next would be displaying the albums of the artist to fulfill the requirements of the task. However I noticed that Last.fm API provides various different information to the artists that by display could add some additional personality to my webpage. This being listener numbers, play counts, text descriptions of albums and the artist, and of course track list. Thus, I included an aditional section that is created when searching the artist to give a description if it is available. As well, the ability to click on one of the albums display to then show the track list on that album if available. This also gave me insight on the many skills I am skill lacking however, as the API can provide so much more information, yet I could not use it all, for example the time amounts of the tracks or the issue I had with some pictures not being found for albums. While it can be disheartening at first to struggle understanding or trying to implement a feature, by constantly trying and eventually understanding the concepts skills will improve, and provides excitement for future projects or even to improve on this one in the future. In addition, while I find the accessibility and visual clarity good, there can be improvements upon reflection such as additonal headers to make more clear what each section is about on quick glance. Though I am happy to have the sections hidden until a search is made. CSS is definetly a skill I have to continue improving, as I lack the eye for it, but project 1 helped me to develop a similar style for this project with using cards and features like overflow to provide scrolling, instead of one long page.

I am also happy to continue learning about understanding the parseing of JSON, and how data is structured in such a way to easily be pulled and read for purposes such as this app. Implementing constant validation checks to make sure the user or even the developer what is currently  happening in the system, such as a spinner to indicate the webpage is not stuck but loading, or status and error messages to display exactly what is happening. These are all important concepts because it makes debugging processes easier when also using console.log to see what info is being pulled or general testing of the app. There is still alot to learn especially, having some struggles on the backend side, but nonetheless as we heavily focused on the frontend my progress has greatly increased, and I am overjoyed by the structured content of this course to be able to develop, debugg and deploy webpages such as these.

## Video-Time Stamps
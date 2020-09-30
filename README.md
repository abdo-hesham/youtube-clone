## Scripts to run:

If the API is not responding, then most likely the current api key have exceeded its daily quota. If that happens, then you'll be needing a new youtube api key, it's easy to generate

### 1. `Get a Youtube API key -You might not need it-`

1. visit [Youtube developers console](https://console.developers.google.com/)
2. Sign in with your google account
3. Agree to terms
4. Click `Create new project`
5. Click `Enable APIs and Services`
6. Scroll down and choose `Youtube Data API V3`
7. Click `Enable`
8. On your left side, click `Credentials`
9. Click `Create Credentials`
10. Copy the generated key and paste it to this project in the followin path: `src/api/index.js` as apikey value.
11. Happy hacking!

### 2. `npm install`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### 3. `npm start`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Feedback is appreciated!

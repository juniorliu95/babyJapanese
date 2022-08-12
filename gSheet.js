// functions for using google sheet as a dataset

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '796110167702-gqjj1nnq6p2nnhn5ceknviheu4kn8onp.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAcW3B012HOLfv6sqj0tD-L8sJy0g5Uadk';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  function intializeGapiClient() {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    console.log("initialized");
  };

/**
       * Callback after Google Identity Services are loaded.
       */
 function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
    console.log("gis loaded");
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
    }; // define callback

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
    console.log("auth 2.0 done...");
  }


// read single range values
function getValues(spreadsheetId, range, callback) {
    let result;
    try {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      }).then((response) => {
        result = response.result;
        const numRows = result.values ? result.values.length : 0;
        console.log(`${numRows} rows retrieved.`);
        if (callback) callback(response);
      });
    } catch (err) {
        console.log(err.message);
    }
    return result.values;
  }

// write single range Values
function updateValues(spreadsheetId, range, valueInputOption, _values, callback) {
    let values = [
      [
        // Cell values ...
      ],
      // Additional rows ...
    ];
    values = _values;
    const body = {
      "values": values,
    };
    try {
      gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: valueInputOption,
        resource: body,
      }).then((response) => {
        const result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        if (callback) callback(response);
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
  }

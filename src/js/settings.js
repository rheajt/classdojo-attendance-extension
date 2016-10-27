document.addEventListener('DOMContentLoaded', loadApi);
var pickerLoaded = false;

function loadApi() {
  //load the gapi.client
  gapi.load('client', getSettings);

  gapi.load('picker', function() {
    pickerLoaded = true;

    document.getElementById('pick-spreadsheet').addEventListener('click', pickSheet);
  });

  //add submit event to form
  document.getElementById('settings').addEventListener('submit', saveSettings);
  document.getElementById('create-new').addEventListener('click', createAttendanceSheet);
}


function getSettings() {
  chrome.storage.sync.get(function(items) {
    document.getElementById('attendance_taker').value = items.attendance_taker || '',
    document.getElementById('your_email').value = items.your_email || '';
    document.getElementById('spreadsheet-id').value = items.spreadsheet_data || '';
  });
}


function createAttendanceSheet() {
  chrome.identity.getAuthToken(function(token) {
    gapi.auth.setToken({
      access_token: token
    });

    gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(function(e) {
      var year = new Date().getFullYear();

      gapi.client.sheets.spreadsheets.create({
        "properties": {
          "title": "CLASS ROSTER FOR " + year + " / " + (year + 1)
        },
        "sheets": {
          "properties": {
            "title": "ATTENDANCE"
          },
          "data": [
            {
              "startRow": 0,
              "startColumn": 0,
              "rowData": {
                "values": [
                  {
                    "userEnteredValue": {
                      "stringValue": "STUDENT NAME"
                    }
                  },
                  {
                    "userEnteredValue": {
                      "stringValue": "ABSENTS"
                    }
                  },
                  {
                    "userEnteredValue": {
                      "stringValue": "LATES"
                    }
                  }
                ]
              }
            }
          ]
        }
      }).then(function(response) {
        document.getElementById('spreadsheet-id').value = response.result.spreadsheetId;
      });

    });

  });
};

function pickSheet() {
  if(pickerLoaded) {
    chrome.identity.getAuthToken(function(token) {
      var origin = window.location.protocol + '//' + window.location.host;
      var picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .hideTitleBar()
        .setOAuthToken(token)
        .setDeveloperKey('AIzaSyCdg9xLMDhxoBEkxDM8vVAbreGgPM_Qo9Y')
        .setOrigin(origin)
        .setSize(598, 423)
        .setCallback(pickerCallback)
        .build();

      picker.setVisible(true);

    })
  }
}

function pickerCallback(data) {
  var action = data[google.picker.Response.ACTION];
  if (action == google.picker.Action.PICKED) {
    var id = data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];

    document.getElementById('spreadsheet-id').value = id;

  } else if (action == google.picker.Action.CANCEL) {
    console.log('picker cancel');
  }
}

function saveSettings(e) {

  e.preventDefault();

  chrome.storage.sync.set({
    attendance_taker: document.getElementById('attendance_taker').value,
    your_email: document.getElementById('your_email').value,
    spreadsheet_data: document.getElementById('spreadsheet-id').value
  }, function() {
    window.close();
  });

}

*/

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
    document.getElementById('attendance_taker').value = items.attendance_taker,
    document.getElementById('your_email').value = items.your_email;
    document.getElementById('spreadsheet-id').value = items.spreadsheet_data;
    document.getElementById('picker-result').innerHTML = '<p>Spreadsheet ID: ' + items.spreadsheet_data + '</p>';
  });
}


function createAttendanceSheet() {
  chrome.identity.getAuthToken(function(token) {
    gapi.auth.setToken({
      access_token: token
    });

    gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(function(e) {
      gapi.client.sheets.spreadsheets.create({
        "properties": {
          "title": "My test API spreadsheet"
        }
      }).then(function(response) {
        document.getElementById('spreadsheet').innerHTML = '<input type="text" id="spreadsheet_data" value="'+response.result.spreadsheetId+'" disabled />';
      });

    });

  });
};

function pickSheet() {
  if(pickerLoaded) {
    chrome.identity.getAuthToken(function(token) {

      var picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .hideTitleBar()
        .setOAuthToken(token)
        .setDeveloperKey('AIzaSyCZ7K3DuHyH0i8tIPoRa5Zh0hGsIVLMA-0')
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

    document.getElementById('picker-result').innerHTML = '<p>Spreadsheet ID: ' + id + '</p>';
    document.getElementById('spreadsheet-id').value = id;

  } else if (action == google.picker.Action.CANCEL) {
    document.getElementById('picker-result').innerHTML = 'Picker canceled.';
  }
}

function saveSettings(e) {

  e.preventDefault();

  chrome.storage.sync.set({
    attendance_taker: document.getElementById('attendance_taker').value,
    your_email: document.getElementById('your_email').value,
    spreadsheet_data: document.getElementById('spreadsheet-id').value
  }, function() {
    document.getElementById('settings').style.display = "none";
  });

}

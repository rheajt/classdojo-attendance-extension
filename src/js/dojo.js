//saved data
var data;

function loadData() {
  //get the saved user information
  chrome.storage.sync.get(function(items) {
    data = items;

    if(data.attendance_taker) {
      document.getElementById('email-control').style.display = 'block';
      document.getElementById('attendance').addEventListener('click', composeEmail);
    }

    if(data.spreadsheet_data) {
      document.getElementById('spreadsheet-control').style.display = 'block';
      document.getElementById('spreadsheet').addEventListener('click', writeToSheet);
    }
  });
}

function composeEmail() {
  chrome.tabs.executeScript({
    code: 'composeEmail("' + data.attendance_taker + '","' + data.your_email + '")'
  });
}

function writeToSheet() {
  chrome.identity.getAuthToken(function(token) {
    gapi.load('client', function() {

      gapi.auth.setToken({
        access_token: token
      });

      gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(function(e) {
        var absentStudents, allStudents;

        gapi.client.sheets.spreadsheets.values.get({
          "spreadsheetId": data.spreadsheet_data,
          "range": "Roster!A2:D1000"
        }).then(function(response) {
          roster = response.result.values;

          chrome.tabs.executeScript({
            code: 'getStudents()'
          }, function(students) {
            absentStudents = students[0].absent;
            lateStudents = students[0].late;

            roster.forEach(function(each) {
              for(var i = 0; i < absentStudents.length; i++) {
                if(absentStudents[i] === each[0]) {
                  if(isNaN(each[1])) {
                    each[1] = 1;
                  } else {
                    +each[1]++;
                  }
                }
              }

              for(var j = 0; j < lateStudents.length; j++) {
                if(lateStudents[j] === each[0]) {
                  if(isNaN(each[2])) {
                    each[2] = 1;
                  } else {
                    +each[2]++;
                  }
                }
              }

            });

            var updateSheet = gapi.client.sheets.spreadsheets.values.update({
              "spreadsheetId": data.spreadsheet_data,
              "range": "Roster!A2:D1000",
              "valueInputOption": "USER_ENTERED",
              "resource": {
                "range": "Roster!A2:D1000",
                "majorDimension": "ROWS",
                "values": roster
              }
            });

            updateSheet.execute(function(response) {console.log(response);});
          });
        });

      });
    });

  });
}

document.addEventListener('DOMContentLoaded', loadData);

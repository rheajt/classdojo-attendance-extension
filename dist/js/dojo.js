function loadData(){chrome.storage.sync.get(function(e){data=e,data.attendance_taker&&(document.getElementById("email-control").style.display="block",document.getElementById("attendance").addEventListener("click",composeEmail)),data.spreadsheet_data&&(document.getElementById("spreadsheet-control").style.display="block",document.getElementById("spreadsheet").addEventListener("click",writeToSheet))})}function composeEmail(){chrome.tabs.executeScript({code:'composeEmail("'+data.attendance_taker+'","'+data.your_email+'")'})}function writeToSheet(){chrome.identity.getAuthToken({interactive:!0,scopes:["https://www.googleapis.com/auth/spreadsheets"]},function(e){gapi.load("client",function(){gapi.auth.setToken({access_token:e}),gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4").then(function(e){var t;gapi.client.sheets.spreadsheets.values.get({spreadsheetId:data.spreadsheet_data,range:"ATTENDANCE!A2:D1000"}).then(function(e){roster=e.result.values,chrome.tabs.executeScript({code:"getStudents()"},function(e){t=e[0].absent,lateStudents=e[0].late,roster.forEach(function(e){for(var a=0;a<t.length;a++)t[a]===e[0]&&(isNaN(e[1])?e[1]=1:+e[1]++);for(var n=0;n<lateStudents.length;n++)lateStudents[n]===e[0]&&(isNaN(e[2])?e[2]=1:+e[2]++)});var a=gapi.client.sheets.spreadsheets.values.update({spreadsheetId:data.spreadsheet_data,range:"ATTENDANCE!A2:D1000",valueInputOption:"USER_ENTERED",resource:{range:"ATTENDANCE!A2:D1000",majorDimension:"ROWS",values:roster}});a.execute(function(e){console.log(e)})})})})})})}var data;document.addEventListener("DOMContentLoaded",loadData);
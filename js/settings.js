var jQuery = require('jquery');

(function($) {

  var token, pickerLoaded = false;

  function init() {
    gapi.load('client');
    gapi.load('picker', function() {
      pickerLoaded = true;
      $('#pick-spreadsheet').click(pickerSpreadsheet);
    });

    chrome.storage.sync.get(function(items) {
      //set values
      $('#attendance_taker').val(items.attendance_taker);
      $('#your_email').val(items.your_email);
      $('#spreadsheet_name').val(items.spreadsheet_data.name);
      $('#spreadsheet_id').val(items.spreadsheet_data.id);

      //click events
      $('#settings').submit(saveSettings);
    })
  }

  function saveSettings(e) {
    e.preventDefault();
    chrome.storage.sync.set({
      attendance_taker: $('#attendance_taker').val(),
      your_email: $('#your_email').val(),
      spreadsheet_data: {
        name: $('#spreadsheet_name').val(),
        id: $('#spreadsheet_id').val()
      }
    }, function() {
      window.close();
    });
    return false;
  }

  function pickerSpreadsheet() {
    if(pickerLoaded) {
      chrome.identity.getAuthToken({interactive:true}, function(token) {
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
      var spreadsheet = {
        id: data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID],
        filename: data[google.picker.Response.DOCUMENTS][0][google.picker.Document.NAME]
      };

      $('#spreadsheet_name').val(spreadsheet.filename);
      $('#spreadsheet_id').val(spreadsheet.id);

    }
  }

  init();
})(jQuery);

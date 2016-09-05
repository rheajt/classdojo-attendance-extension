document.addEventListener('DOMContentLoaded', function() {

  var pickerKey = 'AIzaSyBbMegiYI1hYSSf02dls5TzgmHSkflfT6k';

  chrome.storage.sync.get({
    attendance_taker: 'who_gets_the_attendance@your_school.com',
    your_email: 'your_email@address.com'
  }, function(items) {
    document.getElementById('attendance_taker').value = items.attendance_taker,
    document.getElementById('your_email').value = items.your_email
  });

  document.getElementById('settings').addEventListener('submit', function(e) {

    e.preventDefault();

    chrome.storage.sync.set({
      attendance_taker: document.getElementById('attendance_taker').value,
      your_email: document.getElementById('your_email').value
    }, function() {
      console.log('settings saved');
    });
  })
})

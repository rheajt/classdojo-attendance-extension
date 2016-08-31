
document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.executeScript({
    file: 'getData.js'
  })

  var emails;

  //get the stored emails
  chrome.storage.sync.get({
    attendance_taker: 'to@yourschool.com',
    your_email: 'yourcopy@yourschool.com'
  }, function(items) {
    attendanceTaker = items.attendance_taker || 'Not set yet.',
    yourEmail = items.your_email || 'Not set yet.'

    document.getElementById('attendance-email').innerHTML = attendanceTaker;
    document.getElementById('your-email').innerHTML = yourEmail;
  });

  document.getElementById('attendance').addEventListener('click',  function() {
    chrome.tabs.executeScript({
      code: 'getAbsent("' + attendanceTaker + '","' + yourEmail + '")'
    })
  })

  document.getElementById('lates').addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: 'getLates("' + attendanceTaker + '","' + yourEmail + '")'
    })
  })

})

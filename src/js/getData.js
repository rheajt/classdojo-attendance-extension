function getStudents() {

  var students = {
    "absent": [],
    "late": []
  };

  var markedAbsentStudents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/be0f7a34ef27e82a28e9005115e57754.png\']");
  var markedLateStudents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/a88b6d72d410a8cea1d8ab18a04c44d4.png\']");

  //fill in the students object
  if(markedAbsentStudents.length) {
    for(var i = 0; i < markedAbsentStudents.length; i++) {
      var fname=markedAbsentStudents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
          lname=markedAbsentStudents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

      students.absent.push(fname+" "+lname);
    }
  }

  if(markedLateStudents.length) {
    for(var i = 0; i < markedLateStudents.length; i++) {
      var fname=markedLateStudents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
          lname=markedLateStudents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

      students.late.push(fname+" "+lname);
    }
  }

  return students;
}

function composeEmail(to, bcc, sendLate, sendAbsent) {
  if(to) {
    var className = document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,
        students = getStudents(),
        mailtoLine = [];

    //who the email is going to
    mailtoLine.push('mailto:'+encodeURIComponent(to));

    //if there is a bcc field add it
    if(bcc) {
      mailtoLine.push('?bcc='+encodeURIComponent(bcc)+'&');
    } else {
      mailtoLine.push('?');
    }

    //subject line
    mailtoLine.push('subject=' + encodeURIComponent('Attendance from ' + className + ' on ' + new Date().toDateString()));

    if(sendAbsent == 'true') {
      //body line
      if(students.absent.length) {
        mailtoLine.push('&body=' + encodeURIComponent('Absent today from ' + className + ':\r\n' + students.absent.join('\r\n')));
      } else {
        mailtoLine.push('&body=' + encodeURIComponent('No students were absent today in ' + className));
      }
      mailtoLine.push(encodeURIComponent('\r\n\r\n'));
    }

    if(sendLate == 'true') {
      if(students.late.length) {
        mailtoLine.push('&body=' + encodeURIComponent('Late today in ' + className + ':\r\n' + students.late.join('\r\n')));
      } else {
        mailtoLine.push('&body=' + encodeURIComponent('No students were late today in ' + className));
      }
    }

    window.open(mailtoLine.join(''), '_blank');
  }
}

function getAbsent(to, from) {
  if(to) {
    var className = document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML;
    var absentStudents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/be0f7a34ef27e82a28e9005115e57754.png\']");
    var mailtoLine = [];

    //who the email is going to
    mailtoLine.push('mailto:'+encodeURIComponent(to));

    //if there is a bcc field add it
    if(from) {
      mailtoLine.push('?bcc='+encodeURIComponent(from)+'&');
    } else {
      mailtoLine.push('?');
    }

    //subject line
    mailtoLine.push('subject=' + encodeURIComponent('Absent students from ' + className));

    //body line
    if(absentStudents.length) {
      mailtoLine.push('&body=' + encodeURIComponent('Todays date is ' + new Date().toDateString() + ' and these students are absent today:\r\n'));
      for(var i = 0; i < absentStudents.length; i++) {
        var fname=absentStudents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
            lname=absentStudents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

        mailtoLine.push(encodeURIComponent(fname+" "+lname+'\r\n'));
      }
    } else {
      mailtoLine.push('&body=' + encodeURIComponent('No students absent today'));
    }

    window.open(mailtoLine.join(''), '_blank');
  }
}

function getLates(to, from) {
  if(to) {
    var className = document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,
        lateStudents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/a88b6d72d410a8cea1d8ab18a04c44d4.png\']"),
        mailtoLine = [];

    //who the email is going to
    mailtoLine.push('mailto:'+encodeURIComponent(to));

    //if there is a bcc field add it
    if(from) {
      mailtoLine.push('?bcc='+encodeURIComponent(from)+'&');
    } else {
      mailtoLine.push('?');
    }

    //subject line
    mailtoLine.push('subject=' + encodeURIComponent('Late students from ' + className));

    //body line
    if(lateStudents.length) {
      mailtoLine.push('&body=' + encodeURIComponent('Todays date is ' + new Date().toDateString() + ' and these students were late to class today:\r\n'));
      for(var i = 0; i < lateStudents.length; i++) {
        var fname=lateStudents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
            lname=lateStudents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

        mailtoLine.push(encodeURIComponent(fname+" "+lname+'\r\n'));
      }
    } else {
      mailtoLine.push('&body=' + encodeURIComponent('No students were late today'));
    }

    window.open(mailtoLine.join(''), '_blank');
  }
}

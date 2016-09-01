function getAbsent(to, from) {
  var subjectLine="Absent Students from " + document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,
      absents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/be0f7a34ef27e82a28e9005115e57754.png\']"),
      bodyLine = [ "Todays date is " + new Date().toDateString()+" and these students are absent today:" ];



  for(var i = 0; i < absents.length; i++) {
    var fname=absents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
        lname=absents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

    bodyLine.push(fname+" "+lname);
  }

  if(bodyLine.length===0){
    bodyLine.push( "No absent students.")
  }

  if(from) {
    from = "?bcc=" + from;
  } 

  window.open("mailto:" + to + from + "?subject=" +subjectLine+ "&body="+ encodeURIComponent(bodyLine.join("\r\n")), '_blank');

}

function getLates(to, from) {
  var subjectLine="Late Students from " + document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,
      absents = document.querySelectorAll("div > div > div > img[src=\'https://teach-static.classdojo.com/a88b6d72d410a8cea1d8ab18a04c44d4.png\']"),
      bodyLine = ["Todays date is " + new Date().toDateString()+" and these students are late today:"];

  for(var i = 0; i < absents.length; i++) {
    var fname=absents[i].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,
        lname=absents[i].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;

    // bodyLine.push(fname+" "+lname);
    bodyLine.push(fname + " " + lname);
  }

  if(bodyLine.length===0){
    bodyLine.push("No absent students.");
  }

  if(from) {
    from = "?bcc=" + from;
  }

  window.open("mailto:" + to + from + "?subject=" +subjectLine+ "&body="+ encodeURIComponent(bodyLine.join('\r\n')), '_blank');

}

function getAbsent(e,n){if(e){var t=document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,o=document.querySelectorAll("div > div > div > img[src='https://teach-static.classdojo.com/be0f7a34ef27e82a28e9005115e57754.png']"),i=[];if(i.push("mailto:"+encodeURIComponent(e)),n?i.push("?bcc="+encodeURIComponent(n)+"&"):i.push("?"),i.push("subject="+encodeURIComponent("Absent students from "+t)),o.length){i.push("&body="+encodeURIComponent("Todays date is "+(new Date).toDateString()+" and these students are absent today:\r\n"));for(var d=0;d<o.length;d++){var s=o[d].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,a=o[d].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;i.push(encodeURIComponent(s+" "+a+"\r\n"))}}else i.push("&body="+encodeURIComponent("No students absent today"));window.open(i.join(""),"_blank")}}function getLates(e,n){if(e){var t=document.querySelector("#reactApplication > div > div > header > div > div:nth-child(2) > div").innerHTML,o=document.querySelectorAll("div > div > div > img[src='https://teach-static.classdojo.com/a88b6d72d410a8cea1d8ab18a04c44d4.png']"),i=[];if(i.push("mailto:"+encodeURIComponent(e)),n?i.push("?bcc="+encodeURIComponent(n)+"&"):i.push("?"),i.push("subject="+encodeURIComponent("Late students from "+t)),o.length){i.push("&body="+encodeURIComponent("Todays date is "+(new Date).toDateString()+" and these students were late to class today:\r\n"));for(var d=0;d<o.length;d++){var s=o[d].parentElement.parentElement.previousSibling.firstChild.firstChild.innerHTML,a=o[d].parentElement.parentElement.previousSibling.lastChild.firstChild.innerHTML;i.push(encodeURIComponent(s+" "+a+"\r\n"))}}else i.push("&body="+encodeURIComponent("No students were late today"));window.open(i.join(""),"_blank")}}
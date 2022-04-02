function professor_request(prof, ep) {
  var xhr = new XMLHttpRequest();
  ep.innerText = "Loading...";
  prof.forEach((p) => {
    xhr.open(
      "GET",
      "https://tatekan.copynight.net/user/research_professor?prof_name=" +
        encodeURIComponent(p)
    );

    xhr.onload = function () {
      if (xhr.responseText == "") {
        ep.innerText = "";
        ep.appendChild(document.createTextNode(p));
        ep.appendChild(document.createElement("br"));
      } else {
        ep.innerText = "";
        link = document.createElement("a");
        link.innerText = p;
        link.href = xhr.responseText;
        ep.appendChild(link);
        ep.appendChild(document.createElement("br"));
      }
    };

    xhr.send();
  });
}

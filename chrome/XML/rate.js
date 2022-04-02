function rate_request(course, e) {
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://tatekan.copynight.net/api/rate?course=" +
      encodeURIComponent(course)
  );

  xhr.onload = function () {
    if (xhr.responseText != []) {
      show = "";
      JSON.parse(xhr.responseText).forEach((r) => {
        show += String(r["year"] - 2000) + "年:" + String(r["persent"]) + "%\n";
      });

      if (show != "") {
        e.querySelector("td").innerText = show;
        e.querySelector("td").style.color = "red";
      } else {
        e.querySelector("td").textContent = "No Data";
        e.querySelector("td").style.color = "black";
      }
    }
  };

  xhr.send();
}

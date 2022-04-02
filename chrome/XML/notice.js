function notice_request(table) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "document";
  xhr.open("GET", "https://www.k.kyoto-u.ac.jp/student/la/global_notice/top");

  xhr.onload = function (e) {
    ddoc = e.target.responseXML;
    noticeA = ddoc
      .querySelector("#noticeGeneralList")
      .querySelector("span")
      .querySelectorAll("a");

    la =
      "https://www.k.kyoto-u.ac.jp/student/la/global_notice/" +
      noticeA[0].getAttribute("href");
    fac =
      "https://www.k.kyoto-u.ac.jp/student/la/global_notice/" +
      noticeA[1].getAttribute("href");
    notice_list(table, la, "全学共通");
    notice_list(table, fac, "学部");
  };
  xhr.send();
}

function notice_list(table, link, nFac) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "document";
  flag = 0;
  notices = [];
  xhr.open("GET", link);

  xhr.onload = function (e) {
    let ddoc = e.target.responseXML;
    let odd = ddoc
      .querySelector("#noticeGeneralList")
      .querySelector("tbody.list")
      .querySelectorAll("tr.odd_normal");
    let even = ddoc
      .querySelector("#noticeGeneralList")
      .querySelector("tbody.list")
      .querySelectorAll("tr.even_normal");

    for (let x = 0; x < odd.length + even.length; x++) {
      //交互になっている
      if (x % 2 == 0) {
        var notice = odd[x / 2];
      } else {
        var notice = even[(x - 1) / 2];
      }
      if (notice.querySelectorAll("td")[0].querySelector("img") != null) {
        var newf = 1;
      } else {
        var newf = 0;
      }
      notices.push([
        notice
          .querySelectorAll("td")[0]
          .innerText.replace(/ /g, "")
          .replace(/\n/g, "")
          .replace(/[0-9]{5}_[0-9]{3}/g, ""),
        notice
          .querySelectorAll("td")[2]
          .innerText.replace(/ /g, "")
          .replace(/\n/g, ""),
        notice
          .querySelectorAll("td")[3]
          .innerText.replace(/ /g, "")
          .replace(/\n/g, "")
          .replace(/[0-9]{13}/g, ""),
        notice
          .querySelectorAll("td")[4]
          .querySelector("a")
          .getAttribute("href"),
        newf,
        nFac,
      ]);
    }
    if (flag == 1) {
      notices.sort(compare);
      notices.forEach((e) => {
        let ttr = document.createElement("tr");
        ttr.setAttribute(
          "data-href",
          "https://www.k.kyoto-u.ac.jp/student/u/t/global_notice/" + e[3]
        );
        let tr = table.appendChild(ttr);
        let th = document.createElement("th");
        th.innerText = e[2] + "\n" + "(" + e[5] + ")　" + e[0];
        tr.appendChild(th);
        if (e[4] == 1) {
          font = document.createElement("font");
          font.color = "#ff0000";
          font.innerText = "　New!";
          th.insertBefore(font, th.querySelector("br"));
        }
        td = document.createElement("td");
        td.innerText = e[1];
        tr.appendChild(td);

        $("tr[data-href]")
          .addClass("clickable")
          .click(function (e) {
            if (!$(e.target).is("a")) {
              window.location = $(e.target).closest("tr").data("href");
            }
          });
      });
    } else {
      flag = 1;
    }
  };
  xhr.send();
}

function compare(a, b) {
  if (Number(a[2].split("/")[0]) != Number(b[2].split("/")[0])) {
    if (Number(a[2].split("/")[0]) < Number(b[2].split("/")[0])) {
      return 1;
    }
    return -1;
  } else if (Number(a[2].split("/")[1]) != Number(b[2].split("/")[1])) {
    if (Number(a[2].split("/")[1]) < Number(b[2].split("/")[1])) {
      return 1;
    }
    return -1;
  } else if (
    Number(a[2].split("/")[2].replace(/\(.+\)/g, "")) !=
    Number(b[2].split("/")[2].replace(/\(.+\)/g, ""))
  ) {
    if (
      Number(a[2].split("/")[2].replace(/\(.+\)/g, "")) <
      Number(b[2].split("/")[2].replace(/\(.+\)/g, ""))
    ) {
      return 1;
    }
    return -1;
  }
  return 0;
}

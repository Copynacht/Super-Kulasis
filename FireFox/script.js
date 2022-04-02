window.onload = function () {
  //学部リスト
  fiList = ["let", "ed", "l", "ec", "s", "med", "medh", "p", "t", "a", "h"];
  fList = ["文", "教", "法", "経", "理", "医", "医", "薬", "工", "農", "総"];
  facluty = null;
  which = 6;
  oLink = "https://www.k.kyoto-u.ac.jp/student/";
  if (
    location.pathname.split("/")[2] == "la" &&
    location.pathname.split("/")[3] == "syllabus" &&
    location.pathname.split("/")[4] == "search"
  ) {
    faculty = "全";
    oLink += "la/syllabus/";
    which = 8;
    super_syllabus();
  } else {
    fiList.forEach((f, i) => {
      if (location.pathname.split("/")[3] == f) {
        faculty = fList[i];
      }
    });
    if (
      location.pathname.split("/")[4] == "syllabus" &&
      location.pathname.split("/")[5] == "search"
    ) {
      oLink += "u/" + location.pathname.split("/")[3] + "/syllabus/";
      super_syllabus();
    }
  }

  //ajax関数
  function xml_request(course, e) {
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
          show +=
            String(r["year"] - 2000) + "年:" + String(r["persent"]) + "%\n";
        });

        if (show != "") {
          e.querySelector("td").innerText = show;
          e.querySelector("td").style.color = "red";
        }
      }
    };

    xhr.send();
  }

  function evaluation_request(e, et) {
    try {
      link = e
        .querySelectorAll("td")
        [which].querySelector("a")
        .getAttribute("href");

      var xhr = new XMLHttpRequest();
      xhr.responseType = "document";
      xhr.open("GET", oLink + link);

      xhr.onload = function (e2) {
        ddoc = e2.target.responseXML;
        online = ddoc
          .querySelector("table.lesson_plan_sell")
          .querySelectorAll("td.lesson_plan_sell")[4].textContent;
        evaluation =
          ddoc
            .querySelector("table.lesson_plan_sell")
            .querySelectorAll("td.lesson_plan_sell")[10].textContent +
          ddoc
            .querySelector("table.lesson_plan_sell")
            .querySelectorAll("td.lesson_plan_sell")[11].textContent;
        howto = "";
        if (evaluation.indexOf("平常点") != -1) {
          howto += "平常点,";
        }
        if (evaluation.indexOf("発表") != -1) {
          howto += "発表,";
        }
        if (
          evaluation.indexOf("出席点") != -1 ||
          evaluation.toLowerCase().indexOf("participation") != -1
        ) {
          howto += "出席点,";
        }
        if (
          evaluation.indexOf("プレゼン") != -1 ||
          evaluation.toLowerCase().indexOf("presentation") != -1
        ) {
          howto += "プレゼン,";
        }
        if (evaluation.indexOf("小テスト") != -1) {
          howto += "小テスト,";
        } else if (evaluation.indexOf("テスト") != -1) {
          howto += "テスト,";
        }
        if (
          evaluation.indexOf("中間試験") != -1 ||
          evaluation.toLowerCase().indexOf("midterm exam") != -1 ||
          evaluation.toLowerCase().indexOf("intermediate exam") != -1
        ) {
          howto += "中間試験,";
        } else if (evaluation.indexOf("期末試験") != -1) {
          howto += "期末試験,";
        } else if (evaluation.indexOf("定期試験") != -1) {
          howto += "定期試験,";
        } else if (
          evaluation.indexOf("最終試験") != -1 ||
          evaluation.toLowerCase().indexOf("final exam") != -1
        ) {
          howto += "最終試験,";
        } else if (evaluation.indexOf("筆記試験") != -1) {
          howto += "筆記試験,";
        } else if (
          evaluation.indexOf("試験") != -1 ||
          evaluation.toLowerCase().indexOf("exam") != -1
        ) {
          howto += "試験,";
        }

        if (evaluation.indexOf("小レポート") != -1) {
          howto += "小レポート,";
        } else if (evaluation.indexOf("課題レポート") != -1) {
          howto += "課題レポート,";
        } else if (
          evaluation.indexOf("課題") != -1 ||
          evaluation.toLowerCase().indexOf("assignment") != -1
        ) {
          howto += "課題,";
        } else if (
          evaluation.indexOf("最終レポート") != -1 ||
          evaluation.toLowerCase().indexOf("final report") != -1
        ) {
          howto += "最終レポート,";
        } else if (evaluation.indexOf("期末レポート") != -1) {
          howto += "期末レポート,";
        } else if (
          evaluation.indexOf("レポート") != -1 ||
          evaluation.toLowerCase().indexOf("report") != -1
        ) {
          howto += "レポート,";
        }
        if (
          online.indexOf("オンライン") != -1 ||
          online.toLowerCase().indexOf("online") != -1
        ) {
          e.querySelectorAll("td")[1].innerText = et + "(オンライン)";
          e.querySelectorAll("td")[1].style.color = "red";
        } else {
          e.querySelectorAll("td")[1].innerText = et;
        }
        howto = howto.substring(0, howto.length - 1);
        e.querySelectorAll("td")[1].appendChild(document.createElement("br"));
        e.querySelectorAll("td")[1].appendChild(document.createElement("hr"));
        e.querySelectorAll("td")[1].appendChild(document.createTextNode(howto));
      };

      xhr.send();
    } catch {}
  }

  function research_professor(prof, ep) {
    var xhr = new XMLHttpRequest();
    ep.innerText = "";
    prof.forEach((p) => {
      xhr.open(
        "GET",
        "https://tatekan.copynight.net/user/research_professor?prof_name=" +
          encodeURIComponent(p)
      );

      xhr.onload = function () {
        if (xhr.responseText == "") {
          ep.appendChild(document.createTextNode(p));
          ep.appendChild(document.createElement("br"));
        } else {
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

  function super_syllabus() {
    //それぞれの位置を取得
    tbody = document.querySelector("table.standard_list");
    odd = tbody.querySelectorAll("tr.odd_normal");
    even = tbody.querySelectorAll("tr.even_normal");
    tbody.querySelector("tr.th_normal").querySelector("td").textContent =
      "単位取得率";
    tbody.querySelector("tr.th_normal").querySelectorAll("td")[1].innerText =
      "科目名";
    tbody
      .querySelector("tr.th_normal")
      .querySelectorAll("td")[1]
      .appendChild(document.createElement("br"));
    tbody
      .querySelector("tr.th_normal")
      .querySelectorAll("td")[1]
      .appendChild(document.createTextNode("成績評価"));
    //ループ
    for (let x = 0; x < odd.length + even.length; x++) {
      //交互になっている
      if (x % 2 == 0) {
        e = odd[x / 2];
      } else {
        e = even[(x - 1) / 2];
      }

      e.querySelector("td").textContent = "NoData";

      index = e.querySelectorAll("td")[1].innerText.indexOf("\n");
      if (index != -1) {
        et = e.querySelectorAll("td")[1].innerText.substring(0, index);
      } else {
        et = e.querySelectorAll("td")[1].innerText;
      }

      evaluation_request(e, et);

      prof = e.querySelectorAll("td")[2].innerText.split("\n");
      ep = e.querySelectorAll("td")[2];

      research_professor(prof, ep);

      //扱えるように変換
      course =
        et
          .replace(/（/g, "(")
          .replace(/）/g, ")")
          .replace(/［/g, "[")
          .replace(/］/g, "]")
          .replace(/－/g, "-")
          .replace(/Ｉ/g, "I")
          .replace(/Ⅰ/g, "I")
          .replace(/Ⅱ/g, "II")
          .replace(/Ⅲ/g, "III")
          .replace(/Ⅳ/g, "IV")
          .replace(/Ⅴ/g, "V")
          .replace(/Ⅵ/g, "VI")
          .replace(/Ⅶ/g, "VII")
          .replace(/Ⅷ/g, "VIII")
          .replace(/\s\【.+/g, "")
          .replace(/\【.+/g, "")
          .replace(/\s\[.+/g, "")
          .replace(/\[.+/g, "")
          .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
          }) + "^";
      xml_request(faculty + ":" + course, e);
      if (course.indexOf("(") != -1) {
        xml_request(
          faculty +
            ":" +
            course.replace(/\s\(.+/g, "").replace(/\(.+/g, "") +
            "^",
          e
        );
      }
    }
  }
};

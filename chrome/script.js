window.onload = function () {
  //学部リスト
  const fiList = [
    "let",
    "ed",
    "l",
    "ec",
    "s",
    "med",
    "medh",
    "p",
    "t",
    "a",
    "h",
  ];
  const fList = [
    "文",
    "教",
    "法",
    "経",
    "理",
    "医",
    "医",
    "薬",
    "工",
    "農",
    "総",
  ];

  facluty = null;
  which = 6;
  ks = 1;
  pr = 2;
  oLink = "https://www.k.kyoto-u.ac.jp/student/";
  super_kulasis();

  if (
    location.pathname.split("/")[2] == "la" &&
    location.pathname.split("/")[3] == "syllabus" &&
    location.pathname.split("/")[4] == "search"
  ) {
    faculty = "全";
    oLink += "la/syllabus/";
    which = 8;
    super_syllabus();
  } else if (
    location.pathname.split("/")[2] == "la" &&
    location.pathname.split("/")[3] == "timeslot" &&
    location.pathname.split("/")[4] == "lecture_search"
  ) {
    faculty = "全";
    oLink += "la/timeslot/";
    which = 9;
    super_syllabus();
  } else if (
    location.pathname.split("/")[2] == "la" &&
    location.pathname.split("/")[3] == "entrylimit" &&
    location.pathname.split("/")[4] == "regist"
  ) {
    faculty = "全";
    oLink += "la/entrylimit/";
    which = 9;
    ks = 2;
    pr = 3;
    num = 2;
    super_syllabus();
  } else {
    if (
      location.pathname.split("/")[3] == "timeslot" &&
      location.pathname.split("/")[4] == "lecture_search_gakubu"
    ) {
      faculty = "";
      which = 7;
      oLink += "la/timeslot/";
      super_syllabus();
    }
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

  function super_kulasis() {
    body = document.querySelector("body");
    slideMenu_DOM(body);
  }

  function super_syllabus() {
    //それぞれの位置を取得
    var tbody = document.querySelector("table.standard_list");
    var odd = tbody.querySelectorAll("tr.odd_normal");
    var even = tbody.querySelectorAll("tr.even_normal");
    tbody.querySelector("tr.th_normal").querySelector("td").textContent =
      "単位取得率";
    tbody.querySelector("tr.th_normal").querySelectorAll("td")[ks].innerText =
      "科目名";
    tbody
      .querySelector("tr.th_normal")
      .querySelectorAll("td")
      [ks].appendChild(document.createElement("br"));
    tbody
      .querySelector("tr.th_normal")
      .querySelectorAll("td")
      [ks].appendChild(document.createTextNode("成績評価"));

    //ループ
    for (let x = 0; x < odd.length + even.length; x++) {
      //交互になっている
      if (x % 2 == 0) {
        var e = odd[x / 2];
      } else {
        var e = even[(x - 1) / 2];
      }

      //Loading表示
      e.querySelector("td").textContent = "Loading...";

      //講義名
      let index = e.querySelectorAll("td")[ks].innerText.indexOf("\n");
      if (index != -1) {
        var et = e.querySelectorAll("td")[ks].innerText.substring(0, index);
      } else {
        var et = e.querySelectorAll("td")[ks].innerText;
      }

      //評価方法関係
      let ec = e.querySelectorAll("td")[5].innerText;
      evaluation_request(e, et, ec);

      //扱えるように変換
      let course =
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

      rate_request(faculty + ":" + course, e);
      if (course.indexOf("(") != -1) {
        rate_request(
          faculty +
            ":" +
            course.replace(/\s\(.+/g, "").replace(/\(.+/g, "") +
            "^",
          e
        );
      }

      //教員関係
      let prof = e.querySelectorAll("td")[pr].innerText.split("\n");
      let ep = e.querySelectorAll("td")[pr];
      professor_request(prof, ep);
    }
  }
};

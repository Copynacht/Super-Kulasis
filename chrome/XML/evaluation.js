function evaluation_request(e, et, ec) {
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
      grade = ddoc
        .querySelector("table.lesson_plan_sell")
        .querySelectorAll("td.lesson_plan_sell")[3].textContent;
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
        e.querySelectorAll("td")[ks].innerText = et + "(オンライン)";
        e.querySelectorAll("td")[ks].style.color = "red";
      } else {
        e.querySelectorAll("td")[ks].innerText = et;
      }
      if (grade.indexOf("回生") != -1 && which != 7) {
        e.querySelectorAll("td")[5].innerText =
          ec + "(" + grade.match(/\n.+回生/)[0].replace("\n", "") + ")";
      }
      howto = howto.substring(0, howto.length - 1);
      e.querySelectorAll("td")[ks].appendChild(document.createElement("br"));
      e.querySelectorAll("td")[ks].appendChild(document.createElement("hr"));
      e.querySelectorAll("td")[ks].appendChild(document.createTextNode(howto));
    };

    xhr.send();
  } catch {}
}

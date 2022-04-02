function slideMenu_DOM(body) {
  let fragment = document.createDocumentFragment();
  let d = document.createElement("div");
  d.className = "heaDiv";
  heaDiv = fragment.appendChild(d);

  let h = document.createElement("header");
  h.className = "header";
  let header = heaDiv.appendChild(h);

  let title = document.createElement("h2");
  title.innerText = "𝓢𝓾𝓹𝓮𝓻 𝓚𝓾𝓵𝓪𝓼𝓲𝓼";
  header.appendChild(title);

  let btn = document.createElement("button");
  btn.className = "btn-menu";
  btn.innerText = "お知らせ";
  btn.addEventListener("click", () => {
    nav.classList.toggle("open-menu");
    if (btn.innerHTML === "お知らせ") {
      btn.innerHTML = "閉じる";
    } else {
      btn.innerHTML = "お知らせ";
    }
  });
  header.appendChild(btn);

  let n = document.createElement("nav");
  let nav = heaDiv.appendChild(n);

  let t = document.createElement("table");
  let table = nav.appendChild(t);
  let tbody = table.appendChild(document.createElement("tbody"))
  
  notice_request(tbody);

  body.prepend(fragment);
}

let pageAddress = {
  universe: "",
  galaxy: "",
  star: "",
  planet: 0,
  building: "",
  floor: 0,
  hallway: 0,
  room: 0,
  shelf: 0,
  book: 0,
  page: -1,
};

const $ = (id) => document.getElementById(id);
const $$ = (q) => document.querySelector(q);
const $$$ = (q) => document.querySelectorAll(q);

function Init() {
  InitPageAddress();
  InitRandomizeButtons();
}

$("universe-name").addEventListener("input", () => {
  SetUniverseName($("universe-name").value);
});

$$("#universe-input-container .next").addEventListener("click", () => {
  SetUniverseName(
    $("universe-name")
      .value.split("\n")
      .join("")
      .padEnd(PAGE_LENGTH - 28, " ")
  );

  $("universe-input-container").classList.add("hidden");
  UpdatePath("universe");
  InitInputs("galaxy");
});

$$("#galaxy-input-container .next").addEventListener("click", () => {
  for (let i = 0; i < 7; i++)
    pageAddress.galaxy += $$$("#galaxy-input input")[i].value.padStart(1, " ");

  $("galaxy-input-container").classList.add("hidden");
  UpdatePath("galaxy");
  InitInputs("star");
});

$$("#star-input-container .next").addEventListener("click", () => {
  for (let i = 0; i < 7; i++)
    pageAddress.star += $$$("#star-input input")[i].value.padStart(1, " ");

  $("star-input-container").classList.add("hidden");
  UpdatePath("star");
  InitInputs("planet");
});

$$("#planet-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#planet-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#planet-input input")[1].value.padStart(1, "0"));

  if (num < 64 && !isNaN(num)) pageAddress.planet = num;
  else return;

  $("planet-input-container").classList.add("hidden");
  UpdatePath("planet");
  InitInputs("building");
});

$$("#building-input-container .next").addEventListener("click", () => {
  for (let i = 0; i < 6; i++)
    pageAddress.building += $$$("#building-input input")[i].value.padStart(
      1,
      " "
    );

  $("building-input-container").classList.add("hidden");
  UpdatePath("building");
  InitInputs("floor");
});

$$("#floor-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#floor-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#floor-input input")[1].value.padStart(1, "0"));

  if (num < 64 && !isNaN(num)) pageAddress.floor = num;
  else return;

  $("floor-input-container").classList.add("hidden");
  UpdatePath("floor");
  InitInputs("hallway");
});

$$("#hallway-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#hallway-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#hallway-input input")[1].value.padStart(1, "0"));

  if (num < 64 && !isNaN(num)) pageAddress.hallway = num;
  else return;

  $("hallway-input-container").classList.add("hidden");
  UpdatePath("hallway");
  InitInputs("room");
});

$$("#room-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#room-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#room-input input")[1].value.padStart(1, "0"));

  if (num < 64 && !isNaN(num)) pageAddress.room = num;
  else return;

  $("room-input-container").classList.add("hidden");
  UpdatePath("room");
  InitInputs("shelf");
});

$$("#shelf-input-container .next").addEventListener("click", () => {
  const num =
    10 * parseInt($$$("#shelf-input input")[0].value.padStart(1, "0")) +
    1 * parseInt($$$("#shelf-input input")[1].value.padStart(1, "0"));

  if (num < 64 && !isNaN(num)) pageAddress.shelf = num;
  else return;

  $("shelf-input-container").classList.add("hidden");
  UpdatePath("shelf");
  InitInputs("book");
});

$$("#book-input-container .next").addEventListener("click", () => {
  const num =
    1000 * parseInt($$$("#book-input input")[0].value.padStart(1, "0")) +
    100 * parseInt($$$("#book-input input")[1].value.padStart(1, "0")) +
    10 * parseInt($$$("#book-input input")[2].value.padStart(1, "0")) +
    1 * parseInt($$$("#book-input input")[3].value.padStart(1, "0"));

  if (num < 4096 && !isNaN(num)) pageAddress.book = num;
  else return;

  $("shelf-input-container").classList.add("hidden");
  $("book-input-container").classList.remove("hidden");

  UpdatePath("book");

  let pageName = "";
  pageName += pageAddress.universe;
  pageName += pageAddress.galaxy;
  pageName += pageAddress.star;
  pageName += ALPHABET[pageAddress.planet];
  pageName += pageAddress.building;
  pageName += ALPHABET[pageAddress.floor];
  pageName += ALPHABET[pageAddress.hallway];
  pageName += ALPHABET[pageAddress.room];
  pageName += ALPHABET[pageAddress.shelf];
  pageName += ALPHABET[Math.floor(pageAddress.book / 64)];
  pageName += ALPHABET[pageAddress.book % 64];
  pageName += "-";
  pageName = pageName.replaceAll(" ", "_");

  location.href = location.href.split("?")[0] + "?" + pageName;

  $("book-input-container").classList.add("hidden");
  $("page-input-container").classList.remove("hidden");
  $("content-container").classList.remove("hidden");
  $("navigate").classList.remove("hidden");
});

function SetUniverseName(text) {
  text = text.split("\n").join("").replaceAll("_", " ");

  if (text.length > PAGE_LENGTH - 28)
    text = text.substring(0, PAGE_LENGTH - 28);

  let formatted = "";

  for (let i = 0; i < text.length; i++) {
    if (ALPHABET.includes(text[i])) formatted += text[i];
    if (i % 64 == 63) formatted += "\n";
  }

  $("universe-name").value = formatted;

  pageAddress.universe = formatted.split("\n").join("");
}

function InitRandomizeButtons() {
  $$("#universe-input-container .random").addEventListener("click", () => {
    SetUniverseName(ran());
  });

  $$("#galaxy-input-container .random").addEventListener("click", () => {
    for (let i = 0; i < 7; i++)
      $$$("#galaxy-input input")[i].value = ALPHABET.random();
    $$("#galaxy-input-container .next").focus();
  });

  $$("#star-input-container .random").addEventListener("click", () => {
    for (let i = 0; i < 7; i++)
      $$$("#star-input input")[i].value = ALPHABET.random();
    $$("#star-input-container .next").focus();
  });

  $$("#planet-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 64);
    const str = num.toString().padStart(2, "0");
    $$$("#planet-input input")[0].value = str[0];
    $$$("#planet-input input")[1].value = str[1];
    $$("#planet-input-container .next").focus();
  });

  $$("#building-input-container .random").addEventListener("click", () => {
    for (let i = 0; i < 6; i++)
      $$$("#building-input input")[i].value = ALPHABET.random();
    $$("#building-input-container .next").focus();
  });

  $$("#floor-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 64);
    const str = num.toString().padStart(2, "0");
    $$$("#floor-input input")[0].value = str[0];
    $$$("#floor-input input")[1].value = str[1];
    $$("#floor-input-container .next").focus();
  });

  $$("#hallway-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 64);
    const str = num.toString().padStart(2, "0");
    $$$("#hallway-input input")[0].value = str[0];
    $$$("#hallway-input input")[1].value = str[1];
    $$("#hallway-input-container .next").focus();
  });

  $$("#room-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 64);
    const str = num.toString().padStart(2, "0");
    $$$("#room-input input")[0].value = str[0];
    $$$("#room-input input")[1].value = str[1];
    $$("#room-input-container .next").focus();
  });

  $$("#shelf-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 64);
    const str = num.toString().padStart(2, "0");
    $$$("#shelf-input input")[0].value = str[0];
    $$$("#shelf-input input")[1].value = str[1];
    $$("#shelf-input-container .next").focus();
  });

  $$("#book-input-container .random").addEventListener("click", () => {
    const num = Math.floor(Math.random() * 4096);
    const str = num.toString().padStart(4, "0");
    $$$("#book-input input")[0].value = str[0];
    $$$("#book-input input")[1].value = str[1];
    $$$("#book-input input")[2].value = str[2];
    $$$("#book-input input")[3].value = str[3];
    $$("#book-input-container .next").focus();
  });
}

function InitInputs(part, filled = false) {
  const url = location.href.split("?")[1];

  if (part == "universe") {
    $("universe-input-container").classList.remove("hidden");
    SetUniverseName(location.href.split("?")[1].substring(0, PAGE_LENGTH - 28));
  } else if (part == "galaxy" || part == "star" || part == "building") {
    $(`${part}-input-container`).classList.remove("hidden");

    let name = "";
    if (filled) {
      const nameLength = part == "building" ? 6 : 7;
      name = url.substring(url.length - nameLength);
    }

    const inputs = $$$(`#${part}-input input`);

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = name[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (!ALPHABET.includes(inputs[i].value)) inputs[i].value = "";
        else {
          if (inputs[i].value.length == 1) {
            if (i < inputs.length - 1) inputs[i + 1].focus();
            else $$(`#${part}-input-container .next`).focus();
          }
        }
      });
    }

    inputs[0].focus();
  } else if (part == "planet") {
    $("planet-input-container").classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(
          url[url.length - 1].replace("_", " ")
        ).toString()
      : "";
    const inputs = $$$("#planet-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 6)
            inputs[0].value = "";
          else inputs[1].focus();
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "6" && parseInt(inputs[1].value) > 3)
          )
            inputs[1].value = "";
          else $$("#planet-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "floor") {
    $("floor-input-container").classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(
          url[url.length - 1].replace("_", " ")
        ).toString()
      : "";
    const inputs = $$$("#floor-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 6)
            inputs[0].value = "";
          else inputs[1].focus();
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "6" && parseInt(inputs[1].value) > 3)
          )
            inputs[1].value = "";
          else $$("#floor-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "hallway") {
    $("hallway-input-container").classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(
          url[url.length - 1].replace("_", " ")
        ).toString()
      : "";
    const inputs = $$$("#hallway-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 6)
            inputs[0].value = "";
          else inputs[1].focus();
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "6" && parseInt(inputs[1].value) > 3)
          )
            inputs[1].value = "";
          else $$("#hallway-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "room") {
    $("room-input-container").classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(
          url[url.length - 1].replace("_", " ")
        ).toString()
      : "";
    const inputs = $$$("#room-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 6)
            inputs[0].value = "";
          else inputs[1].focus();
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "6" && parseInt(inputs[1].value) > 3)
          )
            inputs[1].value = "";
          else $$("#room-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "shelf") {
    $("shelf-input-container").classList.remove("hidden");

    const number = filled
      ? ALPHABET.indexOf(
          url[url.length - 1].replace("_", " ")
        ).toString()
      : "";
    const inputs = $$$("#shelf-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (i == 0) {
          if (isNaN(parseInt(inputs[0].value)) || parseInt(inputs[0].value) > 6)
            inputs[0].value = "";
          else inputs[1].focus();
        } else {
          if (
            isNaN(parseInt(inputs[1].value)) ||
            (inputs[0].value == "6" && parseInt(inputs[1].value) > 3)
          )
            inputs[1].value = "";
          else $$("#shelf-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  } else if (part == "book") {
    $("book-input-container").classList.remove("hidden");

    let number = "";
    if (filled) {
      const str = url.substring(url.length - 2).replaceAll("_", " ");
      number = (64 * ALPHABET.indexOf(str[0]) + ALPHABET.indexOf(str[1])).toString();
    }
    const inputs = $$$("#book-input input");

    for (let i = 0; i < inputs.length; i++) {
      if (filled) inputs[i].value = number[i];
      inputs[i].addEventListener("focusin", () => inputs[i].select());
      inputs[i].addEventListener("input", () => {
        if (isNaN(parseInt(inputs[i].value))) return (inputs[i].value = "");

        if (i == 0) {
          if (parseInt(inputs[0].value) > 6) inputs[0].value = "";
          else inputs[1].focus();
          return;
        }

        if (i == 1) {
          if (inputs[0].value == "4" && parseInt(inputs[1].value) > 0)
            inputs[1].value = "";
          else inputs[2].focus();
          return;
        }

        if (i == 2) {
          inputs[3].focus();
          return;
        }

        if (i == 3) {
          if (
            inputs[0].value + inputs[1].value + inputs[2].value == "409" &&
            parseInt(inputs[3].value) > 5
          )
            inputs[3].value = "";
          else $$("#book-input-container .next").focus();
        }
      });
    }

    inputs[0].focus();
  }
}

function InitPageAddress() {
  if (location.href.split("?").length == 1)
    return $("universe-input-container").classList.remove("hidden");

  const pageName = location.href.split("?")[1].replaceAll("_", " ");
  if (pageName.length == 0)
    return $("universe-input-container").classList.remove("hidden");

  if (pageName.length >= PAGE_LENGTH - 28) {
    $("universe-input-container").classList.add("hidden");
  } else return;

  if (pageName.length >= PAGE_LENGTH - 21) {
    pageAddress.universe = pageName.substring(0, PAGE_LENGTH - 28);
    $("galaxy-input-container").classList.add("hidden");
    UpdatePath("universe");
  } else return InitInputs("universe", true);

  if (pageName.length >= PAGE_LENGTH - 14) {
    pageAddress.galaxy = pageName.substring(PAGE_LENGTH - 28, PAGE_LENGTH - 21);
    $("star-input-container").classList.add("hidden");
    UpdatePath("galaxy");
  } else return InitInputs("galaxy", true);

  if (pageName.length >= PAGE_LENGTH - 13) {
    pageAddress.star = pageName.substring(PAGE_LENGTH - 21, PAGE_LENGTH - 14);
    $("planet-input-container").classList.add("hidden");
    UpdatePath("star");
  } else return InitInputs("star", true);

  if (pageName.length >= PAGE_LENGTH - 7) {
    pageAddress.planet = ALPHABET.indexOf(pageName[PAGE_LENGTH - 14]);
    $("building-input-container").classList.add("hidden");
    UpdatePath("planet");
  } else return InitInputs("planet", true);

  if (pageName.length >= PAGE_LENGTH - 6) {
    pageAddress.building = pageName.substring(
      PAGE_LENGTH - 13,
      PAGE_LENGTH - 7
    );
    $("floor-input-container").classList.add("hidden");
    UpdatePath("building");
  } else return InitInputs("building", true);

  if (pageName.length >= PAGE_LENGTH - 5) {
    pageAddress.floor = ALPHABET.indexOf(pageName[PAGE_LENGTH - 7]);
    $("hallway-input-container").classList.add("hidden");
    UpdatePath("floor");
  } else return InitInputs("floor", true);

  if (pageName.length >= PAGE_LENGTH - 4) {
    pageAddress.hallway = ALPHABET.indexOf(pageName[PAGE_LENGTH - 6]);
    $("room-input-container").classList.add("hidden");
    UpdatePath("hallway");
  } else return InitInputs("hallway", true);

  if (pageName.length >= PAGE_LENGTH - 3) {
    pageAddress.room = ALPHABET.indexOf(pageName[PAGE_LENGTH - 5]);
    $("shelf-input-container").classList.add("hidden");
    UpdatePath("room");
  } else return InitInputs("room", true);

  if (pageName.length >= PAGE_LENGTH - 2) {
    pageAddress.shelf = ALPHABET.indexOf(pageName[PAGE_LENGTH - 4]);

    $("book-input-container").classList.add("hidden");
    UpdatePath("shelf");
  } else return InitInputs("shelf", true);

  if (pageName.length >= PAGE_LENGTH) {
    pageAddress.book =
      64 * ALPHABET.indexOf(pageName[PAGE_LENGTH - 3]) +
      ALPHABET.indexOf(pageName[PAGE_LENGTH - 2]);
    $("content-container").classList.remove("hidden");
    UpdatePath("book");

    if (pageName[pageName.length - 1] != "-") {
      pageAddress.page = ALPHABET.indexOf(pageName[PAGE_LENGTH - 1]);
      $("page-input").value = pageAddress.page.toString().padStart(2, "0");
      MakePageContent();
    } else {
      $("page-input").value = "-1";
      MakeCover();
    }

    InitNavigation();
    InitPageInput();
  } else return InitInputs("book", true);
}

function UpdatePath(part) {
  $(part + "-path").classList.remove("hidden");

  switch (part) {
    case "universe":
      const universeName = pageAddress.universe;
      const len = universeName.length;
      $("universe-path").innerHTML +=
        " " +
        universeName.substring(0, 10).replaceAll(" ", "&nbsp;") +
        "..." +
        universeName.substring(len - 10).replaceAll(" ", "&nbsp;") +
        " >>";

      $("universe-path").href =
        location.href.split("?")[0] +
        "?" +
        pageAddress.universe.replaceAll(" ", "_");
      break;

    case "galaxy":
      $("galaxy-path").innerHTML +=
        " " + pageAddress.galaxy.replaceAll(" ", "&nbsp;") + " >>";

      $("galaxy-path").href =
        location.href.split("?")[0] +
        "?" +
        (pageAddress.universe + pageAddress.galaxy).replaceAll(" ", "_");
      break;

    case "star":
      $("star-path").innerHTML +=
        " " + pageAddress.star.replaceAll(" ", "&nbsp;") + " >>";

      $("star-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star
        ).replaceAll(" ", "_");
      break;

    case "planet":
      $("planet-path").innerHTML +=
        " " + pageAddress.planet.toString().padStart(2, "0") + " >>";

      $("planet-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet]
        ).replaceAll(" ", "_");

      break;

    case "building":
      $("building-path").innerHTML +=
        " " + pageAddress.building.replaceAll(" ", "&nbsp;") + " >>";

      $("building-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building
        ).replaceAll(" ", "_");

      break;

    case "floor":
      $("floor-path").innerHTML +=
        " " + pageAddress.floor.toString().padStart(2, "0") + " >>";

      $("floor-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building +
          ALPHABET[pageAddress.floor]
        ).replaceAll(" ", "_");
      break;

    case "hallway":
      $("hallway-path").innerHTML +=
        " " + pageAddress.hallway.toString().padStart(2, "0") + " >>";

      $("hallway-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building +
          ALPHABET[pageAddress.floor] +
          ALPHABET[pageAddress.hallway]
        ).replaceAll(" ", "_");
      break;

    case "room":
      $("room-path").innerHTML +=
        " " + pageAddress.room.toString().padStart(2, "0") + " >>";

      $("room-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building +
          ALPHABET[pageAddress.floor] +
          ALPHABET[pageAddress.hallway] +
          ALPHABET[pageAddress.room]
        ).replaceAll(" ", "_");
      break;

    case "shelf":
      $("shelf-path").innerHTML +=
        " " + pageAddress.shelf.toString().padStart(2, "0") + " >>";

      $("shelf-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building +
          ALPHABET[pageAddress.floor] +
          ALPHABET[pageAddress.hallway] +
          ALPHABET[pageAddress.room] +
          ALPHABET[pageAddress.shelf]
        ).replaceAll(" ", "_");
      break;

    case "book":
      $("book-path").innerHTML +=
        " " + pageAddress.book.toString().padStart(4, "0") + " >>";

      $("book-path").href =
        location.href.split("?")[0] +
        "?" +
        (
          pageAddress.universe +
          pageAddress.galaxy +
          pageAddress.star +
          ALPHABET[pageAddress.planet] +
          pageAddress.building +
          ALPHABET[pageAddress.floor] +
          ALPHABET[pageAddress.hallway] +
          ALPHABET[pageAddress.room] +
          ALPHABET[pageAddress.shelf] +
          ALPHABET[Math.floor(pageAddress.book / 64)] + 
          ALPHABET[pageAddress.book % 64]
        ).replaceAll(" ", "_");
      break;
  }
}

function InitPageInput() {
  $("page-input-container").classList.remove("hidden");
  $("page-input").addEventListener("focusin", () => {
    $("page-input").select();
  });
  $("page-input").addEventListener("change", () => {
    const p = parseInt($("page-input").value);
    if (isNaN(p) || p > 63 || p < -1) return;

    let newUrl = location.href.slice(0, location.href.length - 1);

    if (p == -1) newUrl += "-";
    else newUrl += ALPHABET[p];

    location.href = newUrl;
  });
}

function InitNavigation() {
  $("navigate").classList.remove("hidden");

  const url = location.href;

  if (url.split("?")[1].length < PAGE_LENGTH - 1) return;
  if (url.split("?")[1].length == PAGE_LENGTH - 1) {
    $("to-cover").href = url + "-";
    $("to-end").href = url + ".";
    $("to-prev").href = url + "-";
    $("to-next").href = url + "0";
    return;
  }

  $("to-cover").href = url.slice(0, url.length - 1) + "-";
  $("to-end").href = url.slice(0, url.length - 1) + ".";

  if (pageAddress.page == -1) $("to-prev").href = url;
  else if (pageAddress.page == 0)
    $("to-prev").href = url.substring(0, url.length - 1) + "-";
  else
    $("to-prev").href =
      url.slice(0, url.length - 1) +
      ALPHABET[
        ALPHABET.indexOf(url[url.length - 1].replace("_", " ")) - 1
      ].replace(" ", "_");

  if (pageAddress.page == 63) $("to-next").href = url;
  else
    $("to-next").href =
      url.slice(0, url.length - 1) +
      ALPHABET[
        ALPHABET.indexOf(url[url.length - 1].replace("_", " ")) + 1
      ].replace(" ", "_");
}

function MakePageContent() {
  if (pageAddress.page == -1) return MakeCover();

  const pageName = location.href.split("?")[1].replaceAll("_", " ");
  const pageContent = Content(pageName);

  let text = "";
  for (let i = 0; i < pageContent.length; i++) {
    if (pageContent[i] == " ") text += "&nbsp;";
    else text += pageContent[i];

    if (i % 64 == 63) text += "\n";
  }

  $("content").innerHTML = text;
}

function MakeCover() {
  $("cover").classList.remove("hidden");
  $("content").classList.add("hidden");

  const bookName = location.href.split("?")[1].replaceAll("_", " ");
  let text = "";
  for (let i = 0; i < bookName.length; i++) {
    if (bookName[i] == " ") text += "&nbsp;";
    else text += bookName[i];

    if (i % 64 == 63) text += "\n";
  }

  $$("#cover p").innerHTML = text;
}

Init();

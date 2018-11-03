let getPassageTotals = (segmentsString) => {
  let words = segmentsString.split("\n");

  let totalWords = 0;
  let totalCharacters = 0;
  let totalMorae = 0;
  words.forEach((word) => {
    if (!word.includes("記号") && word !== "EOS" && word !== "" && !word.startsWith("...")) {
      totalWords++;
      let wordParts = word.split("\t");
      totalCharacters += wordParts[0].length;
      totalMorae += wordParts[1].length; // TODO: ignore small ゃ ゅ ょ

    }
  });

  return {
    words: totalWords,
    characters: totalCharacters,
    morae: totalMorae,
  }
};

let getSegments = (passage) => {
  return new Promise((resolve, reject) => {
    fetch("//web.ics.purdue.edu/~peter438/rfs/api.php/segment", {
      method: "POST",
      body: JSON.stringify({
        text: passage
      })
    })
      .then(response => response.json())
      .then(json => {
        resolve(json.segments);
      });
  });
};

document.querySelector("button[type=submit]").addEventListener("click", (event) => {
  event.preventDefault();

  document.querySelector("#success").classList.add("hide");
  let spinner = document.querySelector("#spinner");

  spinner.classList.add("active");

  let title = document.querySelector("#title").value;
  let passage = document.querySelector("#passage").value;
  let isJapanese = document.querySelector("#is-japanese").checked;

  Promise.all([GET_USER, getSegments(passage)])
    .then(([user, segments]) => {
      let totals = getPassageTotals(segments);

      let passagesReference = db.ref("passages");
      let passageId = passagesReference.push().key;
      let dbPassage = passagesReference.child(passageId);
      dbPassage.set({
        creatorId: user.uid,
        created: Date.now(),
        title,
        passage,
        isJapanese,
        totals
      });

      dbPassage.on("value", (data) => {
        document.querySelector("#form").reset();
        document.querySelector("#success").classList.remove("hide");
        spinner.classList.remove("active");
      });
    });
});

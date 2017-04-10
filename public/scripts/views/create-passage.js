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
      totalMorae += wordParts[1].length;

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

document.querySelector("input[type=submit]").addEventListener("click", () => {
  let title = document.querySelector("input[name=title]").value;
  let passage = document.querySelector("textarea[name=content]").value;
  let isJapanese = document.querySelector("input[type=checkbox]").checked;

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
    });
});
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

document.querySelector("input[type=submit]").addEventListener("click", () => {
  let title = document.querySelector("input[name=title]").value;
  let passage = document.querySelector("textarea[name=content]").value;
  // let cleanPassage = passage.replace(/[\s\.\。\,\、\!\！\?\？\「\」\(\（\）\)\'\[\]\;\；\:\：\"\”\・]/gi, "");
  let isJapanese = document.querySelector("input[type=checkbox]").checked;
  // // GET_USER.then(console.log)
  fetch("//web.ics.purdue.edu/~peter438/rfs/api.php/segment", {
      method: "POST",
      body: JSON.stringify({
        text: passage
      })
    })
    .then(response => response.json())
    .then(json => {
      let totals = getPassageTotals(json.segments);
      console.log(totals);
    });
});
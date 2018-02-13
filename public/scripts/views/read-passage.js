let id = URI(document.location.href).query(true).id;
let passagesReference = db.ref("passages");
let dbPassage = passagesReference.child(id);
let passageObject = null;
dbPassage.on("value", (data) => {
    passageObject = data.val();
    document.querySelector("#title").textContent = passageObject.title;
    document.querySelector("#passage").textContent = passageObject.passage;
});

let startTime = null;
let stopTime = null;

document.querySelector("#start").addEventListener("click", (event) => {
    startTime = Date.now();
    event.target.classList.add("hide");
    document.querySelector("#stop").classList.remove("hide");
    document.querySelector("#card").classList.add("hide");
    document.querySelector("#stats").textContent = "";
});

document.querySelector("#stop").addEventListener("click", (event) => {
    event.target.classList.add("hide");
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#card").classList.remove("hide");

    stopTime = Date.now();
    let totalTime = moment(moment.duration(stopTime - startTime)._data).format("m:ss:SSS");
    document.querySelector("#total-time").textContent = `Your time: ${totalTime}`;
    let totalMinutes = (stopTime-startTime)/1000/60;
    let stats = document.querySelector("#stats");

    let totalCharacterCountElement = document.createElement("div");
    totalCharacterCountElement.textContent = `Total Character Count: ${passageObject.totals.characters}`;
    stats.appendChild(totalCharacterCountElement);

    let totalWordCountElement = document.createElement("div");
    totalWordCountElement.textContent = `Total Word Count: ${passageObject.totals.words}`;
    stats.appendChild(totalWordCountElement);

    let totalMoraCountElement = document.createElement("div");
    totalMoraCountElement.textContent = `Total Mora Count: ${passageObject.totals.morae}`;
    stats.appendChild(totalMoraCountElement);

    let charactersPerMinuteElement = document.createElement("div");
    charactersPerMinuteElement.textContent = `Characters/Minute: ${Math.trunc(passageObject.totals.characters/totalMinutes)}`;
    stats.appendChild(charactersPerMinuteElement);

    let wordsPerMinuteElement = document.createElement("div");
    wordsPerMinuteElement.textContent = `Words/Minute: ${Math.trunc(passageObject.totals.words/totalMinutes)}`;
    stats.appendChild(wordsPerMinuteElement);

    let moraePerMinuteElement = document.createElement("div");
    moraePerMinuteElement.textContent = `Total Word Count: ${Math.trunc(passageObject.totals.morae/totalMinutes)}`;
    stats.appendChild(moraePerMinuteElement);
});
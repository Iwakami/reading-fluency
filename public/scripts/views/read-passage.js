let id = URI(document.location.href).query(true).id;
let passagesReference = db.ref("passages");
let dbPassage = passagesReference.child(id);
dbPassage.on("value", (data) => {
    let passageObject = data.val();
    document.querySelector("#title").textContent = passageObject.title;
    document.querySelector("#passage").textContent = passageObject.passage;
});

let startTime = null;
let stopTime = null;

document.querySelector("#start").addEventListener("click", () => {
    startTime = Date.now();
});

document.querySelector("#stop").addEventListener("click", () => {
    stopTime = Date.now();
    let totalTime = moment(moment.duration(stopTime - startTime)._data).format("m:ss");
    document.querySelector("#total-time").textContent = `Your time: ${totalTime}`;
});
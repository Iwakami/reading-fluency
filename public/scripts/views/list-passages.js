let passagesReference = db.ref("passages");

passagesReference.on("value", (data) => {
    let passageObjects = data.val();
    let $nav = $("#passages");
    Object.keys(passageObjects).forEach((id) => {
        let passage = passageObjects[id];

        let whichIcon = passage.isJapanese ? "J" : "E";
        let whichIconColor = passage.isJapanese ? "red" : "blue";
        
        $nav.append(`<li class="collection-item avatar"><a href="/read-passage/?id=${id}"><i class="material-icons sans-serif circle ${whichIconColor}">${whichIcon}</i><span class="title">${passage.title}</span><p><i>${passage.passage}</i><br><i>Words: ${passage.totals.words} &nbsp;&nbsp; Characters: ${passage.totals.characters} &nbsp;&nbsp; Morae: ${passage.totals.morae}</i></p><a href="#!" class="secondary-content"><i class="material-icons">grade</i></a></a></li>`);
    });
});
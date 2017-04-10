let passagesReference = db.ref("passages");
passagesReference.on("value", (data) => {
    let passageObjects = data.val();
    let nav = document.querySelector("#passages");
    Object.keys(passageObjects).forEach((id) => {
        let passage = passageObjects[id];
        let link = document.createElement("a");
        link.href = `/read-passage/?id=${id}`;
        link.textContent = passage.title;
        nav.appendChild(link);
    });
});
const GET_USER = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
        let currentUser = firebase.auth().currentUser;
        
        if (currentUser) {
            resolve(currentUser);
        } else {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {
                resolve(result.user);
            });
        }
    });
})
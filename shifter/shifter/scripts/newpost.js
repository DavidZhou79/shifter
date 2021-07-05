auth.signInWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('pass')).then(cred => {
    const user = firebase.auth().currentUser;

    const createpost = document.getElementById("postBtn");

    var file;

    const pic = document.getElementById("myFile");

    pic.addEventListener("change", function(e) {
        file = e.target.files[0];
    });

    createpost.addEventListener("click", () => {
        
        var docRef = db.collection("postcount").doc("postcount");
        const food = document.getElementById("food_name").value;
        const desc = document.getElementById("deschere").value;
        if(food != "" && desc != "") {
            // get doc from doc reference
            docRef.get().then((doc) => {
                // get file name based on number of pics
                var jpg  = doc.get("postcount") + 1;

                db.collection("postcount").doc("postcount").set({
                    postcount: jpg 
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

                // Add a document to the database with their info
                db.collection("posts").doc(jpg.toString()).set({
                    company: user.displayName,
                    food: food,
                    description: desc,
                    imgloc: jpg
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });

                var compRef = db.collection("companies").doc(user.displayName);

                var parr = [];

                // Update Post Array
                // Atomically add a new region to the "regions" array field.
                compRef.update({
                    postarr: firebase.firestore.FieldValue.arrayUnion(jpg)
                }).then(() => {
                    // store image in file
                    var storageRef = firebase.storage().ref('Posts/' + jpg + '.jpg');
                    var task = storageRef.put(file).then(() => {
                        window.document.location = "mainpage.html";
                    });
                })
                .catch((error) => {
                });
 
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
        }
    });
}).catch(err => {
});

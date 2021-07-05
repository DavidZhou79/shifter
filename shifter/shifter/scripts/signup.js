// Get file input button from signup
const pic = document.getElementById("myFile");

// Logo file
var file;

// When logo is uploaded, set fil
pic.addEventListener("change", function(e) {
    file = e.target.files[0];
});



// Sign up button
const signup = document.getElementById("createAccount");

// When sign up button is clicked

signup.addEventListener("click", function() {
    // Get Info From Input Fields
    const username = document.getElementById("username_").value;
    const email = document.getElementById("email_").value;
    const pass = document.getElementById("password_").value;
    const bio = document.getElementById("bio_").value;
    const rates1 = document.getElementById("sel1");
    const rates2 = document.getElementById("sel2");

    // If all fields are filled
    if (username != "" && email != "" && pass != "" && bio != "" && (rates1.checked || rates2.checked)) {
        

        if(rates1.checked == true) {
            var docRef = db.collection("companies").doc(username);
            var type = "companies";
        } else {
            var docRef = db.collection("houses").doc(username);
            var type = "houses";
        }

        console.log(type);

        // If company already exists
        docRef.get().then((doc) => {
            if (doc.exists) {
                document.getElementById("username_").value = "THIS NAME IS TAKEN";
            } else {
                // doc.data() will be undefined in this case
                auth.createUserWithEmailAndPassword(email, pass).then( cred => {
                    const user = firebase.auth().currentUser;
                    console.log(type);
                    // Add username to profile
                    user.updateProfile({
                        displayName: username,
                        photoURL: type,
                    }).then(() => {
                        console.log(cred);
                    }).catch((error) => {
                    });  
        
                    // Add a document to the database with their info
                    db.collection(type).doc(username).set({
                        name: username,
                        email: email,
                        bio: bio,
                        postarr: []
                    }).then(() => {
                        // Cashe the login information
                        localStorage.setItem('email', email);
                        localStorage.setItem('pass', pass);
                        // Store their profile picture
                        var storageRef = firebase.storage().ref(username + '/profilepics/pfp.jpg');

                        var task = storageRef.put(file)
                        .then(() => {
                            // Go to main page
                            window.location.href = "mainpage.html";
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                }).catch(err => {
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
});
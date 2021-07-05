auth.signInWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('pass')).then(cred => {
    console.log(cred);

    const overlay = document.getElementById("overlay");

    const user = firebase.auth().currentUser;

    // Display username
    const usernameF = document.getElementById("username");
    usernameF.innerHTML = user.displayName;

    // Display email
    const emailF = document.getElementById("email");
    emailF.innerHTML = user.email;

    // Post display
    const display = document.getElementById("postlist");

    if(user.photoURL == "companies") {
        var docRef = db.collection("companies").doc(user.displayName);

        docRef.get().then((doc) => {
            if (doc.exists) {
                var postarr = doc.get("postarr");
                console.log(postarr);
                if (postarr != null) {
                    for(let i = 0; i < postarr.length; i++) {
                        var postRef = db.collection("posts").doc(postarr[i].toString());
                        postRef.get().then((doc) => {
                            
                            // doc.data() is never undefined for query doc snapshots
                            const newPost = document.createElement("div");
                            const image = document.createElement("img");
                            const he1 = document.createElement("h3");
                            const he2 = document.createElement("h4");
                            const information = document.createElement("div");
                            const biog = document.createElement("div");
                            const he3 = document.createElement("h4");
                            const desc = document.createElement("textarea");
                            
                            // Create a reference to the file we want to download
                            console.log("Posts/" + doc.get("imgloc").toString() + ".jpg");
                            var starsRef =  firebase.storage().ref("Posts/" + doc.get("imgloc").toString() + ".jpg");
                            
                            // Get the download URL
                            starsRef.getDownloadURL()
                            .then((url) => {
                                image.src = url;
                            })
                            .catch((error) => {
                            });
            
                            // Create Div for posts
                            information.classList.add("info");
                            newPost.classList.add("apost");
                            biog.classList.add("bio")
            
                            desc.readOnly = true;
                            desc.cols = "30";
                            desc.rows = "4";
                            desc.name = "";
                            desc.setAttribute("name", "");
                            desc.setAttribute("id", "");
            
                            newPost.appendChild(image);
                            newPost.appendChild(information);
                            information.appendChild(he1);
                            information.appendChild(he2);
                            newPost.appendChild(biog);
                            biog.appendChild(he3);
                            biog.appendChild(desc);
            
                            he1.innerHTML = doc.get("company");
                            he2.innerHTML = doc.get("food");
                            he3.innerHTML = "Description"
                            desc.innerHTML = doc.get("description")
            
                            display.appendChild(newPost);
                        });
                    }
                }
            }
        }).catch((error) => {
        });
    } else {
        np = document.getElementById("create_post");

        np.style.display = "none";

        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const newPost = document.createElement("div");
                const image = document.createElement("img");
                const he1 = document.createElement("h3");
                const he2 = document.createElement("h4");
                const information = document.createElement("div");
                const biog = document.createElement("div");
                const he3 = document.createElement("h4");
                const desc = document.createElement("textarea");

                newPost.addEventListener("click", () => {

                });

                // Create a reference to the file we want to download
                var starsRef =  firebase.storage().ref("Posts/" + doc.get("imgloc") + ".jpg");
                
                // Get the download URL
                starsRef.getDownloadURL()
                .then((url) => {
                    image.src = url;
                })
                .catch((error) => {
                });

                companyName = doc.get("company");

                // Create Div for posts
                information.classList.add("info");
                newPost.classList.add("apost");
                biog.classList.add("bio")

                desc.readOnly = true;
                desc.cols = "30";
                desc.rows = "4";
                desc.name = "";
                desc.setAttribute("name", "");
                desc.setAttribute("id", "");

                newPost.appendChild(image);
                newPost.appendChild(information);
                information.appendChild(he1);
                information.appendChild(he2);
                newPost.appendChild(biog);
                biog.appendChild(he3);
                biog.appendChild(desc);

                he1.innerHTML = companyName;
                he2.innerHTML = doc.get("food");
                he3.innerHTML = "Description";
                desc.innerHTML = doc.get("description");

                newPost.addEventListener("click", () => {
                    const modal = document.getElementById("modal");

                    document.getElementById("title").innerHTML = companyName;

                    const compRef =  db.collection("companies").doc(companyName);

                    var imgRef =  firebase.storage().ref(companyName + "/profilepics/pfp.jpg");

                    // Get the download URL
                    imgRef.getDownloadURL()
                    .then((url) => {
                        document.getElementById("compimg").src = url;
                    })
                    .catch((error) => {
                    });

                    compRef.get().then((doc) => {
                        document.getElementById("modal-body").innerHTML = doc.get("bio");
                        document.getElementById("modal_email").innerHTML = doc.get("email");
                    });

                    openModal(modal);
                });

                display.appendChild(newPost);
            });
        });

        // Modal functions
        overlay.addEventListener('click', () => {
            const modal = document.getElementById("modal");
            closeModal(modal);
        });

        function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
        }

        function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
        }
    }

    
}).catch(err => {
});

// Logout User
const logout = document.getElementById("signin");

logout.addEventListener("click", function() {
    auth.signOut().then(() => {
        console.log('user signed out');
        window.document.location = "index.html";
    });
});


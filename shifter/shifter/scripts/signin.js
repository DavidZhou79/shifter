// Sign in button
const signin = document.getElementById("signinnow");

// When sign in button is clicked
signin.addEventListener("click", function() {
    const email = document.getElementById("email_").value;
    const pass = document.getElementById("password_").value;

    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        console.log(cred.user);

        // Cashe email and pass
        localStorage.setItem('email', email);
        localStorage.setItem('pass', pass);

        window.location.href = "mainpage.html";
    }).catch(err => {
    });
});
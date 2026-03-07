

function submit() {
    const userName = document.getElementById('username');
    const user = userName.value;

    const password = document.getElementById('password');
    let pass = password.value;

    if (user !== "admin" && user.length !== '5') {
        alert('Wrong Username')
    }
    else if (pass !== "admin123" && pass.length !== '8') {
        alert('Wrong Password')
    }
    else {
        alert("Log In Successful");
        window.location.assign("./home.html");
    }
}
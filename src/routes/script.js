function showPass() {
    const passwords = document.getElementsByClassName("password");
    for (let i = 0; i < passwords.length; i++) {
        if (passwords[i].type === "password") {
            passwords[i].type = "text";
        } else {
            passwords[i].type = "password";
        }
    }
}



function checkPass() {
    const passwords = document.getElementsByClassName("password");
    if (passwords[0].value == passwords[1].value) {
        document.getElementById('signUp').disabled = false;
    } else {
        document.getElementById('signUp').disabled = true;
    }
}
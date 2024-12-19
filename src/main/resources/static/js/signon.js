function initSignon() {



    document.getElementById("signon-switch-label").addEventListener("change", () => {
        let state = document.getElementById("signon-switch-label").children[0].checked;
        if (state) { //sign up mode
            document.getElementById("signon-header").textContent = "Sign Up With Us!";
            document.getElementById("signon-text").textContent = "Creating an account with us allows you to earn rewards, create meal plans, and streamline future orders!";
            document.getElementById("signon-button").textContent = "Sign Up";
            document.getElementById("signon-password-input").setAttribute("autocomplete", "new-password");
        } else { //sign in mode
            document.getElementById("signon-header").textContent = "Sign In";
            document.getElementById("signon-text").textContent = "Sign in to your account to dramatically improve your shopping experience with us!";
            document.getElementById("signon-button").textContent = "Sign In";
            document.getElementById("signon-password-input").setAttribute("autocomplete", "current-password");
        }
    });

    document.getElementById("signon-button").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("signon-button").click();
        }
    });
    document.getElementById("signon-button").addEventListener("click", () => {
        signIn();
    });

    document.getElementById("signup-button").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("signup-button").click();
        }
    });
    document.getElementById("signup-button").addEventListener("click", () => {
        signUp();
    });
}


function signIn() {
    let namePresent = document.getElementById("signon-name-input").value !== "";
    let emailPresent = document.getElementById("signon-email-input").value !== "";
    let pwPresent = document.getElementById("signon-password-input").value !== "";

    if (namePresent && emailPresent && pwPresent) {
        if (!document.getElementById("signon-switch-label").children[0].checked) { //sign in
            fetch("/signon", {
                method: "POST",
                body: JSON.stringify({
                    "newaccount": false,
                    "email": document.getElementById("signon-email-input").value,
                    "password": document.getElementById("signon-password-input").value,
                    "name": document.getElementById("signon-name-input").value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(r => {
                //store cookie from response
                r.text().then((data) => {
                    if (data === "authenticated") {
                        console.log("success");
                        for (const val of document.cookie.split(";")) {
                            if (val.includes("sessiontoken")) {
                                sessionStorage.setItem("sessiontoken", val.split("=")[1]);
                                break;
                            }
                        }
                        //barba.go(window.location.origin + "/account");
                        window.location.href = window.location.origin + "/account";
                    } else {
                        console.log("incorrect credentials");
                        document.cookie = "";

                        gsap.set(document.getElementById("signon-feedback"), {
                            visibility: "visible",
                            opacity: 0
                        });
                        gsap.to(document.getElementById("signon-feedback"), {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power1.inout",
                            onComplete() {
                                setTimeout(() => {
                                    gsap.to(document.getElementById("signon-feedback"), {
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: "power1.inout",
                                        onComplete() {
                                            document.getElementById("signon-feedback").style.visibility = "hidden";
                                        }
                                    })
                                }, 5000);
                            }
                        })
                    }
                });
            });
        } else { //sign up, show extra info area.
            document.getElementById("signon-container").style.display = "none";
            document.getElementById("extra-info-container").style.display = "flex";
            document.getElementById("signon-address-input").focus();
        }
    } else {
        if (!namePresent) {
            document.getElementById("signon-name-input").focus();
        } else if (!emailPresent) {
            document.getElementById("signon-email-input").focus();
        } else if (!pwPresent) {
            document.getElementById("signon-password-input").focus();
        }
    }
}


function signUp() {
    let name = document.getElementById("signon-name-input");
    let email = document.getElementById("signon-email-input");
    let password = document.getElementById("signon-password-input");

    let address = document.getElementById("signon-address-input");
    let city = document.getElementById("signon-city-input");
    let zip = document.getElementById("signon-zip-input");
    let state = document.getElementById("signon-state-input");
    let country = document.getElementById("signon-country-input");
    let phone = document.getElementById("signon-phone-input");

    let cardnum = document.getElementById("signon-cardnum-input");
    let cardusername = document.getElementById("signon-cardusername-input");
    let cardexpdate = document.getElementById("signon-cardexpdate-input");
    let cardsecuritycode = document.getElementById("signon-cardsecuritycode-input");

    if (name.value === "") {
        name.focus();
        return;
    }

    if (email.value === "") {
        email.focus();
        return;
    }

    if (password.value === "") {
        password.focus();
        return;
    }

    if (address.value === "") {
        address.focus();
        return;
    }

    if (city.value === "") {
        city.focus();
        return;
    }

    if (zip.value === "") {
        zip.focus();
        return;
    }

    if (state.value === "") {
        state.focus();
        return;
    }

    if (country.value === "") {
        country.focus();
        return;
    }

    if (phone.value === "") {
        phone.focus();
        return;
    }

    if (cardnum.value === "") {
        cardnum.focus();
        return;
    }

    if (cardusername.value === "") {
        cardusername.focus();
        return;
    }

    if (cardexpdate.value === "") {
        cardexpdate.focus();
        return;
    }

    if (cardsecuritycode.value === "") {
        cardsecuritycode.focus();
        return;
    }

    fetch("/signon", {
        method: "POST",
        body: JSON.stringify({
            "newaccount": true,
            "email": email.value,
            "password": password.value,
            "name": name.value,
            "phone": phone.value,
            "address": address.value,
            "city": city.value,
            "state": state.value,
            "zip": zip.value,
            "country": country.value,
            "cardnumber": cardnum.value,
            "cardexpirationdate": cardexpdate.value,
            "cardsecuritycode": cardsecuritycode.value,
            "cardusername": cardusername.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(r => {
        //store cookie from response
        r.text().then((data) => {
            console.log("signupreceived");
            console.log(data);
            for (const val of document.cookie.split(";")) {
                if (val.includes("sessiontoken")) {
                    sessionStorage.setItem("sessiontoken", val.split("=")[1]);
                    break;
                }
            }
            //barba.go(window.location.origin + "/account");
            window.location.href = window.location.origin + "/account";
        });
    });
}
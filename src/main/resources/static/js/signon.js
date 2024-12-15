function initSignon() {



    document.getElementById("signon-switch-label").addEventListener("change", () => {
        let state = document.getElementById("signon-switch-label").children[0].checked;
        if (state) { //sign up mode

            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign Up With Us!";
                document.getElementById("signon-text").textContent = "Creating an account with us allows you to earn rewards, create meal plans, and streamline future orders!";
                document.getElementById("signon-button").textContent = "Sign Up";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "new-password");
            }, 250);

        } else { //sign in mode

            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign In";
                document.getElementById("signon-text").textContent = "Sign in to your account to dramatically improve your shopping experience with us!";
                document.getElementById("signon-button").textContent = "Sign In";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "current-password");
            }, 250);
        }
        /*
        gsap.to(["#signon-header", "#signon-text", "#signon-button"], {
            duration: 0.5,
            opacity: 0,
            ease: "power1.inout"
        })
        gsap.to(["#signon-header", "#signon-text", "#signon-button"], {
            duration: 0.5,
            opacity: 100,
            ease: "power1.inout",
            delay: 0.5
        })
         */
    });

    document.getElementById("signon-button").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("signon-button").click();
        }
    });
    document.getElementById("signon-button").addEventListener("click", () => {
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
                        for (const val of document.cookie.split(";")) {
                            if (val.includes("sessiontoken")) {
                                sessionStorage.setItem("sessiontoken", val.split("=")[1]);
                                break;
                            }
                        }
                        barba.go(window.location.origin + "/account");
                    });
                });
            } else { //sign up, show extra info area.
                document.getElementById("signon-container").style.display = "none";
                document.getElementById("extra-info-container").style.display = "flex";
            }
        }
    });

    document.getElementById("signup-button").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("signup-button").click();
        }
    });
    document.getElementById("signup-button").addEventListener("click", () => {
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

        let shouldSignUp = true;

        if (name.value === "") {
            shouldSignUp = false;
            name.style.color = "#ff0000";
        } else {
            name.style.color = "#EEEEEE";
        }

        if (email.value === "") {
            shouldSignUp = false;
            email.style.color = "#ff0000";
        } else {
            email.style.color = "#EEEEEE";
        }

        if (password.value === "") {
            shouldSignUp = false;
            password.style.color = "#ff0000";
        } else {
            password.style.color = "#EEEEEE";
        }

        if (address.value === "") {
            shouldSignUp = false;
            address.style.color = "#ff0000";
        } else {
            address.style.color = "#EEEEEE";
        }

        if (city.value === "") {
            shouldSignUp = false;
            city.style.color = "#ff0000";
        } else {
            city.style.color = "#EEEEEE";
        }

        if (zip.value === "") {
            shouldSignUp = false;
            zip.style.color = "#ff0000";
        } else {
            zip.style.color = "#EEEEEE";
        }

        if (state.value === "") {
            shouldSignUp = false;
            state.style.color = "#ff0000";
        } else {
            state.style.color = "#EEEEEE";
        }

        if (country.value === "") {
            shouldSignUp = false;
            country.style.color = "#ff0000";
        } else {
            country.style.color = "#EEEEEE";
        }

        if (phone.value === "") {
            shouldSignUp = false;
            phone.style.color = "#ff0000";
        } else {
            phone.style.color = "#EEEEEE";
        }

        if (cardnum.value === "") {
            shouldSignUp = false;
            cardnum.style.color = "#ff0000";
        } else {
            cardnum.style.color = "#EEEEEE";
        }

        if (cardusername.value === "") {
            shouldSignUp = false;
            cardusername.style.color = "#ff0000";
        } else {
            cardusername.style.color = "#EEEEEE";
        }

        if (cardexpdate.value === "") {
            shouldSignUp = false;
            cardexpdate.style.color = "#ff0000";
        } else {
            cardexpdate.style.color = "#EEEEEE";
        }

        if (cardsecuritycode.value === "") {
            shouldSignUp = false;
            cardsecuritycode.style.color = "#ff0000";
        } else {
            cardsecuritycode.style.color = "#EEEEEE";
        }

        if (shouldSignUp) {
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
                    for (const val of document.cookie.split(";")) {
                        if (val.includes("sessiontoken")) {
                            sessionStorage.setItem("sessiontoken", val.split("=")[1]);
                            break;
                        }
                    }
                    barba.go(window.location.origin + "/account");
                });
            });
        }
    });
}
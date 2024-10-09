document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations();

    document.getElementById("signon-switch-label").addEventListener("change", () => {
        let state = document.getElementById("signon-switch-label").children[0].checked;
        if (state) { //sign in mode
            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign In";
                document.getElementById("signon-text").textContent = "Sign in to your account to dramatically improve your shopping experience with us!";
                document.getElementById("signon-button").textContent = "Sign In";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "current-password");
            }, 250);

        } else { //sign up mode

            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign Up With Us!";
                document.getElementById("signon-text").textContent = "Creating an account with us allows you to earn rewards, create meal plans, and streamline future orders!";
                document.getElementById("signon-button").textContent = "Sign Up";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "new-password");
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


    document.getElementById("signon-button").addEventListener("click", () => {
        console.log("ran");
        //todo test if fields are empty before sending!
        if (document.getElementById("signon-switch-label").children[0].checked) { //sign in
            fetch("/signon", {
                method: "POST",
                body: JSON.stringify({
                    "newaccount": false,
                    "email": document.getElementById("signon-email-input").value,
                    "password": document.getElementById("signon-password-input").value,
                    "firstname": document.getElementById("signon-email-input").value.split(" ")[0],
                    "lastname": document.getElementById("signon-email-input").value.split(" ")[1]
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(r => {
                //store cookie from response
                r.text().then((data) => {
                    console.log(data);
                    //sessionStorage.setItem("sessiontoken", data.substring(data.lastIndexOf("_") + 1));
                    window.location.replace(window.location.origin + "/account")
                });
            });
        } else {
            if (document.getElementById("extra-info-container").style.display === "none") {
                //bring layout for extra sign up data

            } else {
                //create new account
                fetch("/signon", {
                    method: "POST",
                    body: JSON.stringify({
                        "newaccount": true,
                        "email": "em",
                        "password": "pw",
                        "firstname": "fn",
                        "lastname": "ln",
                        "addressline1": "adl1",
                        "addressline2": "adl2",
                        "city": "ci",
                        "state": "st",
                        "country": "ct",
                        "zip": "zip",
                        "phone": "phone",
                        "cardnumber": "card#",
                        "cardexpirationdate": "exp",
                        "cardsecuritycode": "seccode",
                        "cardusername": "cun"
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(r => {
                    r.text().then((data) => {
                        console.log(data);
                        //sessionStorage.setItem("sessiontoken", data.substring(data.lastIndexOf("_") + 1));
                        window.location.replace(window.location.origin + "/account")
                    });
                });
            }
        }
    });
});

function registerAnimations() {

}
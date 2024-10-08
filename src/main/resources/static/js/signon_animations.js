


document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations();

    document.getElementById("signon-switch-label").addEventListener("change", () => {
        let state = document.getElementById("signon-switch-label").children[0].checked;
        if (state) { //go to dark mode
            document.getElementById("signon-content").classList.add("darkmode");
            document.getElementById("signon-container").classList.add("darkmode");
            for (const elem of document.getElementsByClassName("signon-container")) {
                elem.classList.add("darkmode");
            }

            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign In";
                document.getElementById("signon-text").textContent = "Sign in to your account to dramatically improve your shopping experience with us!";
                document.getElementById("signon-button").textContent = "Sign In";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "current-password");
            }, 500);

            document.getElementById("header-content").classList.add("header-light");
            document.getElementById("header-svg").classList.add("header-light");
            document.getElementById("header-content").classList.remove("header-dark");
            document.getElementById("header-svg").classList.remove("header-dark");
        } else { //go to light mode
            document.getElementById("signon-content").classList.remove("darkmode");
            document.getElementById("signon-container").classList.remove("darkmode");
            for (const elem of document.getElementsByClassName("signon-container")) {
                elem.classList.remove("darkmode");
            }

            setTimeout(() => {
                document.getElementById("signon-header").textContent = "Sign Up With Us!";
                document.getElementById("signon-text").textContent = "Creating an account with us allows you to earn rewards, create meal plans, and streamline future orders!";
                document.getElementById("signon-button").textContent = "Sign Up";
                document.getElementById("signon-password-input").setAttribute("autocomplete", "new-password");
            }, 500);

            document.getElementById("header-content").classList.add("header-dark");
            document.getElementById("header-svg").classList.add("header-dark");
            document.getElementById("header-content").classList.remove("header-light");
            document.getElementById("header-svg").classList.remove("header-light");
        }

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
    });


    document.getElementById("signon-button").addEventListener("click", () => {
        fetch("/signon", {
            method: "POST",
            body: JSON.stringify({
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
        });//.then(r => window.location.replace(window.location.origin + "/account"));
    });
});

function registerAnimations() {

    gsap.from("#header-container", {
        duration: 2,
        x: -200,
        opacity: 0,
        ease: "power1.inout",
    })
}
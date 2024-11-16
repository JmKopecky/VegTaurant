const lenis = new Lenis({
    syncTouch: true,
    duration: 1.5
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


function headerButtonClick() {
    let headerButton = document.getElementById("header-show-button");
    if (headerButton.getAttribute("data-headeropen") === "true") {
        headerButton.setAttribute("data-headeropen", "false");
        for (const link of document.getElementById("header-link-container").getElementsByTagName("a")) {
            if (!link.classList.contains("header-no-remove")) {
                link.setAttribute("style", "display: none;");
            }
        }
    } else {
        headerButton.setAttribute("data-headeropen", "true");
        for (const link of document.getElementById("header-link-container").getElementsByTagName("a")) {
            if (!link.classList.contains("header-no-remove")) {
                link.setAttribute("style", "display: block;");
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", (event) => {
    registerAnimations()

    let cartHeaderNumber = document.getElementById("cart-item-count");
    if (localStorage.getItem("cart") !== null && localStorage.getItem("cart") !== "unset") {
        cartHeaderNumber.textContent = JSON.parse(localStorage.getItem("cart")).length;
    } else {
        cartHeaderNumber.textContent = "0";
    }
});


function registerAnimations() {

}


function setAccountPage(target) {
    //animation for navigation
    for (const elem of document.getElementsByClassName("account-nav-listing")) {
        let type = elem.getElementsByTagName("p")[0].textContent;
        if (type === target) {
            elem.classList.add("selected");
        } else {
            elem.classList.remove("selected");
        }
    }

    //animation for panels
    let panel = "panel-" + target.split(" ")[0].toLowerCase();
    for (const elem of document.getElementsByClassName("setting-panel")) {
        if (elem.id === panel) {
            elem.style.display = "flex";
            gsap.to(elem, {
                opacity: "100%",
                ease: "none",
                duration: 0.5
            });
        } else {
            gsap.to(elem, {
                opacity: "0%",
                ease: "none",
                duration: 0.5
            });
            setTimeout(() => {
                elem.style.display = "none";
            }, 0.5);
        }
    }
}


function updateAccountSettings() {
    //name, email, imageurl
    let name = document.getElementById("setting-name-input");
    let email = document.getElementById("setting-email-input");
    let imageurl = document.getElementById("setting-picture-input");

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
    if (imageurl.value === "") {
        shouldSignUp = false;
        imageurl.style.color = "#ff0000";
    } else {
        imageurl.style.color = "#EEEEEE";
    }


    if (shouldSignUp) {
        fetch("/account", {
            method: "POST",
            body: JSON.stringify({
                "email": email.value,
                "name": name.value,
                "imageurl": imageurl.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            document.getElementById("indicator-overlay").style.display = "flex";
            document.getElementById("indicator-duration").style.width = "0%";
            gsap.to(document.getElementById("indicator-duration"), {
                width: "100%",
                ease: "none",
                duration: 1.5
            });
            setTimeout(() => {
                document.getElementById("indicator-overlay").style.display = "none";
            }, 1500);
        });
    }
}


function updateBillingSettings() {
    let address = document.getElementById("setting-address-input");
    let city = document.getElementById("setting-city-input");
    let zip = document.getElementById("setting-zip-input");
    let state = document.getElementById("setting-state-input");
    let country = document.getElementById("setting-country-input");
    let phone = document.getElementById("setting-phone-input");

    let cardnum = document.getElementById("setting-cardnum-input");
    let cardusername = document.getElementById("setting-cardusername-input");
    let cardexpdate = document.getElementById("setting-cardexpdate-input");
    let cardsecuritycode = document.getElementById("setting-cardsecuritycode-input");

    let shouldSignUp = true;

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
        fetch("/account", {
            method: "POST",
            body: JSON.stringify({
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
        }).then(() => {
            document.getElementById("indicator-overlay").style.display = "flex";
            document.getElementById("indicator-duration").style.width = "0%";
            gsap.to(document.getElementById("indicator-duration"), {
                width: "100%",
                ease: "none",
                duration: 1.5
            });
            setTimeout(() => {
                document.getElementById("indicator-overlay").style.display = "none";
            }, 1500);
        });
    }
}


function deleteAccount() {
    let password = document.getElementById("setting-password-delete-input");

    let shouldSignUp = true;
    if (password.value === "") {
        shouldSignUp = false;
        password.style.color = "#ff0000";
    } else {
        password.style.color = "#EEEEEE";
    }

    if (shouldSignUp) {
        fetch("/account", {
            method: "POST",
            body: JSON.stringify({
                "delete": true,
                "password": password.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((r) => {
            r.text().then(data => {
                if (data === "password") {
                    document.getElementById("setting-password-delete-input").value = "Incorrect Password";
                } else if (data.includes("redirect")) {
                    window.location.href = window.location.origin + "/" + data.split("_")[1];
                }

            })

        });
    }
}
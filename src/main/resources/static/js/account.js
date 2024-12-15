
function initAccount() {

}


function mobileNavAccordionClick(mode) {
    if (mode === 'show') {
        document.getElementById("nav-accordion-panel").style.display = "flex";
        document.getElementById("show-accordion-panel").style.display = "none";
        document.getElementById("hide-accordion-panel").style.display = "block";
    } else {
        document.getElementById("nav-accordion-panel").style.display = "none";
        document.getElementById("show-accordion-panel").style.display = "block";
        document.getElementById("hide-accordion-panel").style.display = "none";
    }
}


function setAccountPage(target) {

    document.getElementById("nav-accordion-header-label").textContent = target;
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
            showMessage('Success!');
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

    let shouldModify = true;

    if (address.value === "") {
        shouldModify = false;
        address.style.color = "#ff0000";
    } else {
        address.style.color = "#EEEEEE";
    }
    if (city.value === "") {
        shouldModify = false;
        city.style.color = "#ff0000";
    } else {
        city.style.color = "#EEEEEE";
    }
    if (zip.value === "") {
        shouldModify = false;
        zip.style.color = "#ff0000";
    } else {
        zip.style.color = "#EEEEEE";
    }
    if (state.value === "") {
        shouldModify = false;
        state.style.color = "#ff0000";
    } else {
        state.style.color = "#EEEEEE";
    }
    if (country.value === "") {
        shouldModify = false;
        country.style.color = "#ff0000";
    } else {
        country.style.color = "#EEEEEE";
    }
    if (phone.value === "") {
        shouldModify = false;
        phone.style.color = "#ff0000";
    } else {
        phone.style.color = "#EEEEEE";
    }
    if (cardnum.value === "") {
        shouldModify = false;
        cardnum.style.color = "#ff0000";
    } else {
        cardnum.style.color = "#EEEEEE";
    }
    if (cardusername.value === "") {
        shouldModify = false;
        cardusername.style.color = "#ff0000";
    } else {
        cardusername.style.color = "#EEEEEE";
    }
    if (cardexpdate.value === "") {
        shouldModify = false;
        cardexpdate.style.color = "#ff0000";
    } else {
        cardexpdate.style.color = "#EEEEEE";
    }
    if (cardsecuritycode.value === "") {
        shouldModify = false;
        cardsecuritycode.style.color = "#ff0000";
    } else {
        cardsecuritycode.style.color = "#EEEEEE";
    }


    if (shouldModify) {
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
            showMessage("Success!");
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
                    barba.go(window.location.origin + "/" + data.split("_")[1]);
                }
            })
        });
    }
}


function newPassword() {
    let pw1 = document.getElementById("setting-password-new-input");
    let pw2 = document.getElementById("setting-password-confirm-input");

    if (pw1.value === pw2.value) {
        fetch("/account", {
            method: "POST",
            body: JSON.stringify({
                "changepw": true,
                "password": pw1.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((r) => {
            r.text().then(data => {
                if (data === "pw_change_success") {
                    showMessage("Success!");
                } else {
                    showMessage("Failed To Change Password.");
                }
                pw2.style.color = pw1.style.color;
            })
        });
    } else {
        pw2.style.color = 'red';
        showMessage('Passwords Must Match!');
    }
}


function showMessage(message) {
    document.getElementById("indicator-content").textContent = message;
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
}
document.addEventListener("DOMContentLoaded", (event) => {


    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }


    barba.hooks.enter( (data) => {
        window.scrollY = 0;
        window.scrollTo(0,0);
    })


    barba.init({
        preventRunning: true,
        transitions: [{
            name: 'page-transition',
            leave: (data) => {
                return new Promise( (resolve) => {
                    document.getElementsByTagName("html")[0].classList.add("scroll-hide");
                    gsap.set(document.getElementById("page-transition-left"), {
                        x: 0
                    });
                    gsap.set(document.getElementById("page-transition-right"), {
                        x: 0
                    });
                    gsap.set(document.getElementById("page-transition-title"), {
                        y: 0,
                        opacity: 1
                    });
                    document.getElementById("page-transition-container").style.display = "flex";
                    document.getElementById("page-transition-title").style.visibility = "hidden";
                    gsap.from(document.getElementById("page-transition-container"), {
                        y: "200%",
                        ease: "power1.out",
                        duration: 0.25
                    });
                    setTimeout( () => {
                        resolve();
                    }, 250);
                });
            },
            beforeEnter: (data) => {
                //console.log(data.next.container);
                let title = data.next.container.getElementsByClassName("site-content")[0].getAttribute("data-title");
                console.log(title);
                document.getElementById("page-transition-title").textContent = title;
                document.getElementById("page-transition-title").style.visibility = "visible";
                gsap.from(document.getElementById("page-transition-title"), {
                    y: -1 * document.getElementById("page-transition-title").getBoundingClientRect().top,
                    ease: "power1.out",
                    duration: 0.25
                });
            },
            afterEnter: (data) => {
                setTimeout(() => {
                    data.next.container.getElementsByClassName("site-content")[0].style.opacity = "1";
                    gsap.to(document.getElementById("page-transition-left"), {
                        x: "-100%",
                        ease: "power1.out",
                        duration: 0.5
                    });
                    gsap.to(document.getElementById("page-transition-right"), {
                        x: "100%",
                        ease: "power1.out",
                        duration: 0.5
                    });
                    gsap.to(document.getElementById("page-transition-title"), {
                        opacity: 0,
                        ease: "power1.out",
                        duration: 0.25
                    });
                    setTimeout(() => {
                        document.getElementById("page-transition-container").style.display = "none";
                        gsap.set(document.getElementById("page-transition-left"), {
                            x: 0
                        });
                        gsap.set(document.getElementById("page-transition-right"), {
                            x: 0
                        });
                        gsap.set(document.getElementById("page-transition-title"), {
                            y: 0,
                            opacity: 0
                        });
                        document.getElementsByTagName("html")[0].classList.remove("scroll-hide");
                    }, 500);
                }, 1000);
            }
        }]
    });


    //run necessary js file inits
    updateJS(document.getElementById("barba-container").getAttribute("data-page"));

    barba.hooks.enter((data) => {
        let current = data.current.container;
        let next = data.next.container;

        let targetPage = next.getAttribute("data-page")
        updateJS(targetPage);
    });
});


function updateJS(target) {
    if (target === "home") {
        initHome();
    }
    if (target === "menu") {
        initMenu();
    }
    if (target === "account") {
        initAccount();
    }
    if (target === "order") {
        initOrder();
    }
    if (target === "signon") {
        initSignon();
    }
    if (target === "viewcart") {
        initCart();
    }
}



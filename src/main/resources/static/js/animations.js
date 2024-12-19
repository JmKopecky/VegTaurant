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
        cacheIgnore: ['/account/', '/signon/'],
        prefetchIgnore: ["/signon/", '/account/'],
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
                    prepareStartupAnims(document.getElementById("barba-container").getAttribute("data-page"));
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
                        runStartupAnims(document.getElementById("barba-container").getAttribute("data-page"));
                    }, 500);
                }, 1000);
            }
        }]
    });


    //run necessary js file inits
    updateJS(document.getElementById("barba-container").getAttribute("data-page"));


    barba.hooks.enter((data) => {
        data.current.container.remove();
    });

    barba.hooks.after((data) => {
        let next = document.getElementById("barba-container");
        let targetPage = next.getAttribute("data-page").toLowerCase();
        ScrollTrigger.killAll();
        setTimeout(() => {
            updateJS(targetPage);
            prepareStartupAnims(targetPage);
        }, 100);

        if (document.getElementById("mobile-header-popup").style.display !== "none") {
            document.getElementById("mobile-header-popup").style.display = "none";
        }
    })
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
    if (target === "cart") {
        initCart();
    }
}



function prepareStartupAnims(page) {

    prepareHeaderAnim();

    if (page === "home") {

        if (window.matchMedia("(width <= 775px)").matches) {
            let startBG = "linear-gradient(to bottom, #111111 100%, rgba(17, 17, 17, 0.6))";
            gsap.set(document.getElementById("hero-bgimg-overlay"), {background: startBG});
        } else {
            let startBG = "linear-gradient(to right, #111111 100%, rgba(17, 17, 17, 0.6))";
            gsap.set(document.getElementById("hero-bgimg-overlay"), {background: startBG});
        }
        gsap.set(document.getElementById("hero-interactable").getElementsByTagName("h1")[0], {
            opacity:0,
            y:window.innerHeight / 5});
        gsap.set(document.getElementById("hero-interactable").getElementsByTagName("h6")[0], {
            opacity:0,
            y:window.innerHeight / 5});
        gsap.set(document.getElementById("hero-button-container").getElementsByTagName("button"), {
            opacity:0,
            y:window.innerHeight / 5});
    }


    if (page === "menu") {
        gsap.set(document.getElementById("menu-banner"), {
            opacity:0,
            y:window.innerHeight / 5});
        gsap.set(document.getElementById("menu-categories-container"), {
            opacity:0,
            y:window.innerHeight / 5});
        gsap.set(document.getElementsByClassName("menu-tag-name"), {
            opacity: 0,
            y:window.innerHeight / 10})

        gsap.set(document.getElementsByClassName("menu-item"), {
            opacity: 0,
            y:window.innerHeight / 8})
    }


    if (page === "cart") {
        gsap.set(document.getElementsByClassName("cart-item-tile"), {opacity: 0, y: window.innerHeight / 5});
        gsap.set(document.getElementById("cart-totals"), {opacity: 0, y: window.innerHeight / 5});
        gsap.set(document.getElementById("cart-order-container"), {opacity: 0, y: window.innerHeight / 5});
    }


    if (page === "signon") {
        gsap.set(document.getElementById("toggle-signon-mode"), {
            opacity: 0, y: window.innerHeight / 5});
        gsap.set(document.getElementById("signon-container"), {
            opacity: 0, y: window.innerHeight / 5});
    }


    if (page === "account") {
        gsap.set(document.getElementById("account-menu-nav"), {
            opacity: 0, x:
                -1 * window.innerWidth / 5});
        gsap.set(document.getElementById("account-setting-panels"), {
            opacity: 0, x:
                window.innerWidth / 5});
    }


    if (page === "order") {
        gsap.set(document.getElementById("location-type-header"), {
            opacity: 0, y: window.innerHeight / 5});
        gsap.set(document.getElementById("location-address-selection"), {
            opacity: 0, y: window.innerHeight / 5});
        gsap.set(document.getElementsByClassName("loc-type-selectable"), {
            opacity: 0, y: window.innerHeight / 5});
    }


    if (page === "references") {
        /*
        let toAnim = [];
        for (const elem of document.getElementsByClassName("reference-header")) {toAnim.push(elem)}

        for (const target of toAnim) {
            gsap.set(target, {opacity: 0, y: window.innerHeight / 5});
        }
         */

    }
}


function runStartupAnims(page) {

    headerIntroAnim();

    if (page === "home") {
        //home page gradient
        if (window.matchMedia("(width <= 775px)").matches) {
            let targetBG = "linear-gradient(to bottom, #111111 0%, rgba(17, 17, 17, 0.6))";
            gsap.to(document.getElementById("hero-bgimg-overlay"), {background: targetBG, duration: 0.5, ease: "power1.inout", delay:2});
        } else {
            let targetBG = "linear-gradient(to right, #111111 0%, rgba(17, 17, 17, 0.6))";
            gsap.to(document.getElementById("hero-bgimg-overlay"), {background: targetBG, duration: 0.5, ease: "power1.inout", delay:2});
        }
        gsap.to(document.getElementById("hero-interactable").getElementsByTagName("h1")[0], {
            opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", delay: 1});
        gsap.to(document.getElementById("hero-interactable").getElementsByTagName("h6")[0], {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 1.25});
        gsap.to(document.getElementById("hero-button-container").getElementsByTagName("button"), {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 1.5, stagger: 0.15});
    }


    if (page === "menu") {
        gsap.to(document.getElementById("menu-banner"), {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 0.5});
        gsap.to(document.getElementById("menu-categories-container"), {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 0.75});
        setTimeout(() => {
            for (const target of document.getElementsByClassName("menu-tag-name")) {
                gsap.to(target, {opacity: 1, y:window.innerHeight / 12, duration: 0.5, ease: "power1.in", scrollTrigger:{
                        trigger: target,
                        start: "top 90%",
                    }});
                gsap.to(target, {y:0, scrollTrigger:{
                    trigger: target,
                        start: "top 90%",
                        end: "-=" + (window.innerHeight),
                        scrub: 1
                    }})
            }
        }, 1000);
        setTimeout(() => {
            for (const target of document.getElementsByClassName("menu-item")) {
                gsap.to(target, {opacity: 1, y:window.innerHeight / 10, duration: 0.5, ease: "power1.in", scrollTrigger:{
                        trigger: target,
                        start: "top 90%",
                    }});
                gsap.to(target, {y:0, scrollTrigger:{
                        trigger: target,
                        start: "top 90%",
                        end: "" + (window.innerHeight),
                        scrub: 1
                    }})
            }
        }, 1500);
    }


    if (page === "cart") {
        gsap.to(document.getElementsByClassName("cart-item-tile"), {
            opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", stagger: 0.1, delay: 0.75});
        gsap.to(document.getElementById("cart-totals"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 1});
        gsap.to(document.getElementById("cart-order-container"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 1.25});
    }


    if (page === "signon") {
        gsap.to(document.getElementById("toggle-signon-mode"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 0.75});
        gsap.to(document.getElementById("signon-container"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 1});
    }


    if (page === "account") {
        gsap.to(document.getElementById("account-menu-nav"), {opacity: 1, x: 0, duration: 0.5, ease: "power1.in", delay: 0.75});
        gsap.to(document.getElementById("account-setting-panels"), {opacity: 1, x: 0, duration: 0.5, ease: "power1.in", delay: 0.75});
    }


    if (page === "order") {
        gsap.to(document.getElementById("location-type-header"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 0.75});
        gsap.to(document.getElementById("location-address-selection"), {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 1.5});
        gsap.to(document.getElementsByClassName("loc-type-selectable"), {
            opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", stagger: 0.1, delay: 1});
    }


    if (page === "references") {
        /*
        let toAnim = [];
        for (const elem of document.getElementsByClassName("reference-header")) {toAnim.push(elem)}

        let index = 0;
        for (const target of toAnim) {
            gsap.to(target, {opacity: 1, y: 0, duration: 0.5, ease: "power1.in", delay: 0.75 + (index / 4.0)});
            index++;
        }
         */
    }
}


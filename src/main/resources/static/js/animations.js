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
        console.log(document.getElementsByClassName("barba-container"));
        let targetPage = next.getAttribute("data-page").toLowerCase();
        console.log(targetPage);
        ScrollTrigger.killAll();
        setTimeout(() => {
            updateJS(targetPage);
            prepareStartupAnims(targetPage);
        }, 100);

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
    if (target === "viewcart") {
        initCart();
    }
}



function prepareStartupAnims(page) {

    prepareHeaderAnim();

    if (page === "home") {
        let startBG = "linear-gradient(to right, #111111 100%, rgba(17, 17, 17, 0.6))";
        gsap.set(document.getElementById("hero-bgimg-overlay"), {background: startBG});
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

    }
}


function runStartupAnims(page) {

    headerIntroAnim();

    if (page === "home") {
        //home page gradient
        let targetBG = "linear-gradient(to right, #111111 0%, rgba(17, 17, 17, 0.6))";
        gsap.to(document.getElementById("hero-bgimg-overlay"), {background: targetBG, duration: 0.5, ease: "power1.inout", delay:3});
        gsap.to(document.getElementById("hero-interactable").getElementsByTagName("h1")[0], {
            opacity: 1, y: 0, duration: 0.5, ease: "power1.inout", delay: 1});
        gsap.to(document.getElementById("hero-interactable").getElementsByTagName("h6")[0], {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 1.5});
        gsap.to(document.getElementById("hero-button-container").getElementsByTagName("button"), {
            opacity: 1, y:0, duration: 0.5, ease: "power1.inout", delay: 2, stagger: 0.35});
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

    }
}


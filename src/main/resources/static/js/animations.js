const lenis = new Lenis({
    syncTouch: true,
    duration: 1.5
})
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


document.addEventListener("DOMContentLoaded", (event) => {
    registerScroll();
    registerAnimations();
});

let horizontalScroll;


function registerScroll() {
    gsap.registerPlugin(ScrollTrigger)

    const siteContentScrollContainer = document.getElementById("site-content");

    let totalScrollAmount = siteContentScrollContainer.scrollWidth - document.documentElement.clientWidth;// - (0.525 * window.innerWidth);
    horizontalScroll = gsap.to(siteContentScrollContainer, {
        x: -totalScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: "#site-content",
            start: "top " + -1,
            end: "+=" + totalScrollAmount,
            pin: true,
            scrub: true,
            normalize: true
        }
    });
}


function registerAnimations() {
    gsap.registerPlugin(ScrollTrigger)

    //header
    ScrollTrigger.create({
        trigger: "#transition-lighttodark",
        containerAnimation: horizontalScroll,
        start: "left left+="
            + (document.getElementById("header-content").clientWidth + document.getElementById("header-image-container").clientWidth),
        toggleActions: "play none none reverse",
        onEnter: () =>  {
            document.getElementById("header-content").classList.add("header-light");
            document.getElementById("header-svg").classList.add("header-light");
            document.getElementById("header-content").classList.remove("header-dark");
            document.getElementById("header-svg").classList.remove("header-dark");
        },
        onLeaveBack: () => {
            document.getElementById("header-content").classList.add("header-dark");
            document.getElementById("header-svg").classList.add("header-dark");
            document.getElementById("header-content").classList.remove("header-light");
            document.getElementById("header-svg").classList.remove("header-light");
        }
    });
    gsap.from("#header-container", {
        duration: 2,
        x: -200,
        opacity: 0,
        ease: "power1.inout",
    })

    registerTextAnimation("hero-text-anim", true, "fade-in");
    registerTextAnimation("hero-scrolltext-anim", true, "shine");
    registerTextAnimation("approaches-title-anim", false, "shine");
    registerTextAnimation("sample-title-anim", false, "shine");
    registerTextAnimation("text-account-anim", false, "shine");
    registerTextAnimation("text-story-anim", false, "shine");
    registerTextAnimation("collaborate-text-anim", false, "shine");
    registerTextAnimation("ratings-text-anim", false, "shine");

    //approaches-tiles
    gsap.from(".approaches-tile-title", {
        duration: 2,
        y: -200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: "#approaches-container",
            containerAnimation: horizontalScroll,
            start: "left 90%",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".approaches-tile-content", {
        duration: 2,
        y: 200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: "#approaches-container",
            containerAnimation: horizontalScroll,
            start: "left right",
            toggleActions: "play none none reverse"
        }
    });

    //collaborate section
    gsap.from(".collaborate-tile-anim", {
        duration: 2,
        y: 200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: "#work-with-us-container",
            containerAnimation: horizontalScroll,
            start: "center right",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".collaborate-tile-anim-left", {
        duration: 2,
        x: -200,
        opacity: 0,
        ease: "power1.inout",
        delay: 0.25,
        scrollTrigger: {
            trigger: "#work-with-us-container",
            containerAnimation: horizontalScroll,
            start: "center right",
            toggleActions: "play none none reverse"
        }
    });
    gsap.from(".collaborate-tile-anim-right", {
        duration: 2,
        x: 200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.50,
        scrollTrigger: {
            trigger: "#work-with-us-container",
            containerAnimation: horizontalScroll,
            start: "center right",
            toggleActions: "play none none reverse"
        }
    });

    //story section
    gsap.from(".story-anim", {
        duration: 2,
        y: 200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".story-anim",
            containerAnimation: horizontalScroll,
            start: "right right",
            toggleActions: "play none none reverse"
        }
    });

    //rating tiles
    for (const tile of document.getElementsByClassName("rating-tile-high")) {
        gsap.from(tile, {
            duration: 2,
            y: -200,
            opacity: 0,
            ease: "power1.inout",
            scrollTrigger: {
                trigger: tile,
                containerAnimation: horizontalScroll,
                start: "right right",
                toggleActions: "play none none reverse"
            }
        });
    }
    for (const tile of document.getElementsByClassName("rating-tile-low")) {
        gsap.from(tile, {
            duration: 2,
            delay: 0.5,
            y: -200,
            opacity: 0,
            ease: "power1.inout",
            scrollTrigger: {
                trigger: tile,
                containerAnimation: horizontalScroll,
                start: "right right",
                toggleActions: "play none none reverse"
            }
        });
    }

    //account suggestion
    gsap.from(".account-tile-animate", {
        duration: 2,
        y: -200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".account-tile-animate",
            containerAnimation: horizontalScroll,
            start: "right right",
            toggleActions: "play none none reverse"
        }
    });

    //top three
    gsap.from(".sample-bar", {
        duration: 2,
        y: 200,
        opacity: 0,
        ease: "power1.inout",
        stagger: 0.25,
        scrollTrigger: {
            trigger: "#sample-container",
            containerAnimation: horizontalScroll,
            start: "left center",
            toggleActions: "play none none reverse"
        }
    });

    //menutitle animations
    const menuTitle = document.getElementById("menu-title");
    gsap.from(menuTitle, {
        x: -0.5 * document.getElementById("menu-title-container").getBoundingClientRect().width + menuTitle.getBoundingClientRect().width/2,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: menuTitle,
            containerAnimation: horizontalScroll,
            start: "center right",
            scrub: 1
        }
    });
    gsap.from(menuTitle, {
        opacity: 0,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: menuTitle,
            containerAnimation: horizontalScroll,
            start: "center right",
            scrub: 2
        }
    })

}


function registerTextAnimation(targetClass, shouldRunOnLoad, type) {
    for (const elem of document.getElementsByClassName(targetClass)) {

        //split each character of the text into its own span, assign that span a class for later.
        let text = elem.textContent;
        elem.innerHTML = "";
        for (const word of text.split(" ")) {
            elem.innerHTML += "<span style=\"display: inline-block\" class=" + targetClass + "-character" + ">" + word + "</span>";
            elem.innerHTML += "<span style=\"display: inline-block\" class=" + targetClass + "-character" + ">" + "&nbsp;" + "</span>";
        }


        let linebrokenhtml = "";
        let prevheight = 99999;
        let lineCount = 1;
        for (const word of elem.children) {
            if (prevheight < word.offsetTop) {
                linebrokenhtml += "<br/>";
                lineCount++;
            }
            prevheight = word.offsetTop;
            if (word.innerHTML === "&nbsp;") {
                linebrokenhtml += "<span style=\"display: inline-block\" class=" + targetClass + "-character" + ">" + "&nbsp;" + "</span>";
            } else {
                for (const char of word.innerHTML.split("")) {
                    linebrokenhtml += "<span style=\"display: inline-block\" class=" + targetClass + "-character" + ">" + char + "</span>";
                }

            }
        }
        let lineBreakPos = linebrokenhtml.lastIndexOf("<br>");
        linebrokenhtml = linebrokenhtml.substring(0, (lineBreakPos > 0) ? lineBreakPos : linebrokenhtml.length);
        if (linebrokenhtml.lastIndexOf("&nbsp;</span>") === linebrokenhtml.length - 13) {
            linebrokenhtml = linebrokenhtml.substring(0, linebrokenhtml.lastIndexOf("<span"));
        }

        elem.innerHTML = linebrokenhtml;

        gsap.registerPlugin(ScrollTrigger);

        if (type === "fade-in") {
            if (shouldRunOnLoad) {
                gsap.from("." + targetClass + "-character", {
                    duration: 1,
                    y: "100",
                    opacity: 0,
                    ease: "power1.inout",
                    stagger: 0.025,
                });
            } else {
                gsap.from("." + targetClass + "-character", {
                    duration: 1,
                    y: "100",
                    opacity: 0,
                    ease: "power1.inout",
                    stagger: 0.025,
                    scrollTrigger: {
                        trigger: "." + targetClass,
                        containerAnimation: horizontalScroll,
                        start: "left center",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }


        if (type === "shine") {
            let colorInitial = getComputedStyle(document.getElementsByClassName(targetClass + "-character")[0]).color;

            let index = 0;
            for (const elem of document.getElementsByClassName(targetClass + "-character")) {
                let shineTimeline;
                if (shouldRunOnLoad) {
                    shineTimeline = gsap.timeline();
                } else {
                    shineTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: elem.parentElement,
                            containerAnimation: horizontalScroll,
                            start: "left center",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
                shineTimeline.to(elem, {
                    duration: 0.5,
                    color: "#16DE69",
                    ease: "power1.inout",
                    delay: index * 0.02
                });
                shineTimeline.to(elem, {
                    duration: 0.5,
                    color: colorInitial,
                    ease: "power1.inout",
                });
                index++;
            }

        }
    }
}

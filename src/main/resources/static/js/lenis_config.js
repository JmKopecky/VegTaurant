const lenis = new Lenis()
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
            invalidateOnRefresh: true
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
        x: -0.45 * document.getElementById("menu-title-container").getBoundingClientRect().width,
        duration: 5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: menuTitle,
            containerAnimation: horizontalScroll,
            start: "center center",
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
            start: "center center",
            scrub: 2
        }
    })
}
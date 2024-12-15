function endPreloader() {
    gsap.set(document.getElementById("page-transition-left"), {
        x: 0
    });
    gsap.set(document.getElementById("page-transition-right"), {
        x: 0
    });
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
        document.getElementById("page-transition-title").classList.remove("preloader");
        runStartupAnims(document.getElementById("barba-container").getAttribute("data-page"));
    }, 500);
}


function showTitle(thenEnd) {
    animationblocking = true;
    document.getElementById("page-transition-title").classList.add("preloader");
    let titleTime = 1;
    document.getElementById("page-transition-title").style.visibility = "visible";
    gsap.from(document.getElementById("page-transition-title"), {
        y: -1 * document.getElementById("page-transition-title").getBoundingClientRect().top,
        ease: "power1.out",
        duration: titleTime
    });
    let timeline = gsap.timeline();
    timeline.to(document.getElementById("page-transition-title"), {
        scale: 1.15,
        duration: titleTime/2.0,
        ease: "power1.inout"
    });
    timeline.to(document.getElementById("page-transition-title"), {
        scale: 1,
        duration: titleTime/2.0,
        ease: "power1.inout",
        onComplete() {
            if (animationblocking && (thenEnd || pendingTitle)) {
                //timeline.kill();
                //killTweensOf(document.getElementById("page-transition-title"));
                endPreloader();
            }
        }
    });
    timeline.repeat(preloaderTime / titleTime);

    setTimeout(() => {
        animationblocking = false;
    }, titleTime * 1000);
}


let preloaderTime = 2;
let documentReady = false;
let timeReady = false;
let animationblocking = false;
let pendingTitle = false;
setTimeout(() => {
    timeReady = true;
    if (documentReady && !animationblocking) {
        endPreloader();
    } else {
        pendingTitle = true;
    }
}, preloaderTime * 1000);

document.addEventListener("DOMContentLoaded", () => {
    if (timeReady) {
        //show title, then end preloader
        showTitle(true);
    } else {
        showTitle(false)
        documentReady = true;
    }
});
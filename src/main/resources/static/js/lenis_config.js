const lenis = new Lenis()
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    const siteContentScrollContainer = document.getElementById("site-content");

    let totalScrollAmount = siteContentScrollContainer.scrollWidth;// - (0.525 * window.innerWidth);
    gsap.to(siteContentScrollContainer, {
        x: -totalScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: "#site-content",
            start: "top " + 0,
            end: "+=" + totalScrollAmount,
            pin: true,
            scrub: true
        }
    });
});
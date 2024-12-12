document.addEventListener("DOMContentLoaded", (event) => {

    console.log(barba)

    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0
                });
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0
                });
            }
        }]
    });

/*
    barba.hooks.beforeEnter(({ current, next }) => {
        console.log(typeof next);
        let newHead = next.html.split("<head>")[1].split("</head>")[0];
        console.log(newHead);

        document.getElementsByTagName("head")[0].innerHTML = newHead;

        //current.html.replace("<head>(.*)</head>", newHead);
        // Get next page scripts.
        //const nextScripts = $(nextHtml).filter("#scripts");
        // Replace the current scripts with the new ones.
        //$("#scripts").html(nextScripts.html());
    });
*/
});



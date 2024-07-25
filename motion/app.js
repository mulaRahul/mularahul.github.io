document.addEventListener("DOMContentLoaded", (event) => {
    // register gsap plugins
    gsap.registerPlugin(ScrollTrigger);

    // :: hero text ::
    const r = new rive.Rive({
        src: "res/text.riv",
        canvas: document.querySelector(".rive-text-wrapper.text-looking canvas"),
        artboard: "looking",
        autoplay: true,
        stateMachines: "state-machine",
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            // input
            const inputs = r.stateMachineInputs("state-machine");
            const xInput = inputs.find(i => i.name === 'x');
            const yInput = inputs.find(i => i.name === 'y');
            // mousemove
            const heroSection = document.querySelector("section.hero");
            heroSection.addEventListener("mousemove", (e) => {
                xInput.value = Math.round((e.clientX / heroSection.offsetWidth) * 100);
                yInput.value = Math.round((e.clientY / heroSection.offsetHeight) * 100);
            });
        },
    });

    gsap.utils.toArray("section.hero h1 .animate-in").forEach((text, i) => {
        const split = SplitType.create(text, {types: "chars"});

        const a = gsap.from(split.chars, {
                yPercent: 100,
                duration: .5,
                delay: i+.5, 
                stagger: { amount: 0.2 },
                onComplete: () => a.kill(),
        });
    });

    // :: paragraph scroll reveal ::
    gsap.utils.toArray("section.brief").forEach(section => {
        gsap.to(section.querySelector("p.scroll-reveal > span.scroll"), {
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
                end: "bottom 75%",
                scrub: 1,
            },
            backgroundSize: "150% 100%",
        });

        // image reveal
        const imgContainer = section.querySelector(".image-container");
        
        section.querySelectorAll(".reveal-image").forEach(text => {
            const img = imgContainer.querySelector(`#${text.dataset.imgId}`);

            text.addEventListener("mouseenter", () => {
                img.style.visibility = "visible";
                imgContainer.style.opacity = 1;
            });
            text.addEventListener("mouseleave", () => {
                imgContainer.style.opacity = 0;
                setTimeout(() => {
                    img.style.visibility = "hidden";
                }, 200);
            });

            text.addEventListener("mousemove", (e) => {
                imgContainer.style.transform = `translate(${e.clientX}px, ${e.clientY+ 20}px)`;
            });
        });
    });


    
    // :: section works ::
    const workItemLinks = document.querySelectorAll("section.works .navigation a");
    const itemCount = workItemLinks.length;
    const itemPercent = (1/itemCount)*100;
    const snapPercent = 1/(itemCount-1);
    // opener
    gsap.from("section.works>.wrapper", {
        scrollTrigger: {
            trigger: "section.works",
            start: "top 40%",
            end: "top top",
            scrub: 1,
        },
        width: 0,
    });
    // scrolling video containers 
    gsap.to("section.works .video-items", {
        xPercent: -100+itemPercent,
        ease: "none",
        scrollTrigger: {
            trigger: "section.works",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            snap: {snapTo: snapPercent, directional: false, duration: 0.4, delay: 0, ease: "power4.out"},
            onSnapComplete: (self) => {
                const current = document.querySelector("section.works .navigation a.active")
                const toBe = workItemLinks[Math.ceil(self.progress/snapPercent)];
                if (!current || current.innerText != toBe.innerText) {  
                    current.classList.remove("active");
                    toBe.classList.add("active");
                }
            },
        },
    });
    // scrolling text blocks
    gsap.to("section.works .text-blocks", {
        yPercent: -100+itemPercent,
        ease: "none",
        scrollTrigger: {
            trigger: "section.works",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
    });
    // navigation links
    const sectionWorks = document.querySelector("section.works");
    console.log(sectionWorks);
    workItemLinks.forEach((e, i) => {
        e.onclick = () => {
            const current = document.querySelector("section.works .navigation a.active")
            if (!current || current.innerText != e.innerText) {
                current.classList.remove("active");
                e.classList.add("active");
                const a = gsap.to(
                    window,
                    {
                        duration: 1,
                        ease: "power4.out",
                        scrollTo: sectionWorks.offsetTop + ((sectionWorks.scrollHeight / itemCount) * i),
                        onComplete: () => a.kill(),
                    }
                );
            }
        }
    });

    // :: footer ::
    setTimeout(() => {        
        const contactBtn = document.querySelector(".footer #contact");
        const rect = contactBtn.getBoundingClientRect();
        // highlight contact    
        gsap.to(".footer .highlight", {
            x: rect.x,
            y: contactBtn.getBoundingClientRect().y - document.querySelector(".footer").getBoundingClientRect().y,
            width: rect.width,
            height: rect.height,
            scrollTrigger: {
                trigger: ".footer",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            },
        });
    }, 3000);

    // :: italics hover interaction ::
    gsap.utils.toArray("i.hover-rot").forEach(e => {
        const text = SplitType.create(e, { types: 'words, chars' });

        const hoverRotAnimation = gsap.to(text.chars, {
            paused: true,
            rotationX: 360,
            duration: 1,
            stagger: { amount: 0.3 },
        });
        
        if (e.classList.contains("animate-in")) {
            const a = gsap.fromTo(
                text.chars,
                {
                    rotationX: -270,
                },
                {
                    rotationX: 0,
                    duration: 1,
                    delay: 2, 
                    stagger: { amount: 0.3 },
                    onComplete: () =>  a.kill(),
                }
            );
        }

        e.addEventListener("mouseenter", () => hoverRotAnimation.restart());
    });
});
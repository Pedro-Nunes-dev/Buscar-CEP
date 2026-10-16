const carousel = document.querySelector(".infinityCarousel");
const track = carousel?.querySelector(".carrosselTrack");
const sourceGroup = track?.querySelector(".grupo");

if (carousel && track && sourceGroup) {
    const originalContent = sourceGroup.innerHTML;
    let resizeFrame;

    const buildCarousel = () => {
        track.replaceChildren();

        const firstGroup = document.createElement("div");
        firstGroup.className = "grupo";
        firstGroup.innerHTML = originalContent;
        track.append(firstGroup);

        const groupWidth = firstGroup.getBoundingClientRect().width;
        if (groupWidth === 0) {
            return;
        }

        const copiesNeeded = Math.max(1, Math.ceil(carousel.clientWidth / groupWidth));
        firstGroup.innerHTML = originalContent.repeat(copiesNeeded);

        const secondGroup = firstGroup.cloneNode(true);
        secondGroup.setAttribute("aria-hidden", "true");
        track.append(secondGroup);

        const sequenceWidth = firstGroup.getBoundingClientRect().width;
        track.style.setProperty("--duracao-carrossel", `${sequenceWidth / 80}s`);
        carousel.classList.add("is-ready");
    };

    buildCarousel();

    window.addEventListener("resize", () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(buildCarousel);
    });
}
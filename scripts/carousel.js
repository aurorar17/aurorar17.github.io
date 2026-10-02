document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".technologies-container");
  if (!container) return;

  // Keep the previous carousel behavior on mobile and tablet.
  if (!window.matchMedia("(min-width: 900px)").matches) {
    const images = Array.from(container.children);
    let scrollAmount = 0;

    container.style.width = "max-content";
    container.style.minWidth = "100%";
    container.style.willChange = "transform";
    container.style.transition = "none";

    images.forEach((image) => container.appendChild(image.cloneNode(true)));

    function scrollCarousel() {
      const trackWidth = container.scrollWidth;
      const mobileSpeed = 0.5;
      scrollAmount -= mobileSpeed;
      container.style.transform = `translateX(${scrollAmount}px)`;

      if (Math.abs(scrollAmount) >= trackWidth / 2) {
        scrollAmount = 0;
        container.style.transition = "none";
        container.style.transform = `translateX(${scrollAmount}px)`;

        setTimeout(() => {
          container.style.transition = "none";
        }, 20);
      }
    }

    setInterval(scrollCarousel, 16);
    return;
  }

  const icons = Array.from(container.children);
  if (icons.length === 0) return;

  const firstGroup = document.createElement("div");
  firstGroup.className = "technology-group";
  icons.forEach((icon) => firstGroup.appendChild(icon));

  const secondGroup = firstGroup.cloneNode(true);
  secondGroup.setAttribute("aria-hidden", "true");
  secondGroup.querySelectorAll("img").forEach((icon) => {
    icon.alt = "";
  });

  container.replaceChildren(firstGroup, secondGroup);
  container.style.transition = "none";

  let groupWidth = firstGroup.getBoundingClientRect().width;
  let offset = 0;
  let previousTime = 0;
  const speed = 35; // pixel al secondo

  const resizeObserver = new ResizeObserver(() => {
    groupWidth = firstGroup.getBoundingClientRect().width;
    offset = groupWidth ? offset % groupWidth : 0;
  });
  resizeObserver.observe(firstGroup);

  function animate(time) {
    if (previousTime) {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05);
      offset = (offset + speed * elapsed) % groupWidth;
      container.style.transform = `translateX(${-offset}px)`;
    }

    previousTime = time;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});

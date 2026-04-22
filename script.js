const revealItems = document.querySelectorAll(".reveal");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroVideo = document.querySelector(".hero-background-video");

const revealIfInView = (element) => {
  const rect = element.getBoundingClientRect();

  if (rect.top <= window.innerHeight * 0.92) {
    element.classList.add("is-visible");
    return true;
  }

  return false;
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px -24px 0px",
  }
);

revealItems.forEach((item) => {
  if (!revealIfInView(item)) {
    observer.observe(item);
  }
});

if (heroSlides.length > 1) {
  let activeSlide = 0;

  window.setInterval(() => {
    heroSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add("is-active");
  }, 4800);
}

if (heroVideo) {
  const useFallbackSlides = () => {
    heroVideo.classList.add("is-hidden");
    document.body.classList.add("hero-video-fallback");
  };

  heroVideo.addEventListener("error", useFallbackSlides);

  heroVideo.play().catch(() => {
    useFallbackSlides();
  });
}

const revealItems = document.querySelectorAll(".reveal");

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

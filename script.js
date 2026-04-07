const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav__link");
const revealElements = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const sections = document.querySelectorAll("main section[id]");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const currentYear = document.querySelector("#currentYear");
const whatsappNumber = "5575982932782";

const closeMenu = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    siteNav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

document.addEventListener("click", (event) => {
    if (!siteNav?.classList.contains("is-open")) {
        return;
    }

    const clickedInsideNav = siteNav.contains(event.target);
    const clickedToggle = navToggle?.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
        closeMenu();
    }
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
    }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    {
        threshold: 0.45,
    }
);

sections.forEach((section) => sectionObserver.observe(section));

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = filter === "all" || category === filter;
            card.classList.toggle("is-hidden", !shouldShow);
        });
    });
});

window.addEventListener("scroll", () => {
    const shouldShowButton = window.scrollY > 420;
    backToTop?.classList.toggle("is-visible", shouldShowButton);
});

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const whatsappMessage = [
        "Olá, Pablo! Vim pelo seu portfólio.",
        "",
        `Nome: ${name}`,
        `Email: ${email}`,
        `Mensagem: ${message}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    formStatus.textContent = "Abrindo WhatsApp...";

    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!whatsappWindow) {
        window.location.href = whatsappUrl;
    }

    contactForm.reset();
});

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

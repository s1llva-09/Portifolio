document.documentElement.classList.add('js'); // sem JS, nada de reveal: conteudo aparece igual
// nav: fundo so depois que sai do topo
const header = document.getElementById('header');
new IntersectionObserver(
  ([e]) => header.classList.toggle('scrolled', !e.isIntersecting),
  { threshold: 0 }
).observe(document.getElementById('top-sentinel'));

// menu mobile
const toggle = document.getElementById('menu-toggle');
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
header.querySelectorAll('nav a, header .btn').forEach((a) =>
  a.addEventListener('click', () => {
    header.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// marquee infinito: duplica a lista pro translateX(-50%) fechar o loop
const marquee = document.getElementById('marquee');
marquee.innerHTML += marquee.innerHTML;

// reveal no scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  },
  { rootMargin: '0px 0px -12% 0px' }
);
document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  io.observe(el);
});

document.getElementById('year').textContent = new Date().getFullYear();

// luz que segue o cursor nos cards (so em mouse, nao em touch)
if (matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

// tema: claro por padrao, escolha do visitante fica salva
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const tema = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = tema;
  localStorage.setItem('tema', tema);
  document.querySelector('meta[name="theme-color"]').content =
    tema === 'dark' ? '#0b0b0c' : '#f7f4ef';
});

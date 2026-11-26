/* ==========================================================================
   NYXG7 — site behaviour
   --------------------------------------------------------------------------
   CHANNELS: paste the real profile URL into `url` to activate a row.
   Leave a url empty and the row renders as a "Soon" placeholder.
   ========================================================================== */

const CHANNELS = [
  {
    name: 'Discord',
    handle: 'nyxg7',
    desc: 'Day-to-day chat, channels and events',
    url: '',
  },
  {
    name: 'TikTok',
    handle: '@tvxnzy7',
    desc: 'Clips, edits and quick updates',
    url: 'https://www.tiktok.com/@tvxnzy7',
  },
  {
    name: 'YouTube',
    handle: 'Long form',
    desc: 'Project videos and deep dives',
    url: '',
  },
  {
    name: 'Instagram',
    handle: 'Visual',
    desc: 'Photos, stories and announcements',
    url: '',
  },
];

/* -------------------------------------------------------------------------- */

const ACCENTS = [
  { id: 'violet', label: 'Purple' },
  { id: 'blue', label: 'Blue' },
  { id: 'pink', label: 'Pink' },
  { id: 'cyan', label: 'Cyan' },
];

const currentAccent = { value: 'violet' };

function pad(n) {
  return String(n).padStart(2, '0');
}

/* Channels ---------------------------------------------------------------- */

function renderChannels() {
  const list = document.querySelector('[data-channel-list]');
  if (!list) return;

  const frag = document.createDocumentFragment();

  CHANNELS.forEach((channel, index) => {
    const isLink = Boolean(channel.url);
    const row = document.createElement(isLink ? 'a' : 'div');
    row.className = 'channel' + (isLink ? '' : ' channel--soon');

    if (isLink) {
      row.href = channel.url;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
      row.setAttribute(
        'aria-label',
        `${channel.name} — ${channel.desc} (opens in a new tab)`
      );
    } else {
      row.setAttribute('aria-disabled', 'true');
    }

    row.innerHTML = `
      <span class="channel__index">${pad(index + 1)}</span>
      <span class="channel__name">
        ${channel.name}
        <span class="channel__handle">${channel.handle}</span>${isLink ? '' : '<span class="channel__tag">Soon</span>'}
      </span>
      <span class="channel__desc">${channel.desc}</span>
      <span class="channel__arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M4 12L12 4M6 4h6v6" stroke-linecap="square" />
        </svg>
      </span>
    `;

    frag.appendChild(row);
  });

  list.replaceChildren(frag);
}

/* Accent colour ----------------------------------------------------------- */

function applyAccent(id) {
  currentAccent.value = id;
  document.documentElement.setAttribute('data-accent', id);

  document.querySelectorAll('.swatch').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.accent === id));
  });
}

function renderSwatches() {
  document.querySelectorAll('[data-swatches]').forEach((group) => {
    const frag = document.createDocumentFragment();

    ACCENTS.forEach((accent) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'swatch';
      button.dataset.accent = accent.id;
      button.setAttribute('aria-label', `${accent.label} accent`);
      button.setAttribute('aria-pressed', String(accent.id === currentAccent.value));
      button.title = accent.label;
      button.addEventListener('click', () => applyAccent(accent.id));
      frag.appendChild(button);
    });

    group.replaceChildren(frag);
  });

  applyAccent(currentAccent.value);
}

/* Mobile navigation ------------------------------------------------------- */

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.inert = !open && window.matchMedia('(width <= 900px)').matches;
  };

  const syncInert = () => {
    nav.inert = window.matchMedia('(width <= 900px)').matches && !document.body.classList.contains('nav-open');
  };

  toggle.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('nav-open'));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', syncInert);
  syncInert();
}

/* Scroll state ------------------------------------------------------------ */

function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* Init -------------------------------------------------------------------- */

renderChannels();
renderSwatches();
initMenu();
initScrollSpy();

/**
 * BOO.WORLD/MATCH – Main JS
 * Handles: page loader, navbar scroll, scroll reveal,
 *          personality grid interactions, particles canvas,
 *          profile marquee, match bar animations, cursor glow,
 *          mobile nav, toast notifications.
 */

/* ─── Page Loader ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
    // Trigger initial animations
    animateHeroMatchBars();
    revealOnScroll();
  }, 1000);
});

/* ─── Read-progress bar ───────────────────────────────────── */
const readProgress = document.getElementById('read-progress');
window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = (scrollTop / docHeight) * 100;
  if (readProgress) readProgress.style.width = pct + '%';
}, { passive: true });

/* ─── Navbar scroll ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (navbar) {
    if (y > 40) navbar.classList.add('scrolled');
    else        navbar.classList.remove('scrolled');
    // Hide on scroll-down, show on scroll-up (mobile)
    if (y > lastScroll && y > 200) navbar.style.transform = 'translateY(-100%)';
    else                            navbar.style.transform = 'translateY(0)';
    lastScroll = y;
  }
}, { passive: true });

/* ─── Mobile Nav ─────────────────────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ─── Cursor Glow ────────────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ─── Scroll Reveal ──────────────────────────────────────── */
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', revealOnScroll);

/* ─── Animate hero match-bar fills ──────────────────────── */
function animateHeroMatchBars() {
  document.querySelectorAll('.match-bar-fill').forEach(bar => {
    const target = bar.dataset.pct || '80';
    bar.style.width = target + '%';
  });
}

/* ─── Personality Compatibility Grid ────────────────────── */
const TYPES = {
  INFJ: { name: 'Advocate',     traits: ['Insightful','Principled','Compassionate','Decisive'] },
  INFP: { name: 'Mediator',     traits: ['Empathetic','Open-minded','Creative','Idealistic'] },
  INTJ: { name: 'Architect',    traits: ['Strategic','Determined','Private','Confident'] },
  INTP: { name: 'Thinker',      traits: ['Analytical','Inventive','Objective','Curious'] },
  ENFJ: { name: 'Protagonist',  traits: ['Charismatic','Reliable','Passionate','Altruistic'] },
  ENFP: { name: 'Campaigner',   traits: ['Enthusiastic','Creative','Sociable','Optimistic'] },
  ENTJ: { name: 'Commander',    traits: ['Bold','Imaginative','Efficient','Confident'] },
  ENTP: { name: 'Debater',      traits: ['Clever','Curious','Energetic','Quick-witted'] },
  ISFJ: { name: 'Defender',     traits: ['Supportive','Reliable','Patient','Imaginative'] },
  ISFP: { name: 'Adventurer',   traits: ['Charming','Sensitive','Curious','Artistic'] },
  ISTJ: { name: 'Logistician',  traits: ['Honest','Dedicated','Calm','Orderly'] },
  ISTP: { name: 'Virtuoso',     traits: ['Observant','Practical','Bold','Experimental'] },
  ESFJ: { name: 'Consul',       traits: ['Caring','Loyal','Warm','Practical'] },
  ESFP: { name: 'Entertainer',  traits: ['Bold','Original','Focused','Practical'] },
  ESTJ: { name: 'Executive',    traits: ['Organised','Honest','Dedicated','Dignified'] },
  ESTP: { name: 'Entrepreneur', traits: ['Bold','Rational','Energetic','Perceptive'] },
};

const COMPAT = {
  INFJ: { best: 'ENTP', pct: 96, desc: 'INFJs and ENTPs share an intuitive bond. The ENTP\'s wit and curiosity ignite the INFJ\'s depth, while the INFJ grounds the ENTP\'s scattered brilliance into meaningful action.', shared: ['Deep conversations','Growth mindset','Creative thinking','Big-picture vision'] },
  INFP: { best: 'ENFJ', pct: 94, desc: 'INFPs and ENFJs form a deeply empathetic connection. The ENFJ\'s warmth and vision inspire the INFP\'s creativity, creating a partnership rooted in values and emotional depth.', shared: ['Authentic expression','Humanitarian values','Artistic pursuits','Emotional depth'] },
  INTJ: { best: 'ENFP', pct: 92, desc: 'INTJs and ENFPs balance each other beautifully. The ENFP brings spontaneity and enthusiasm to the INTJ\'s world, while the INTJ provides direction and depth.', shared: ['Intellectual curiosity','Long-term goals','Independence','Open-mindedness'] },
  INTP: { best: 'ENTJ', pct: 90, desc: 'INTPs and ENTJs are a powerhouse combination. The ENTJ\'s decisive leadership complements the INTP\'s analytical depth, together achieving remarkable things.', shared: ['Logical thinking','Efficiency','Knowledge','Innovation'] },
  ENFJ: { best: 'INFP', pct: 94, desc: 'ENFJs and INFPs create a soulful, values-driven bond. The ENFJ\'s passion for helping others aligns perfectly with the INFP\'s deep empathy.', shared: ['Empathy','Personal growth','Creativity','Making a difference'] },
  ENFP: { best: 'INTJ', pct: 92, desc: 'ENFPs and INTJs are drawn to each other\'s complexity. The ENFP opens the INTJ\'s heart while the INTJ brings focus to the ENFP\'s abundant energy.', shared: ['Big ideas','Personal development','Authenticity','Innovation'] },
  ENTJ: { best: 'INTP', pct: 90, desc: 'ENTJs and INTPs form a sharp, intellectually stimulating duo. Together they solve problems efficiently and push each other toward excellence.', shared: ['Strategic thinking','Ambition','Debate','Systems building'] },
  ENTP: { best: 'INFJ', pct: 96, desc: 'ENTPs find their match in INFJs. The INFJ\'s wisdom and depth captivates the ENTP, while the ENTP brings an exciting, challenging energy the INFJ craves.', shared: ['Ideas exchange','Deep talks','Growth','Challenging norms'] },
  ISFJ: { best: 'ESTP', pct: 88, desc: 'ISFJs and ESTPs bring balance to each other. The ESTP\'s bold adventures excite the ISFJ\'s nurturing heart, while the ISFJ provides stability and warmth.', shared: ['Practical care','Loyalty','Present focus','Hands-on activities'] },
  ISFP: { best: 'ESFJ', pct: 87, desc: 'ISFPs and ESFJs both value harmony and authentic connections. Together they create a warm, supportive relationship full of shared experiences.', shared: ['Artistic expression','Harmony','Loyalty','Appreciation of beauty'] },
  ISTJ: { best: 'ESFP', pct: 86, desc: 'ISTJs and ESFPs complement each other. The ESFP brings fun and spontaneity to the ISTJ\'s structured world, while the ISTJ provides the stability the ESFP needs.', shared: ['Practicality','Reliability','Traditions','Real-world focus'] },
  ISTP: { best: 'ESTJ', pct: 85, desc: 'ISTPs and ESTJs are action-oriented partners who respect each other\'s competence. They work effectively together with minimal friction.', shared: ['Efficiency','Problem solving','Hands-on skills','Practicality'] },
  ESFJ: { best: 'ISFP', pct: 87, desc: 'ESFJs and ISFPs share a love of beauty, harmony, and genuine connections. The ESFJ\'s warmth creates a safe space for the ISFP to open up.', shared: ['Kindness','Loyalty','Aesthetic appreciation','Caring for others'] },
  ESFP: { best: 'ISTJ', pct: 86, desc: 'ESFPs and ISTJs balance spontaneity with structure. The ESFP brings excitement while the ISTJ provides dependable support and grounding.', shared: ['Fun experiences','Loyalty','Practical focus','Caring relationships'] },
  ESTJ: { best: 'ISTP', pct: 85, desc: 'ESTJs and ISTPs respect each other\'s competence and directness. Together they are efficient, practical, and effective at achieving goals.', shared: ['Logic','Efficiency','Reliability','Competence'] },
  ESTP: { best: 'ISFJ', pct: 88, desc: 'ESTPs and ISFJs create an exciting, balanced partnership. The ESTP\'s energy is met by the ISFJ\'s steady warmth and care.', shared: ['Adventure','Real-world action','Loyalty','Present moments'] },
};

const avatarEmoji = { INFJ:'🌌',INFP:'🌸',INTJ:'⚡',INTP:'🔭',ENFJ:'🌟',ENFP:'🎨',ENTJ:'🔥',ENTP:'💡',ISFJ:'🌻',ISFP:'🎵',ISTJ:'🏛️',ISTP:'🔧',ESFJ:'💖',ESFP:'🎉',ESTJ:'📋',ESTP:'🏄' };
const typeColors  = ['av-purple','av-pink','av-teal','av-orange','av-green'];
function typeColor(type) {
  const idx = Object.keys(TYPES).indexOf(type) % typeColors.length;
  return typeColors[idx];
}

let selectedType = 'INFJ';

function initCompatGrid() {
  const grid = document.getElementById('compat-grid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.keys(TYPES).forEach(code => {
    const btn = document.createElement('button');
    btn.className = 'compat-type-btn' + (code === selectedType ? ' active' : '');
    btn.dataset.type = code;
    btn.innerHTML = `<span class="compat-type-code">${code}</span><span class="compat-type-name">${TYPES[code].name}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.compat-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = code;
      updateCompatResult(code);
    });
    grid.appendChild(btn);
  });
}

function updateCompatResult(typeA) {
  const compat = COMPAT[typeA];
  if (!compat) return;
  const typeB = compat.best;
  const result = document.getElementById('compat-result');
  if (!result) return;

  const traitsA = TYPES[typeA]?.traits || [];
  const traitsB = TYPES[typeB]?.traits || [];

  result.innerHTML = `
    <div class="compat-profile reveal visible">
      <div class="compat-avatar type-a">${avatarEmoji[typeA] || '🎭'}</div>
      <div class="compat-type-tag purple">${typeA}</div>
      <div class="compat-name">${TYPES[typeA]?.name || typeA}</div>
      <div class="compat-traits">
        ${traitsA.map(t => `<span class="trait-pill">${t}</span>`).join('')}
      </div>
    </div>

    <div class="compat-middle">
      <div class="compat-vs">BEST MATCH</div>
      <div class="compat-score-circle" style="--pct:${compat.pct}">
        <div class="compat-score-inner">
          <span class="compat-score-val">${compat.pct}%</span>
          <span class="compat-score-lbl">COMPAT</span>
        </div>
      </div>
      <div style="font-size:1.6rem; animation: heartBeat 1.8s ease-in-out infinite;">❤️</div>
    </div>

    <div class="compat-profile reveal visible">
      <div class="compat-avatar type-b">${avatarEmoji[typeB] || '🎭'}</div>
      <div class="compat-type-tag pink">${typeB}</div>
      <div class="compat-name">${TYPES[typeB]?.name || typeB}</div>
      <div class="compat-traits">
        ${traitsB.map(t => `<span class="trait-pill">${t}</span>`).join('')}
      </div>
    </div>
  `;

  const descBox = document.getElementById('compat-desc');
  if (descBox) {
    descBox.innerHTML = `
      <p>${compat.desc}</p>
      <div class="compat-shared">
        ${compat.shared.map(s => `<span class="badge badge-purple">${s}</span>`).join('')}
      </div>
    `;
  }
}

/* ─── Profile carousel duplication for seamless loop ──── */
function initProfileCarousel() {
  const track = document.getElementById('profiles-track');
  if (!track) return;
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

/* ─── Particles canvas ───────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    a:  Math.random(),
  }));

  const colors = ['123,92,250', '255,107,157', '78,205,196'];

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors[i % colors.length]}, ${p.a * 0.6})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

/* ─── Toast notification ──────────────────────────────── */
function showToast(msg, icon = '✨') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span>${msg}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── Smooth scroll for anchor links ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Active nav link on scroll ──────────────────────── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  const scrollY  = window.scrollY;

  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      links.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ─── CTA button interactions ────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-toast]');
  if (btn) {
    showToast(btn.dataset.toast, btn.dataset.toastIcon || '🎉');
  }
});

/* ─── Initialise everything on DOMContentLoaded ─────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCompatGrid();
  updateCompatResult('INFJ');
  initProfileCarousel();
  revealOnScroll();
});

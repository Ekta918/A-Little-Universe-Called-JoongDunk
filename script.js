// Sticky nav style on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// If a photo is missing, hide the broken icon and keep the soft gradient frame
document.querySelectorAll('img').forEach(img => {
  if (img.closest('#lightbox')) return;
  img.addEventListener('error', () => img.classList.add('missing'));
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const closeLb = () => { lightbox.hidden = true; lbImg.removeAttribute('src'); };

document.querySelectorAll('.g').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    if (img.classList.contains('missing')) return;
    lbImg.classList.remove('missing');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lightbox.hidden = false;
  });
});
lightbox.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// ===== Send some love: petals float from the bottom of the screen to the top =====
const symbols = ['🌸','🌷','🌼','🪻','🤍','💙','🩷','🦋','✨','⭐','🌟','🌙','☁️'];
const messages = [
  'Thank you for the stars.',
  'Thank you for the sky.',
  'Still cheering for both of you.',
  'Every scene and every song, kept close.',
  'Wishing you both bright, happy paths.',
  'You gave us so many good memories.'
];
const toast = document.getElementById('toast');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let msgIndex = 0, toastTimer;

function showToast() {
  toast.textContent = messages[msgIndex++ % messages.length];
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function sendLove() {
  showToast();
  if (reduceMotion) return;
  const h = window.innerHeight, w = window.innerWidth;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * (w - 40) + 'px';
    p.style.fontSize = 18 + Math.random() * 28 + 'px';
    document.body.appendChild(p);

    const sway = (Math.random() - 0.5) * 160;
    const spin = (Math.random() - 0.5) * 360;
    const rise = h + 120;
    const anim = p.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
      { transform: `translate(${sway * 0.4}px,${-rise * 0.15}px) rotate(${spin * 0.2}deg)`, opacity: 1, offset: 0.12 },
      { transform: `translate(${-sway * 0.6}px,${-rise * 0.55}px) rotate(${spin * 0.6}deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${sway}px,${-rise}px) rotate(${spin}deg)`, opacity: 0 }
    ], {
      duration: 3800 + Math.random() * 3200,
      delay: Math.random() * 600,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    anim.onfinish = () => p.remove();
  }
}
document.querySelectorAll('.love-btn').forEach(b => b.addEventListener('click', sendLove));

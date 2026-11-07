// ── Scan animation ──
const results = [
  'pass','fail','fail','pass','warn','pass','warn'
];
const labels = [
  '<span class="sl-pass">✓ encrypted</span>',
  '<span class="sl-fail">✗ missing</span>',
  '<span class="sl-fail">✗ missing</span>',
  '<span class="sl-pass">✓ present</span>',
  '<span class="sl-warn">⚠ missing</span>',
  '<span class="sl-pass">✓ present</span>',
  '<span class="sl-warn">⚠ missing</span>',
];

let scanStarted = false;
function startScan() {
  if (scanStarted) return;
  scanStarted = true;
  results.forEach((_, i) => {
    setTimeout(() => {
      const el = document.getElementById('sl' + i);
      el.classList.add('show');
      el.querySelector('.sl-dots').style.display = 'none';
      el.insertAdjacentHTML('beforeend', labels[i]);
      if (i === results.length - 1) {
        setTimeout(() => {
          document.getElementById('scan-result').classList.add('show');
        }, 400);
      }
    }, 300 + i * 320);
  });
}

// Start scan when hero is visible
const heroObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { setTimeout(startScan, 800); heroObs.disconnect(); }
}, { threshold: 0.3 });
const ticker = document.querySelector('.scan-ticker');
if (ticker) heroObs.observe(ticker);

// ── Scroll reveal ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.05) + 's';
      e.target.classList.add('revealed');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

// ── Copy ──
function copyVal(id, btnId) {
  const text = document.getElementById(id).textContent;
  const btn  = document.getElementById(btnId);
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ copied';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('ok'); }, 1800);
  }).catch(() => {
    btn.textContent = 'select & copy';
    setTimeout(() => { btn.textContent = 'copy'; }, 2000);
  });
}
function openWA() {
  const btn = document.getElementById('wa-btn');
  btn.textContent = '↗';
  setTimeout(() => { btn.textContent = 'open →'; }, 1200);
  window.open('https://wa.me/447700000000?text=Hi%20dj%2C%20I%27d%20like%20a%20free%20security%20audit%20for%20my%20website%3A%20', '_blank');
}

// ── Wire up buttons (replaces inline onclick handlers) ──
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) copyBtn.addEventListener('click', () => copyVal('email-val', 'copy-email'));
  const waBtn = document.getElementById('wa-btn');
  if (waBtn) waBtn.addEventListener('click', openWA);
});

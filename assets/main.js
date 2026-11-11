/* Laureano Lojo — portfolio
   The desk: real objects on a cutting mat you can pick up, toss and open. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lang = 'en';
  try { const saved = localStorage.getItem('lang'); if (saved === 'es' || saved === 'en') lang = saved; } catch (e) {}

  const pick = f => (f == null ? '' : typeof f === 'string' ? f : (f[lang] || f.en || ''));
  const yearOf = p => (lang === 'es' ? (p.yearEs || p.year) : p.year);
  const inkOn = hex => { const n = parseInt(hex.slice(1), 16); const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)); return l > 150 ? '#000' : '#fff'; };

  /* ── language ── */
  const RING = { en: 'available for good projects ✳ available for good projects ✳', es: 'disponible para buenos proyectos ✳ disponible para buenos proyectos ✳' };
  let rerender = () => {};
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-en]').forEach(el => { const v = el.dataset[lang]; if (v != null) el.textContent = v; });
    $$('[data-en-label]').forEach(el => el.setAttribute('aria-label', el.dataset[lang + 'Label'] || el.dataset.enLabel));
    $$('.ring-text').forEach(el => { el.textContent = RING[lang]; });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    rerender();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang; try { localStorage.setItem('lang', lang); } catch (e) {}
    applyLang();
  }));

  /* ── copy email ── */
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); } catch (e) { location.href = 'mailto:' + btn.dataset.copy; return; }
    btn.textContent = lang === 'es' ? 'Copiado' : 'Copied';
    setTimeout(() => { btn.textContent = btn.dataset[lang]; }, 1800);
  }));

  /* ── work list (home) ── */
  const list = $('#work-list');
  function renderWork() {
    if (!list) return;
    list.innerHTML = PROJECTS.map(p => `
      <a class="proj" href="project.html?slug=${p.slug}" style="--accent:${p.accent};--tab-ink:${inkOn(p.accent)}">
        <div class="folder">
          <span class="tab">${pick(p.category)}</span>
          <div class="sheet"><img src="${p.cover}" alt="" loading="lazy"></div>
        </div>
        <div>
          <h3>${pick(p.title)}</h3>
          <p class="meta">${pick(p.role)}, ${yearOf(p)}</p>
          <p class="sum">${pick(p.summary)}</p>
          <span class="open">${lang === 'es' ? 'Ver el proyecto' : 'See the project'}</span>
        </div>
      </a>`).join('');
  }

  /* ── project page ── */
  const pd = $('#pd');
  function renderProject() {
    if (!pd) return;
    const slug = new URLSearchParams(location.search).get('slug');
    const i = Math.max(0, PROJECTS.findIndex(p => p.slug === slug));
    const p = PROJECTS[i], next = PROJECTS[(i + 1) % PROJECTS.length];
    const title = pick(p.title);
    document.title = title + ', Laureano Lojo';
    pd.style.setProperty('--accent', p.accent);
    $('#pd-title').textContent = title;
    $('#pd-role').textContent = pick(p.role);
    $('#pd-cat').textContent = pick(p.category);
    $('#pd-year').textContent = yearOf(p);
    const visit = $('#pd-visit');
    if (p.link) { visit.hidden = false; visit.href = p.link; visit.textContent = (lang === 'es' ? 'Visitar ' : 'Visit ') + p.link.replace(/^https?:\/\/|\/$/g, ''); } else visit.hidden = true;
    const cover = $('#pd-cover'); cover.src = p.cover; cover.alt = title;
    $('#pd-desc').textContent = pick(p.story ? p.summary : p.description);
    const gal = $('#pd-gallery');
    if (p.story) { gal.className = 'story'; gal.innerHTML = p.story.map(storyBlock).join(''); }
    else { gal.className = 'gallery'; gal.innerHTML = p.gallery.map(src => `<img src="${src}" alt="${title}" loading="lazy">`).join(''); }
    $('#pd-next-name').textContent = pick(next.title);
    $('#pd-next').href = 'project.html?slug=' + next.slug;
  }


  /* ── case-study blocks (used when a project has a story) ── */
  const head = b => `<div class="blk-text"><h2>${pick(b.title)}</h2><p>${pick(b.text)}</p></div>`;
  const CHIPS = [['#4AED80', { en: 'every day', es: 'cada día' }, '#000'], ['#8B5CF6', { en: 'BIG tings', es: 'BIG tings' }, '#fff']];
  function storyBlock(b) {
    if (b.type === 'split') return `<div class="blk blk-split">${head(b)}<img src="${b.img}" alt="${b.alt || ''}" loading="lazy"></div>`;
    if (b.type === 'wide') return `<div class="blk blk-wide${b.tall ? ' tall' : ''}">${head(b)}<img src="${b.img}" alt="${b.alt || ''}" loading="lazy"></div>`;
    if (b.type === 'glasses') return `<div class="blk blk-glasses">${head(b)}
        <div class="lenses">
          <img src="${b.imgs[0]}" alt="" loading="lazy">
          <video src="${b.video}" poster="${b.poster}" autoplay muted loop playsinline preload="metadata" aria-label="${lang === 'es' ? 'goodtings. en las gafas, vídeo' : 'goodtings. on the glasses, video'}"></video>
          <img src="${b.imgs[1]}" alt="" loading="lazy">
        </div></div>`;
    if (b.type === 'brand') return `<div class="blk blk-brand">${head(b)}
        <div class="kit">
          <div class="k-mark"><img src="assets/images/projects/goodtings/wordmark-white.svg" alt="goodtings. wordmark"></div>
          <div class="k-type"><b>Aa</b><span>Figtree</span><span class="k-sample">collect the good.<br>build your year.</span></div>
          ${CHIPS.map(([c, n, ink]) => `<div class="k-chip" style="background:${c};color:${ink}"><span>${pick(n)}</span><span>${c}</span></div>`).join('')}
        </div></div>`;
    return '';
  }

  rerender = () => { renderWork(); renderProject(); };

  /* ── the desk ── */
  const desk = $('#desk');
  if (desk) {
    // the printed ruler numbers along the top edge (one per 40px "centimetre")
    const nums = document.createDocumentFragment();
    for (let x = 40, n = 1; x < 2600; x += 40, n++) { const s = document.createElement('span'); s.className = 'ruler-n'; s.style.left = x + 'px'; s.textContent = n; nums.appendChild(s); }
    desk.appendChild(nums);

    const items = $$('.obj', desk).map((el, i) => ({ el, i, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, w: 0, h: 0, held: false, z: i + 2, pop: 1 }));
    let W = 0, H = 0, S = 1, mode = '', zTop = items.length + 2, raf = 0;

    function layout() {
      const rect = desk.getBoundingClientRect(); W = rect.width; H = rect.height;
      const m = W < 640 ? 'm' : 'd';
      S = m === 'm' ? Math.max(.48, Math.min(.6, W / 680)) : Math.max(.78, Math.min(1, W / 1380));
      items.forEach(it => { it.w = it.el.offsetWidth; it.h = it.el.offsetHeight; });
      if (m !== mode) {            // (re)place everything for this layout
        mode = m;
        items.forEach(it => {
          const [fx, fy, r] = (it.el.dataset[m === 'm' ? 'm' : 'at']).split(',').map(Number);
          it.x = fx * W + it.w * S / 2; it.y = fy * H + 22 + it.h * S / 2; it.r = r; it.vx = it.vy = it.vr = 0;
        });
      }
      items.forEach(clamp); items.forEach(draw);
    }
    function clamp(it) {
      const hw = it.w * S / 2 * .8, hh = it.h * S / 2 * .8;
      let hit = false;
      if (it.x < hw) { it.x = hw; it.vx = Math.abs(it.vx) * .45; hit = true; }
      if (it.x > W - hw) { it.x = W - hw; it.vx = -Math.abs(it.vx) * .45; hit = true; }
      if (it.y < hh + 18) { it.y = hh + 18; it.vy = Math.abs(it.vy) * .45; hit = true; }
      if (it.y > H - hh) { it.y = H - hh; it.vy = -Math.abs(it.vy) * .45; hit = true; }
      if (hit) it.vr += (Math.random() - .5) * 2;
    }
    function draw(it) {
      const s = S * (it.held ? 1.04 : 1) * it.pop;
      it.el.style.transform = `translate(${it.x - it.w / 2}px, ${it.y - it.h / 2}px) rotate(${it.r}deg) scale(${s})`;
      it.el.style.zIndex = it.z;
    }
    function tick() {
      let moving = false;
      items.forEach(it => {
        if (it.held) return;
        if (Math.abs(it.vx) + Math.abs(it.vy) + Math.abs(it.vr) < .02) { it.vx = it.vy = it.vr = 0; return; }
        moving = true;
        it.x += it.vx; it.y += it.vy; it.r += it.vr;
        it.vx *= .92; it.vy *= .92; it.vr *= .9;
        clamp(it); draw(it);
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    // pick up, drag, toss
    items.forEach(it => {
      const el = it.el;
      let id = null, sx = 0, sy = 0, ox = 0, oy = 0, lx = 0, ly = 0, lt = 0, moved = 0, t0 = 0, gy = 0;
      el.addEventListener('dragstart', e => e.preventDefault());
      el.addEventListener('pointerdown', e => {
        if (e.button) return;
        id = e.pointerId; el.setPointerCapture(id);
        const b = desk.getBoundingClientRect();
        sx = lx = e.clientX; sy = ly = e.clientY; lt = t0 = performance.now(); moved = 0;
        ox = e.clientX - b.left - it.x; oy = e.clientY - b.top - it.y;
        gy = oy / (it.h * S / 2 || 1);                  // grabbed above or below the middle
        it.held = true; it.vx = it.vy = it.vr = 0; it.z = ++zTop; el.classList.add('held');
        desk.classList.add('touched'); draw(it);
      });
      el.addEventListener('pointermove', e => {
        if (e.pointerId !== id) return;
        const b = desk.getBoundingClientRect(), now = performance.now(), dt = Math.max(8, now - lt);
        const dx = e.clientX - lx;
        it.vx = (e.clientX - lx) / dt * 16; it.vy = (e.clientY - ly) / dt * 16;
        it.x = e.clientX - b.left - ox; it.y = e.clientY - b.top - oy;
        it.r += -dx * .06 * gy;                         // objects swing a little as you drag them
        moved = Math.max(moved, Math.hypot(e.clientX - sx, e.clientY - sy));
        lx = e.clientX; ly = e.clientY; lt = now;
        clamp(it); draw(it);
      });
      const drop = e => {
        if (e.pointerId !== id) return;
        id = null; it.held = false; el.classList.remove('held');
        if (performance.now() - lt > 80) { it.vx = it.vy = 0; }
        it.vr = -it.vx * .25 * gy;
        el.dataset.dragged = moved > 6 ? '1' : '';
        if (moved <= 6 && el.tagName !== 'A') { it.vr = (Math.random() > .5 ? 1 : -1) * 3; }   // a little wiggle when tapped
        draw(it); kick();
      };
      el.addEventListener('pointerup', drop);
      el.addEventListener('pointercancel', drop);
      el.addEventListener('click', e => { if (el.dataset.dragged) { e.preventDefault(); el.dataset.dragged = ''; } });
      // keyboard: arrows nudge the focused object
      el.addEventListener('keydown', e => {
        const k = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] }[e.key];
        if (!k) return; e.preventDefault();
        it.x += k[0]; it.y += k[1]; it.z = ++zTop; desk.classList.add('touched'); clamp(it); draw(it);
      });
    });

    // set the desk: things get placed one after another
    layout();
    if (!reduce) {
      items.forEach(it => { it.pop = 1.18; it.el.style.opacity = 0; draw(it); });
      items.forEach((it, k) => setTimeout(() => {
        const t1 = performance.now(), r0 = it.r - 8 * (k % 2 ? 1 : -1);
        it.el.style.opacity = 1;
        const step = now => {
          const p = Math.min(1, (now - t1) / 520), e = 1 - Math.pow(1 - p, 3), over = Math.sin(p * Math.PI) * .03;
          it.pop = 1.18 - .18 * e - over; const r = r0 + (it.r - r0) * e;
          const keep = it.r; it.r = r; draw(it); it.r = keep;
          if (p < 1) requestAnimationFrame(step); else { it.pop = 1; draw(it); }
        };
        requestAnimationFrame(step);
      }, 250 + k * 110));
    }
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
    document.fonts && document.fonts.ready.then(layout);
  }

  applyLang();
})();

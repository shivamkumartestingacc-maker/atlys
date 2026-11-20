/* Page behaviour: mode switch, section nav, reveal, overlay, demos. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  document.documentElement.classList.add('js');

  /* ---------- mode ---------- */
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  function setMode(m, scrollTo) {
    document.body.classList.toggle('docmode', m === 'doc');
    $$('.mode button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
    store.set('gc2gt-mode', m);
    if (scrollTo) { const el = document.getElementById(scrollTo); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  $$('.mode button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
  $$('[data-doc]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); setMode('doc', a.dataset.doc); }));
  setMode(new URLSearchParams(location.search).get('mode') === 'doc' ? 'doc' : (store.get('gc2gt-mode') || 'pres'));

  /* ---------- rail + progress ---------- */
  const secs = $$('section.sec');
  const where = $('#where');
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting && where) where.textContent = `${en.target.dataset.n} · ${en.target.dataset.t}`; });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach((s) => io.observe(s));
  const prog = $('.progress');
  const onScroll = () => { const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* keyboard: J/K or arrows move between sections (presentation feel) */
  addEventListener('keydown', (e) => {
    if ($('.ov.open') || /input|textarea/i.test(e.target.tagName)) return;
    if (!['j', 'k'].includes(e.key) || e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault();
    const y = scrollY + 80;
    const idx = secs.findIndex((s) => s.offsetTop > y);
    const cur = idx === -1 ? secs.length - 1 : idx - 1;
    const down = e.key === 'j';
    const t = secs[Math.max(0, Math.min(secs.length - 1, down ? cur + 1 : cur - 1))];
    t.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- reveal ---------- */
  const rv = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); rv.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); else rv.observe(el); });

  /* ---------- autoplay demos ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroEl = $('#heroPhone');
  const journey = $$('#jlist li');
  const expEl = $('#expPhone');
  if (heroEl) TripRoom(heroEl, { auto: !reduce, scenario: 'scratch' });
  if (expEl) TripRoom(expEl, { auto: !reduce, scenario: 'scratch', onStep: (n) => journey.forEach((li, i) => li.classList.toggle('on', i === n)) });

  /* ---------- overlay ---------- */
  const ov = $('#ov');
  const gsteps = $('#gsteps');
  const why = $('#why');
  const WHY = [
    'Trips start as a group chat like any other. The assistant only flags a group when it hears trip intent. Nothing else changes about how people chat.',
    'Friends talk the way they already do. Limits and wishes come up in passing, which is exactly where they usually get lost.',
    'The assistant drafts a trip brief from the chat: who, when, where, budget. Every line is editable and marked as a draft. Nothing starts until someone taps Start.',
    'Everyone answers privately first: in or out, dates they can\'t do, a budget cap, vibe. Constraints and preferences are kept separate. Budget can stay private.',
    'Hard constraints come first and define the date window. Preferences show as counts, not averages. Trade-offs are named so the group can talk about them.',
    'Options are ranked by fit per person, not popularity. Options that break a constraint stay visible and marked, so nobody wonders what was filtered out.',
    'Love it / can live with it / can\'t do it. A "can\'t" is a veto, so the result is something everyone accepts. The minority view is kept.',
    'The plan stays tentative until every traveller confirms. Then it becomes a trip workspace: what is decided, what is next. The AI never confirms for anyone.'
  ];
  gsteps.innerHTML = TripRoom.STEPS.map((s, i) => `<li><i>0${i + 1}</i>${s}</li>`).join('');
  const syncGuide = (n) => {
    $$('li', gsteps).forEach((li, i) => { li.classList.toggle('on', i === n); li.classList.toggle('done', i < n); });
    why.innerHTML = `<b>WHY STEP ${n + 1} WORKS THIS WAY</b><p>${WHY[n]}</p>`;
  };
  let live = null, lastFocus = null;
  const scale = () => {
    const box = $('#ovPhoneBox');
    const avail = Math.min(innerHeight - 88, 796);
    box.style.setProperty('--s', Math.max(0.6, avail / 796).toFixed(3));
  };
  function openOv(scn) {
    lastFocus = document.activeElement;
    ov.classList.add('open'); document.body.style.overflow = 'hidden';
    scale();
    const el = $('#ovPhone');
    if (!live) live = TripRoom(el, { scenario: scn || 'scratch', onStep: syncGuide });
    else live.reset(scn || 'scratch');
    $$('#scn button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === (scn || 'scratch'))));
    $('#ovClose').focus();
  }
  function closeOv() { ov.classList.remove('open'); document.body.style.overflow = ''; if (live) live.stop(); if (lastFocus) lastFocus.focus(); }
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => openOv(b.dataset.open || 'scratch')));
  $('.ov .x').addEventListener('click', closeOv);
  $('#ovClose').addEventListener('click', closeOv);
  ov.addEventListener('click', (e) => { if (e.target === ov) closeOv(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov.classList.contains('open')) closeOv(); });
  $$('#scn button').forEach((b) => b.addEventListener('click', () => { $$('#scn button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); live.reset(b.dataset.s); }));
  $('#ovReset').addEventListener('click', () => live && live.reset());
  addEventListener('resize', () => { if (ov.classList.contains('open')) scale(); });
})();

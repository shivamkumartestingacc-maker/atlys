/* Trip Room prototype: group chat + shared trip workspace + simulated AI.
   One component, two uses: autoplay demo (auto:true) and interactive overlay.
   All data is mock. No network calls. */
(function () {
  const WEEKS = ['14–20 Dec', '21–25 Dec', '26–28 Dec', '29 Dec–3 Jan'];
  const PEOPLE = {
    r: { name: 'Riya', c: '#7A5AD8', bg: '#EEEAFE' },
    a: { name: 'Arjun', c: '#B4531A', bg: '#FDF1E7' },
    m: { name: 'Maya', c: '#3D44C9', bg: '#EEF0FE' },
    k: { name: 'Kabir', c: '#178556', bg: '#E9F6F0' },
    z: { name: 'Zoya', c: '#C8363B', bg: '#FDECEC' }
  };
  const OTHERS = ['a', 'm', 'k', 'z'];
  const VIBES = { beach: 'Beach', hills: 'Hills', city: 'City', food: 'Food' };
  const STEP_NAMES = ['Groups home', 'Group conversation', 'AI trip brief', 'Preferences & constraints', 'Group alignment', 'Destination comparison', 'Collaborative decision', 'Trip workspace'];

  const SC = {
    scratch: {
      group: 'Dec plans??',
      seed: [
        ['k', 'we should actually go somewhere this December'],
        ['m', 'yesss. somewhere with a beach please'],
        ['a', "I'm in, but my leave only starts after the 20th"],
        ['k', "beach works, but I'd love some hills too"],
        ['z', "count me in if it's not crazy expensive. saving up for a laptop"],
        ['m', 'oh and I fly home on the 29th']
      ],
      detectTitle: 'Sounds like a trip is taking shape',
      detect: [
        ['Who', '5 interested', ''],
        ['When', 'December · after 20th, before 29th', ''],
        ['Where', 'Open · beach (2), hills (1)', 'open'],
        ['Budget', '1 person is budget-sensitive', 'private']
      ],
      detectSub: 'Picked up from 6 messages. Tap a line to correct it.',
      othersCant: { a: [0], m: [3], k: [], z: [] },
      othersIn: { a: 'in', m: 'in', k: 'in', z: 'maybe' },
      othersVibe: { a: { beach: 'nice' }, m: { beach: 'must' }, k: { hills: 'nice', beach: 'nice' }, z: { city: 'nice' } },
      hard: [
        { id: 'h1', text: 'Arjun · not before 21 Dec', src: 'From chat' },
        { id: 'h2', text: 'Maya · back home by 28 Dec', src: 'From chat' },
        { id: 'h3', text: 'Budget cap · ₹55k per person', src: '1 private answer' }
      ],
      conflicts: (c) => [
        { t: 'Beach vs hills', tag: 'Preference', p: `${c.beach} lean beach, ${c.hills} want hills. Places with both rank higher. Nobody gets outvoted on a nice-to-have.` },
        { t: 'Peak week vs budget', tag: 'Constraint', p: 'Late December is peak season. One private budget cap rules some places out. They stay visible, marked, so nothing is hidden.' }
      ],
      options: [
        { id: 'kr', name: 'Krabi, Thailand', img: 'assets/card-thailand.jpg', week: 1, price: 48000, vibes: ['beach', 'hills'], why: 'Beaches plus karst viewpoints. Meets every hard constraint.', trade: 'Peak week: stays need booking early.', fits: { a: 'g', m: 'g', k: 'g', z: 'g' } },
        { id: 'vn', name: 'Hanoi + Ha Long, Vietnam', img: 'assets/card-vietnam.jpg', week: 1, price: 52000, vibes: ['hills', 'city', 'food'], why: 'Bay cruise, hills and street food.', trade: "No real beach. Misses Maya's must-have.", fits: { a: 'g', m: 'a', k: 'g', z: 'g' } },
        { id: 'ba', name: 'Bali, Indonesia', img: 'assets/card-indonesia.jpg', week: 1, price: 68000, vibes: ['beach', 'hills'], why: 'Strong on both beach and hills.', trade: 'Over one private budget cap.', fits: { a: 'g', m: 'g', k: 'g', z: 'r' }, breaks: 'Over 1 private budget' }
      ],
      votes: { kr: { a: 'l', m: 'l', k: 'o', z: 'l' }, vn: { a: 'l', m: 'o', k: 'l', z: 'o' }, ba: {} },
      minority: (w) => w === 'kr' ? "Kabir leaned towards hills. Day 3 keeps a viewpoint hike, so his pick isn't lost." : 'Maya wanted a beach. Saved as the first idea for the next trip.',
      nights: 4
    },
    known: {
      group: 'Vietnam in Dec!',
      seed: [
        ['a', 'ok Vietnam it is. finally'],
        ['m', 'Ha Long Bay is non-negotiable for me'],
        ['k', 'can we keep it under 60k each?'],
        ['z', "I can't take more than 5 days off"],
        ['a', "and I'm only free after the 20th"]
      ],
      detectTitle: 'Vietnam is decided. The rest is open',
      detect: [
        ['Where', 'Vietnam · agreed by 4 of 5', ''],
        ['When', 'After 20th Dec · max 5 days', ''],
        ['Must', 'Ha Long Bay (Maya)', ''],
        ['Budget', 'Around ₹60k · not confirmed', 'check']
      ],
      detectSub: 'Picked up from 5 messages. Tap a line to correct it.',
      othersCant: { a: [0], m: [], k: [], z: [] },
      othersIn: { a: 'in', m: 'in', k: 'in', z: 'in' },
      othersVibe: { a: { food: 'nice' }, m: { beach: 'nice' }, k: { hills: 'nice' }, z: { food: 'nice' } },
      hard: [
        { id: 'h1', text: 'Arjun · not before 21 Dec', src: 'From chat' },
        { id: 'h2', text: 'Zoya · max 5 days away', src: 'From chat' },
        { id: 'h3', text: 'Maya · must include Ha Long Bay', src: 'From chat' },
        { id: 'h4', text: 'Budget cap · ₹60k per person', src: '1 private answer' }
      ],
      conflicts: (c) => [
        { t: 'Hills vs food', tag: 'Preference', p: `${c.hills} want hills, ${c.food} lean food and city. Sapa adds hills but costs a long train ride.` },
        { t: '5-day limit', tag: 'Constraint', p: 'One person can only take 5 days. Longer routes stay visible, marked, so the trade-off is clear.' }
      ],
      options: [
        { id: 'n', name: 'Hanoi + Ha Long · 5 days', img: 'assets/hero-home.jpg', week: 1, price: 54000, vibes: ['food', 'city'], why: 'Old Quarter food and an overnight bay cruise.', trade: 'No hills, no beach.', fits: { a: 'g', m: 'g', k: 'a', z: 'g' } },
        { id: 's', name: 'Ha Long + Sapa · 5 days', img: 'assets/card-vietnam.jpg', week: 1, price: 57000, vibes: ['hills', 'food'], why: 'Bay cruise plus two days in the hills.', trade: 'Overnight train both ways.', fits: { a: 'g', m: 'g', k: 'g', z: 'g' } },
        { id: 'p', name: 'Ha Long + Phu Quoc · 7 days', img: '', week: 1, price: 66000, vibes: ['beach'], why: 'Bay cruise and three beach days.', trade: "Breaks a 5-day limit and a budget cap.", fits: { a: 'g', m: 'g', k: 'g', z: 'r' }, breaks: 'Breaks 2 hard constraints' }
      ],
      votes: { n: { a: 'l', m: 'l', k: 'o', z: 'l' }, s: { a: 'o', m: 'l', k: 'l', z: 'o' }, p: {} },
      minority: (w) => w === 'n' ? 'Kabir leaned towards Sapa for the hills. Saved as a day-trip idea from Hanoi.' : 'Arjun preferred more city time. Day 1 stays in Hanoi.',
      nights: 4
    }
  };

  const ico = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 6-6 6 6 6"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 20.5 21 12 3 3.5l2.5 7.5L14 12l-8.5 1z"/></svg>'
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const av = (id, cls = '') => `<span class="av ${cls}" style="background:${PEOPLE[id].bg};color:${PEOPLE[id].c}" title="${PEOPLE[id].name}">${PEOPLE[id].name[0]}</span>`;
  const rupee = (n) => '₹' + Math.round(n / 1000) + 'k';

  function TripRoom(root, opts = {}) {
    const auto = !!opts.auto;
    let S, timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const clear = () => { timers.forEach(clearTimeout); timers = []; };

    function fresh(scKey) {
      const sc = SC[scKey];
      return {
        key: scKey, sc, step: 0, view: 'chat', shown: 0, typing: false, aiShown: false, dismissed: false,
        chat: [], draft: '', editing: null, edits: {},
        you: { in: null, cant: new Set(), budget: 60000, priv: true, vibe: {} },
        submitted: false, arrived: 0, yourVotes: {}, votesIn: false,
        confirmed: {}, done: false, planDot: false, inRoom: false
      };
    }

    function reset(scKey) {
      clear();
      S = fresh(scKey || (S && S.key) || opts.scenario || 'scratch');
      report();
      render();
      if (auto) later(enterRoom, 1600);
    }

    // 0 = groups home; internal steps 0..6 map to 1..7
    function report() { if (opts.onStep) opts.onStep(S.inRoom ? S.step + 1 : 0); }
    function enterRoom() {
      if (S.inRoom) return;
      S.inRoom = true; report(); render(true);
      playSeed(auto ? 380 : 520);
    }

    function playSeed(gap) {
      const n = S.sc.seed.length;
      const tick = () => {
        if (S.shown >= n) {
          S.typing = true; render();
          later(() => { S.typing = false; S.aiShown = true; setStep(1); if (auto) later(autoNext, 2600); }, auto ? 700 : 1100);
          return;
        }
        S.typing = true; render();
        later(() => { S.typing = false; S.shown++; render(); later(tick, gap * 0.4); }, gap);
      };
      later(tick, auto ? 300 : 500);
    }

    function setStep(n) {
      S.step = n;
      report();
      render(true);
    }

    function sys(html) { S.chat.push({ sys: html }); if (S.view !== 'chat') S.chatDot = true; }

    /* ---------- derived ---------- */
    function prefCounts() {
      const c = { beach: 0, hills: 0, city: 0, food: 0, must: {} };
      const add = (v) => Object.entries(v).forEach(([k, lvl]) => { if (lvl) { c[k]++; if (lvl === 'must') c.must[k] = (c.must[k] || 0) + 1; } });
      Object.values(S.sc.othersVibe).forEach(add);
      add(S.you.vibe);
      return c;
    }
    function windowWeeks() {
      const blocked = new Set();
      Object.values(S.sc.othersCant).forEach((arr) => arr.forEach((w) => blocked.add(w)));
      S.you.cant.forEach((w) => blocked.add(w));
      return WEEKS.map((_, i) => !blocked.has(i));
    }
    function yourFit(o) {
      if (S.you.in === 'cant') return 'a';
      if (S.you.cant.has(o.week) || S.you.budget < o.price) return 'r';
      const musts = Object.entries(S.you.vibe).filter(([, l]) => l === 'must').map(([k]) => k);
      if (musts.some((m) => !o.vibes.includes(m))) return 'a';
      return 'g';
    }
    function optFits(o) { return Object.assign({ r: yourFit(o) }, o.fits); }
    function viable(o) { return !Object.values(optFits(o)).includes('r'); }
    function allVotes(o) { return Object.assign({}, S.sc.votes[o.id] || {}, { r: S.yourVotes[o.id] }); }
    function winner() {
      let best = null, bestScore = -1;
      S.sc.options.filter(viable).forEach((o) => {
        const v = Object.values(allVotes(o));
        if (v.includes('c')) return;
        const score = v.filter((x) => x === 'l').length * 2 + v.filter((x) => x === 'o').length;
        if (score > bestScore) { best = o; bestScore = score; }
      });
      return best;
    }

    /* ---------- render ---------- */
    function render(stepChange) {
      const body = root.querySelector('.body');
      const keep = body && !stepChange ? body.scrollTop : 0;
      const wasChat = S.view === 'chat';
      root.innerHTML = frame();
      if (!stepChange) root.querySelectorAll('.anim').forEach((e) => e.classList.remove('anim'));
      const nb = root.querySelector('.body');
      if (nb) nb.scrollTop = wasChat ? nb.scrollHeight : keep;
      const inp = root.querySelector('.comp input');
      if (inp && S.focusComp) { inp.focus(); S.focusComp = false; }
      const ed = root.querySelector('[data-editinput]');
      if (ed) ed.focus();
    }

    function homeFrame() {
      const sc = S.sc;
      const other = sc === SC.scratch ? SC.known : SC.scratch;
      const row = (name, sub, right, cls, act) => `<div class="gr ${cls}" ${act ? 'data-a="room" role="button" tabindex="0"' : ''}><span class="ga">${name[0]}</span><div class="gt"><b>${esc(name)}</b><span>${sub}</span></div>${right}</div>`;
      return `${statusBar()}
      <div class="body" style="top:44px">
        <div class="hrow2"><h3 class="ph" style="font-size:30px">Groups</h3><span class="rb" aria-hidden="true">+</span></div>
        <div class="gsearch">Search groups</div>
        ${row(sc.group, `<em class="spot"><span class="orb" style="width:12px;height:12px"></span>Trip idea spotted</em> · 6 new`, '<span class="gn2">9:41</span>', 'hot', true)}
        ${row('Goa 2025', 'Trip done · 6 members', '<span class="sp y">Done</span>', '', false)}
        ${row(other.group, 'Arjun: lol same', '<span class="gn2">Mon</span>', '', false)}
        ${row('Flatmates', 'Rent is due Friday', '<span class="gn2">Sun</span>', '', false)}
        <span class="note" style="margin-top:8px">Mock groups. Tap the first one.</span>
      </div>
      <div class="foot"><button class="bt ghost" data-a="newgroup">+ New trip group</button></div>`;
    }
    function statusBar() {
      return `<div class="sb"><span>9:41</span><span class="ic"><svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13" y="0" width="3" height="11" rx="1"/></svg><span class="bat"></span></span></div>`;
    }

    function frame() {
      if (!S.inRoom) return homeFrame();
      const sc = S.sc;
      return `
      <div class="sb"><span>9:41</span><span class="ic"><svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13" y="0" width="3" height="11" rx="1"/></svg><span class="bat"></span></span></div>
      <div class="hd">
        <div class="r1"><span class="rb" data-a="home" role="button" tabindex="0" aria-label="Back to groups">${ico.back}</span>
          <div class="gn"><b>${esc(sc.group)}</b><span>Riya, Arjun, Maya, Kabir, Zoya</span></div>
          <span class="avs">${['r', 'a', 'm', 'k', 'z'].map((i) => av(i)).join('')}</span></div>
        <div class="tabs" role="tablist">
          <button class="${S.view === 'chat' ? 'on' : ''}" data-a="view" data-v="chat" role="tab" aria-selected="${S.view === 'chat'}">Chat${S.chatDot && S.view !== 'chat' ? '<i class="dotn"></i>' : ''}</button>
          <button class="${S.view === 'plan' ? 'on' : ''}" data-a="view" data-v="plan" role="tab" aria-selected="${S.view === 'plan'}">Trip plan${S.planDot && S.view !== 'plan' ? '<i class="dotn"></i>' : ''}</button>
        </div>
      </div>
      <div class="body">${S.view === 'chat' ? chatView() : planView()}</div>
      <div class="foot">${S.view === 'chat' ? chatFoot() : planFoot()}</div>`;
    }

    /* chat */
    function chatView() {
      const sc = S.sc;
      const items = sc.seed.slice(0, S.shown).map(([w, t]) => msg(w, t));
      if (S.shown >= sc.seed.length && S.aiShown) items.push(aiCard());
      S.chat.forEach((c) => items.push(c.sys ? `<div class="sys">${c.sys}</div>` : c.ai ? c.ai : msg('r', c.t)));
      // animate only what arrived since the last chat render
      const prev = S.seenChat || 0;
      S.seenChat = items.length;
      let h = items.map((it, i) => i >= prev ? it.replace(/^<div class="/, '<div class="new ') : it).join('');
      if (S.typing) h += '<div class="typing" aria-label="typing"><i></i><i></i><i></i></div>';
      return h;
    }
    function msg(w, t) {
      const me = w === 'r';
      return `<div class="m ${me ? 'me' : ''}">${me ? '' : `<span class="w" style="color:${PEOPLE[w].c}">${PEOPLE[w].name}</span>`}<span class="t">${esc(t)}</span></div>`;
    }
    function aiCard() {
      const sc = S.sc;
      if (S.step >= 2) {
        return `<div class="ai"><div class="aih"><span class="orb"></span>TRIP ASSISTANT</div><p>Trip plan started. Everyone got a 4-question check-in.</p><div class="row2"><button class="bt ghost" data-a="view" data-v="plan" style="padding:9px">Open trip plan</button></div></div>`;
      }
      if (S.dismissed) {
        return `<div class="sys">Okay, I'll stay quiet. <b>Start a plan</b> whenever you're ready.</div><div class="row2" style="justify-content:center"><button class="bt ghost" data-a="start" style="flex:none;padding:9px 16px">Start a trip plan</button></div>`;
      }
      const lines = sc.detect.map(([k, v, tag], i) => {
        const id = 'd' + i;
        const val = S.edits[id] ?? v;
        if (S.editing === id) return `<div><span>${k}</span><input data-editinput="${id}" value="${esc(val)}" aria-label="Edit ${k}" style="flex:1;font:inherit;font-size:13px;border:0;border-bottom:1.5px dotted #C9CBD2;background:transparent;min-width:0"><button class="tl" data-a="save" data-v="${id}">Save</button></div>`;
        return `<div data-a="edit" data-v="${id}" role="button" tabindex="0" style="cursor:pointer"><span>${k}</span><b>${esc(val)}</b>${tag ? `<em>${tag}</em>` : ''}${S.edits[id] ? '<em style="background:#E9F6F0;color:#178556">edited</em>' : ''}</div>`;
      }).join('');
      return `<div class="ai"><div class="aih"><span class="orb"></span>TRIP ASSISTANT · DRAFT</div>
        <h4>${sc.detectTitle}</h4><div class="det">${lines}</div><p>${sc.detectSub}</p>
        <div class="row2"><button class="bt" data-a="start">Start a trip plan</button><button class="tl" data-a="dismiss">Not now</button></div></div>`;
    }
    function chatFoot() {
      return `<div class="comp"><input type="text" placeholder="Message" value="${esc(S.draft)}" aria-label="Message the group" data-in="draft"><button class="send" data-a="send" aria-label="Send">${ico.send}</button></div>`;
    }

    /* plan */
    function planView() {
      if (S.step < 2) return `<div class="box anim" style="margin-top:20px;text-align:center;align-items:center;padding:28px 18px"><span class="orb" style="width:36px;height:36px"></span><b style="font-size:16px">No trip plan yet</b><span class="sub">When the chat sounds like a trip, the assistant offers to start one. Nothing is created without you.</span></div>`;
      if (S.step === 2) return checkin();
      if (S.step === 3) return conflictsView();
      if (S.step === 4) return optionsView();
      if (S.step === 5) return voteView();
      return confirmView();
    }

    function tracker() {
      const order = OTHERS;
      const done = (id) => id === 'r' ? S.submitted : order.indexOf(id) < S.arrived;
      const n = ['r', ...order].filter(done).length;
      return `<div class="trk">${['r', ...order].map((i) => av(i, done(i) ? 'ok' : 'wait')).join('')}<span style="margin-left:6px">${n} of 5 checked in</span></div>`;
    }

    function checkin() {
      const y = S.you;
      if (S.submitted) {
        return `<span class="lb">Step 1 of 4 · Check-in</span><h3 class="ph">Waiting for the group</h3>
        <div class="box">${tracker()}<span class="sub">Answers stay separate until everyone is in, so nobody anchors on the first reply.</span></div>
        <div class="box"><span class="lb">Your answers</span><span class="sub">${y.in === 'in' ? "I'm in" : y.in === 'maybe' ? 'Maybe' : "Can't make it"} · can't do: ${y.cant.size ? [...y.cant].map((w) => WEEKS[w]).join(', ') : 'none'} · up to ${rupee(y.budget)}${y.priv ? ' (private)' : ''}</span></div>`;
      }
      const vibeBtn = (k) => { const l = y.vibe[k]; return `<button class="${l || ''}" data-a="vibe" data-v="${k}">${VIBES[k]}${l ? `<small>${l === 'must' ? 'MUST' : 'NICE'}</small>` : ''}</button>`; };
      return `<span class="lb">Step 1 of 4 · Check-in</span><h3 class="ph">4 quick questions</h3>
      <span class="sub">The assistant pre-read the chat. These answers make it official.</span>
      <div>
        <div class="q"><span class="qt">Are you in?</span><div class="ch">${[['in', "I'm in"], ['maybe', 'Maybe'], ['cant', "Can't make it"]].map(([v, l]) => `<button class="${y.in === v ? 'on' : ''}" data-a="in" data-v="${v}">${l}</button>`).join('')}</div></div>
        <div class="q"><span class="qt">Dates you can't do <span class="qs">· hard constraint</span></span><div class="ch">${WEEKS.map((w, i) => `<button class="${y.cant.has(i) ? 'cant' : ''}" data-a="cant" data-v="${i}">${w}</button>`).join('')}</div></div>
        <div class="q"><span class="qt">Max budget per person <span class="qs">· flights + stay</span></span>
          <div class="bud"><b data-bud>${rupee(y.budget)}</b><span class="qs">₹30k – ₹90k</span></div>
          <input type="range" min="30000" max="90000" step="5000" value="${y.budget}" data-in="budget" aria-label="Max budget">
          <label class="chk"><input type="checkbox" data-a="priv" ${y.priv ? 'checked' : ''}>Keep my exact number private. The group only sees it as a cap.</label></div>
        <div class="q"><span class="qt">Trip vibe <span class="qs">· tap once for nice-to-have, twice for must-have</span></span><div class="ch">${Object.keys(VIBES).map(vibeBtn).join('')}</div></div>
      </div>`;
    }

    function conflictsView() {
      const win = windowWeeks();
      const ok = win.filter(Boolean).length;
      const c = prefCounts();
      const hard = S.sc.hard.map((h) => {
        const val = S.edits[h.id] ?? h.text;
        if (S.editing === h.id) return `<div class="cs"><span class="ic2">!</span><div class="tx"><input data-editinput="${h.id}" value="${esc(val)}" aria-label="Edit constraint"><span>${h.src}</span></div><button class="ed" data-a="save" data-v="${h.id}">Save</button></div>`;
        return `<div class="cs"><span class="ic2">!</span><div class="tx"><b>${esc(val)}</b><span>${h.src}${S.edits[h.id] ? ' · edited by you' : ' · AI drafted, check it'}</span></div><button class="ed" data-a="edit" data-v="${h.id}">Edit</button></div>`;
      }).join('');
      const you = [...S.you.cant].map((w) => `<div class="cs"><span class="ic2">!</span><div class="tx"><b>Riya · not ${WEEKS[w]}</b><span>Your check-in</span></div></div>`).join('');
      const total = 5;
      const bar = (k) => { const must = c.must[k] || 0, nice = c[k] - must; return `<div class="pref"><span>${VIBES[k]}</span><span class="t"><i style="width:${must / total * 100}%;background:#0B0B0C"></i><i style="width:${nice / total * 100}%;background:#9097FF"></i></span><b>${c[k]}</b></div>`; };
      return `<span class="lb">Step 2 of 4 · What we know</span><h3 class="ph">Constraints first, then preferences</h3>
      <span class="lb" style="margin-top:6px">Can't-dos · hard</span>${hard}${you}
      <div class="win ${ok ? 'ok' : 'bad'}"><b>${ok ? `${WEEKS[win.indexOf(true)]} works for everyone` : 'No week works for everyone'}</b>
        <div class="wk">${WEEKS.map((w, i) => `<span class="${win[i] ? 'y' : ''}">${w}</span>`).join('')}</div>
        ${ok ? '' : '<span class="sub">Someone has to relax a date. The assistant can ask, privately.</span>'}</div>
      <span class="lb" style="margin-top:6px">Preferences · flexible</span>
      <div class="box">${['beach', 'hills', 'city', 'food'].map(bar).join('')}<div class="key"><span><i style="background:#0B0B0C"></i>must-have</span><span><i style="background:#9097FF"></i>nice-to-have</span></div></div>
      <span class="lb" style="margin-top:6px">Trade-offs to discuss</span>
      ${S.sc.conflicts(c).map((x) => `<div class="cf"><span class="ct">${x.t}<i>${x.tag}</i></span><p>${x.p}</p></div>`).join('')}`;
    }

    function optCard(o, i) {
      const f = optFits(o), bad = !viable(o);
      const img = o.img ? `<img src="${o.img}" alt="">` : '<div style="width:74px;height:100px;border-radius:14px;flex:none;background:linear-gradient(160deg,#7FC6D8,#2E8FA8 60%,#F2D9A8)"></div>';
      return `<div class="opt ${bad ? 'bad' : ''} anim" style="animation-delay:${i * 90}ms">${img}<div class="oi">
        <span class="on2">${o.name}</span><span class="om">${WEEKS[o.week]} · ~${rupee(o.price)} pp (mock)</span>
        ${bad ? `<span class="bx">${o.breaks || 'Breaks your constraint'}</span>` : ''}
        <span class="ow">${o.why} <span style="color:#7A7D86">${o.trade}</span></span>
        <span class="fits">${['r', ...OTHERS].map((p) => av(p, f[p])).join('')}</span></div></div>`;
    }
    function optionsView() {
      return `<span class="lb">Step 3 of 4 · Options</span><h3 class="ph">${S.sc.options.filter(viable).length} options fit everyone's can't-dos</h3>
      <span class="sub">Ranked by fit, not by votes. Options that break a constraint stay visible, so the trade-off is clear.</span>
      <div class="key"><span><i style="background:#22A06B"></i>fits</span><span><i style="background:#E8833A"></i>misses a preference</span><span><i style="background:#E5484D"></i>breaks a can't-do</span></div>
      ${S.sc.options.map(optCard).join('')}`;
    }

    function voteView() {
      const vs = S.sc.options.filter(viable);
      if (!vs.length) return `<h3 class="ph">Nothing fits everyone yet</h3><span class="sub">Go back and relax a can't-do, or ask the group to.</span>`;
      const tally = (o) => {
        const v = allVotes(o);
        const grp = (t) => ['r', ...OTHERS].filter((p) => v[p] === t).map((p) => av(p)).join('');
        return `<div class="tally"><span>Love ${grp('l') || '–'}</span><span>Can live with ${grp('o') || '–'}</span><span>Can't ${grp('c') || '–'}</span></div>`;
      };
      const card = (o) => {
        const y = S.yourVotes[o.id];
        const img = o.img ? `<img src="${o.img}" alt="">` : '';
        return `<div class="vt">${`<div class="vh">${img}<div style="display:flex;flex-direction:column"><b>${o.name}</b><span class="om" style="font-size:11.5px;color:#7A7D86">${WEEKS[o.week]} · ~${rupee(o.price)}</span></div></div>`}
          ${S.votesIn ? tally(o) : `<div class="vbt">${[['l', 'Love it'], ['o', 'Can live with it'], ['c', "Can't do it"]].map(([k, l]) => `<button class="${y === k ? 'on ' + k : ''}" data-a="vote" data-v="${o.id}:${k}">${l}</button>`).join('')}</div>`}</div>`;
      };
      let res = '';
      if (S.votesIn) {
        const w = winner();
        res = w ? `<div class="win2 anim"><span class="lb">Most support, no one blocked</span><b>${w.name}</b><span class="sub">The assistant counted. The group decides: anyone can still object at confirmation.</span></div><div class="minor anim">${S.sc.minority(w.id)}</div>`
          : `<div class="win2" style="background:#FDECEC"><b>Every option has a "can't"</b><span class="sub">No winner by default. Talk it through in chat, or go back a step.</span></div>`;
      }
      return `<span class="lb">Step 4 of 4 · Decide together</span><h3 class="ph">${S.votesIn ? 'Here is where the group landed' : 'How do you feel about each?'}</h3>
      <span class="sub">Not a majority vote. "Can't do it" is a veto, so nobody gets dragged along.</span>${vs.map(card).join('')}${res}`;
    }

    function confirmView() {
      const w = winner() || S.sc.options.find(viable) || S.sc.options[0];
      const all = ['r', ...OTHERS].every((p) => S.confirmed[p]);
      const n = ['r', ...OTHERS].filter((p) => S.confirmed[p]).length;
      const mem = ['r', ...OTHERS].map((p) => `<div>${av(p)}<b>${PEOPLE[p].name}${p === 'r' ? ' (you)' : ''}</b><span class="sp ${S.confirmed[p] ? 'y' : 'w'}">${S.confirmed[p] ? 'Confirmed' : 'Pending'}</span></div>`).join('');
      return `${all ? '<div class="goin prism anim" style="margin:6px 0 2px">We\'re going.</div>' : '<span class="lb">Proposed plan</span>'}
      <div class="plan ${all ? 'done' : 'tent'} anim">${all ? '<div class="glob"></div>' : ''}
        <span class="st2">${all ? 'Confirmed by 5 of 5' : `Tentative · ${n} of 5 confirmed`}</span>
        <span class="pt">${w.name}</span>
        <div class="pk"><div><span>Dates</span><b>${WEEKS[w.week]}</b></div><div><span>Budget</span><b>~${rupee(w.price)} pp</b></div><div><span>Travellers</span><b>5</b></div><div><span>Nights</span><b>${S.sc.nights}</b></div></div></div>
      ${all ? `<span class="lb" style="margin-top:6px">Trip workspace</span>
      <div class="ws">
        <div><i class="ok">✓</i><b>Destination</b><span>${w.name.split(' ·')[0]}</span></div>
        <div><i class="ok">✓</i><b>Dates</b><span>${WEEKS[w.week]}</span></div>
        <div><i class="ok">✓</i><b>Budget cap</b><span>~${rupee(w.price)} pp</span></div>
        <div><i>·</i><b>Stays</b><span>Next decision · vote opens</span></div>
        <div><i>·</i><b>Activities</b><span>3 ideas saved from chat</span></div>
      </div>
      <div class="minor">${S.sc.minority(w.id)}</div>
      <div class="box mem">${mem}</div>` : `<span class="sub">Nothing is booked or final until every traveller confirms.</span>
      <div class="box mem">${mem}</div>`}`;
    }

    function planFoot() {
      if (S.step < 2) return `<span class="hint">Go back to the chat to start a plan</span>`;
      if (S.step === 2) {
        if (!S.submitted) return `<button class="bt" data-a="submit" ${S.you.in ? '' : 'disabled'}>Share with the group</button>`;
        return S.arrived >= 4 ? `<button class="bt" data-a="next">See what we found</button>` : `<span class="hint">Waiting for ${4 - S.arrived} more…</span>`;
      }
      if (S.step === 3) return `<button class="bt" data-a="next">See options that work</button>`;
      if (S.step === 4) return `<button class="bt" data-a="next" ${S.sc.options.some(viable) ? '' : 'disabled'}>Put to a decision</button>`;
      if (S.step === 5) {
        const vs = S.sc.options.filter(viable);
        if (!S.votesIn) return `<button class="bt" data-a="castvote" ${vs.every((o) => S.yourVotes[o.id]) ? '' : 'disabled'}>Submit my answer</button>`;
        return winner() ? `<button class="bt" data-a="propose">Propose this plan</button>` : `<button class="bt ghost" data-a="back">Back to options</button>`;
      }
      const all = ['r', ...OTHERS].every((p) => S.confirmed[p]);
      if (!S.confirmed.r) return `<button class="bt indigo" data-a="confirm">I'm in. Confirm</button>`;
      if (!all) return `<span class="hint">Waiting for the group to confirm…</span>`;
      return `<button class="bt" data-a="restart">Start over</button>`;
    }

    /* ---------- actions ---------- */
    function act(a, v, el) {
      const y = S.you;
      switch (a) {
        case 'room': enterRoom(); break;
        case 'newgroup': enterRoom(); break;
        case 'home': clear(); S = fresh(S.key); report(); render(true); break;
        case 'view': S.view = v; if (v === 'plan') S.planDot = false; else S.chatDot = false; render(true); break;
        case 'send': sendMsg(); break;
        case 'edit': S.editing = v; render(); break;
        case 'save': { const inp = root.querySelector(`[data-editinput="${v}"]`); if (inp && inp.value.trim()) S.edits[v] = inp.value.trim(); S.editing = null; render(); break; }
        case 'dismiss': S.dismissed = true; render(); break;
        case 'start':
          S.dismissed = false; sys('<b>Riya</b> started a trip plan · 5 invited');
          S.view = 'plan'; setStep(2); break;
        case 'in': y.in = v; render(); break;
        case 'cant': { const i = +v; y.cant.has(i) ? y.cant.delete(i) : y.cant.add(i); render(); break; }
        case 'priv': y.priv = !y.priv; render(); break;
        case 'vibe': { const cur = y.vibe[v]; y.vibe[v] = !cur ? 'nice' : cur === 'nice' ? 'must' : undefined; if (!y.vibe[v]) delete y.vibe[v]; render(); break; }
        case 'submit': S.submitted = true; render(); arrive(); break;
        case 'next':
          if (S.step === 2) S.chat.push({ ai: '<div class="ai"><div class="aih"><span class="orb"></span>TRIP ASSISTANT</div><p>Everyone checked in. I found <b>1 date window</b> and <b>2 trade-offs</b>. Details are in the trip plan.</p></div>' });
          setStep(S.step + 1); break;
        case 'back': S.votesIn = false; S.yourVotes = {}; setStep(4); break;
        case 'vote': { const [id, k] = v.split(':'); S.yourVotes[id] = k; render(); break; }
        case 'castvote': S.votesIn = true; render(); break;
        case 'propose': { const w = winner(); sys(`<b>Riya</b> proposed ${w.name} · ${WEEKS[w.week]}`); setStep(6); break; }
        case 'confirm': S.confirmed.r = true; render(); confirmOthers(); break;
        case 'restart': reset(); break;
      }
    }
    function sendMsg() {
      const t = S.draft.trim();
      if (!t) return;
      S.chat.push({ t }); S.draft = ''; S.focusComp = true; render();
    }
    function arrive() {
      const step = () => { if (S.arrived >= 4) return; S.arrived++; render(); if (S.arrived < 4) later(step, auto ? 260 : 650); else sys('<b>5 of 5</b> checked in'); };
      later(step, auto ? 200 : 600);
    }
    function confirmOthers() {
      const order = ['a', 'm', 'k', 'z'];
      order.forEach((p, i) => later(() => {
        S.confirmed[p] = true;
        if (order.every((q) => S.confirmed[q]) && S.confirmed.r) { S.done = true; sys('<b>Trip confirmed</b> by all 5 · pinned'); S.planDot = false; }
        render();
      }, (auto ? 300 : 700) * (i + 1) + (p === 'z' ? (auto ? 300 : 900) : 0)));
    }

    /* ---------- autoplay ---------- */
    function autoNext() {
      const y = S.you;
      const go = (fn, ms) => later(() => { fn(); }, ms);
      if (S.step === 1) {
        go(() => { act('start'); y.in = 'in'; y.vibe = { beach: 'nice' }; render(); go(() => { act('submit'); go(() => autoNext(), 2200); }, 1300); }, 300);
      } else if (S.step === 2) { act('next'); go(autoNext, 3200); }
      else if (S.step === 3) { act('next'); go(autoNext, 3000); }
      else if (S.step === 4) {
        act('next');
        go(() => { S.sc.options.filter(viable).forEach((o, i) => { S.yourVotes[o.id] = i === 0 ? 'l' : 'o'; }); render(); go(() => { act('castvote'); go(autoNext, 2600); }, 1000); }, 900);
      } else if (S.step === 5) { act('propose'); go(() => { act('confirm'); go(() => reset(), 4200); }, 1200); }
    }

    /* ---------- events ---------- */
    if (!auto) {
      root.addEventListener('click', (e) => {
        const el = e.target.closest('[data-a]');
        if (!el || el.disabled) return;
        if (el.type === 'checkbox') return;
        act(el.dataset.a, el.dataset.v, el);
      });
      root.addEventListener('change', (e) => { if (e.target.matches('[data-a="priv"]')) act('priv'); });
      root.addEventListener('input', (e) => {
        const k = e.target.dataset.in;
        if (k === 'draft') S.draft = e.target.value;
        if (k === 'budget') { S.you.budget = +e.target.value; const b = root.querySelector('[data-bud]'); if (b) b.textContent = rupee(S.you.budget); }
      });
      root.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        if (e.target.dataset.in === 'draft') { e.preventDefault(); sendMsg(); }
        else if (e.target.dataset.editinput) { e.preventDefault(); act('save', e.target.dataset.editinput); }
        else if (e.target.matches('[data-a="edit"]')) { e.preventDefault(); act('edit', e.target.dataset.v); }
        else if (e.target.matches('[data-a="room"],[data-a="home"]')) { e.preventDefault(); act(e.target.dataset.a); }
      });
    }

    root.classList.add('tr');
    if (auto) root.classList.add('auto');
    reset(opts.scenario || 'scratch');

    return {
      reset: (k) => reset(k),
      stop: clear,
      get step() { return S.step; }
    };
  }

  window.TripRoom = TripRoom;
  window.TripRoom.STEPS = STEP_NAMES;
})();

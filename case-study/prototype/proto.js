/* Trip AI prototype.
   createApp(screenEl, {mode}) builds the phone UI. Every control is real and clickable.
   The video driver plays a script by moving a tap pointer and dispatching the same clicks and
   pointer events a person would, so video and interactive mode share one implementation. */
(function () {
  const STOP = Symbol('stop');
  const SPEED = 1.12; // >1 slows every scripted wait; reading holds live in SCRIPT
  const $ = (r, s) => r.querySelector(s);
  const $$ = (r, s) => [...r.querySelectorAll(s)];
  const IMG = 'img/';

  /* ---------- icons ---------- */
  const sv = (d, c = 'i') => `<svg class="${c}" viewBox="0 0 24 24">${d}</svg>`;
  const I = {
    back: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    kebab: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>',
    cam: sv('<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7H8l1.5-2h5L16 7h2.5A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.2"/>'),
    mic: sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>'),
    smile: sv('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><circle cx="9" cy="10" r=".6" fill="currentColor"/><circle cx="15" cy="10" r=".6" fill="currentColor"/>'),
    plus: sv('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'),
    plus0: sv('<path d="M12 5v14M5 12h14"/>'),
    up: sv('<path d="M12 19V5M6 11l6-6 6 6"/>'),
    arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chev: sv('<path d="M9 6l6 6-6 6"/>'),
    chevL: sv('<path d="M15 6l-6 6 6 6"/>'),
    check: sv('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    cal: sv('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>', 'i gi'),
    ppl: sv('<circle cx="8" cy="7.5" r="2.6"/><circle cx="16" cy="7.5" r="2.6"/><path d="M3.5 15c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5M11.5 15c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5"/><circle cx="8" cy="16" r="2.2"/><circle cx="16" cy="16" r="2.2"/><path d="M4.5 22c.5-1.6 1.9-2.6 3.5-2.6s3 1 3.5 2.6M12.5 22c.5-1.6 1.9-2.6 3.5-2.6s3 1 3.5 2.6"/>', 'i gi'),
    pin: sv('<path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/><path d="M5 19.5c-1.5.5-2.5 1-2.5 1.6C2.5 22.2 6.8 23 12 23s9.5-.8 9.5-1.9c0-.6-1-1.1-2.5-1.6" opacity=".7"/>', 'i gi'),
    cash: sv('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>', 'i gi'),
    calI: sv('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    grip: '<svg class="gp" viewBox="0 0 16 16" fill="currentColor"><circle cx="5" cy="3" r="1.4"/><circle cx="11" cy="3" r="1.4"/><circle cx="5" cy="8" r="1.4"/><circle cx="11" cy="8" r="1.4"/><circle cx="5" cy="13" r="1.4"/><circle cx="11" cy="13" r="1.4"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path fill="url(#sgrad)" d="M10 2.5l1.9 5.3 5.3 1.9-5.3 1.9L10 16.9l-1.9-5.3-5.3-1.9 5.3-1.9z"/><path fill="url(#sgrad)" d="M18.2 13.2l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/></svg>',
    plane: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#111" stroke-width="2" stroke-linejoin="round"><path d="M21.5 2.5L2.5 10l7.5 3.5 3.5 7.5z"/><path d="M10 13.5l5-5"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    ticks: '<svg viewBox="0 0 16 10"><path d="M1 5.5l2.6 2.6L9.5 1.5M6.2 8.1l.9.9 6.4-7.5"/></svg>',
    restart: sv('<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/>')
  };
  const okc = (k) => `<i class="okc" data-ok="${k}">${sv('<path d="M5 12.5l4.5 4.5L19 7"/>')}</i>`;

  /* ---------- data ---------- */
  const ROWS = [
    ['goa', 'Goa Trip', 'Akshay: Are we on guys?', '10:00 PM', 5],
    ['wb', 'Weekend Bike Trip', 'Sumit: Please ask ai to plan the trip it...', '07:05 PM'],
    ['dec', 'December Holidays', 'Mansi: Abhi toh time hai, let’s see.', '05:15 PM'],
    ['ny', 'New Year 2027', 'Nishtha: I’m fine won’t be able to join...', '02:35 PM'],
    ['jay', 'Jay Birthday Trip', 'Karan: Yaar, I don’t think we are aligning...', '01:11 PM'],
    ['makar', 'Makar Sankranti Ganga Trip', 'Manav: Can’t miss kumbh this time.', '10:00 AM']
  ];
  const MSGS = [
    ['me', ['Should we plan something for this summer? Goa?'], '9:00 AM · You'],
    ['priya', ['Goa sounds fun and in summers awesome. I’m on...'], '9:01 AM · Priya'],
    ['akshay', ['But this time I want to go to temples instead...'], '9:01 AM · Akshay'],
    ['aman', ['Not sure, I think beach in summer is a good idea overall..so i’m on!', 'temples? I am ok with anything.'], '9:02 AM · Aman'],
    ['akshay', ['Goa is good, but this time I want to go to temples instead...'], '9:03 AM · Akshay']
  ];
  const ASK = 'Should we vote? I’m asking AI...';
  const DEST = {
    gok: { name: 'Gokarna Beach', short: 'Gokarna Beach, Goa', img: 'b-gokarna.jpg', desc: 'Om beach near Mallikarjuna temple. Historic Shiva temple surrounded by greenery.' },
    agd: { name: 'Agonda Beach', short: 'Agonda Beach, Goa', img: 'b-third.jpg', desc: 'Quiet Canacona beach, a short ride to Shri Mallikarjun temple. Calm water and beach huts.' },
    aar: { name: 'Aarambol Beach', short: 'Aarambol Beach, Goa', img: 'b-aarambol.jpg', desc: 'Shri Ajoba Temple, Ashwem is near to Aarambol beach. Enjoy waters, sea food and games in beach.' }
  };
  const VOTES = [['15 Apr - 25 Apr', 5], ['15 Apr - 27 Apr', 0], ['15 Apr - 24 Apr', 0]];
  const CHECKS = ['Read the chat.', '2 agreeing, 1 has a different preference', 'Destination, Dates, Budget and plan itinerary', 'Consolidating the plan...'];

  const msgHTML = (who, bubbles, meta, cls = '') => {
    const av = who === 'ai' ? '<span class="orb av"></span>' : `<img class="av" src="${IMG}a-${who}.png" alt="">`;
    return `<div class="msg ${who === 'me' ? 'me' : ''} ${who === 'ai' ? 'ai' : ''} ${cls}">${av}<div class="bs">${bubbles.map((b) => `<div class="bb">${b}</div>`).join('')}${meta ? `<div class="mt">${I.ticks}${meta}</div>` : ''}</div></div>`;
  };

  function calHTML() {
    const wd = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => `<span class="wd">${d}</span>`).join('');
    let cells = '<span></span>'.repeat(3); // 1 Apr 2026 is a Wednesday
    for (let d = 1; d <= 30; d++) cells += `<span class="d ${d === 1 ? 'today' : ''}" data-d="${d}"><i>${d}</i></span>`;
    return `<div class="cal"><div class="mh">April 2026 ${I.chev.replace('class="i"', 'class="i" style="width:12px;height:12px;margin-left:-6px"')}<span>${I.chevL}${I.chev}</span></div><div class="gd">${wd}${cells}</div></div>`;
  }

  const TEMPLATE = () => `
  <div class="sb"><span>9:41</span><span class="r">
    <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".7"/><rect x="5" y="5.5" width="3" height="6.5" rx=".7"/><rect x="10" y="3" width="3" height="9" rx=".7"/><rect x="15" y="0" width="3" height="12" rx=".7"/></svg>
    <svg viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4c-1.8 0-3.4.7-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zM8 9.4l2.1-2.2a3.1 3.1 0 0 0-4.2 0z"/></svg>
    <svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.3" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="8" rx="2"/><path d="M25 4v4c.8-.3 1.4-1.1 1.4-2S25.8 4.3 25 4z" opacity=".5"/></svg>
  </span></div>

  <section class="view home" data-v="home">
    <div class="hero"><img src="${IMG}hero.jpg" alt=""></div>
    <div class="topchips chips"><button class="chip tap">All Chats</button><button class="chip on tap">Group Chats</button><button class="chip tap">Direct Chats <span class="bd">5</span></button></div>
    <div class="hsheet">
      <div class="lbl"><span class="g">All your plans are here</span></div>
      <div class="list scroll">${ROWS.map(([k, n, p, t, c], i) => `<div class="row tap" data-g="${k}" style="animation-delay:${0.1 + i * 0.06}s">${k === 'wb' ? '<span class="wb">WB</span>' : `<img src="${IMG}g-${k}.png" alt="">`}<div class="tx"><b>${n}</b><span>${p}</span></div><span class="tm ${c ? 'n' : ''}">${t}</span>${c ? `<span class="cnt">${c}</span>` : ''}</div>`).join('')}</div>
    </div>
    <div class="fadeb"></div>
    <button class="newg tap">${I.plus0}New Group</button>
    <nav class="tabbar">${I.plane}<span class="hm">${I.home}Home</span><img src="${IMG}a-me.png" alt=""></nav>
  </section>

  <section class="view chat off-r gone" data-v="chat">
    <header class="hdr"><button class="bk tap" data-a="home">${I.back}</button><span class="ga"><img src="${IMG}g-goa.png" alt=""></span><div class="nm"><b>Goa Trip</b><span>You, Akshay, Aman, Sneha, Sakshi, Priya</span></div><span class="kb">${I.kebab}</span></header>
    <div class="msgs scroll"><span class="dpill">Today · 21/11/2026</span>${msgHTML(...MSGS[0])}</div>
    <button class="fab tap">${I.spark}Ask Trip AI</button>
    <div class="comp"><span class="cam">${I.cam}</span><div class="in tap">Message....</div><span class="ic">${I.mic}${I.smile}${I.plus}</span><button class="send tap" aria-label="Send">${I.up}</button></div>
    <div class="veil"></div>
    <div class="sheet">
      <div class="hd2"></div><div class="orb"></div>
      <h4 class="g">Trip AI is on!!!</h4>
      <ul>${CHECKS.map((c) => `<li><span class="cc"></span>${c}</li>`).join('')}</ul>
      <div class="bt2"><button class="btn gr tap" data-a="notnow">Not now</button><button class="btn pa tap start" disabled>Start Trip Plan ${I.arrow}</button></div>
    </div>
    <div class="cele">
      <div class="bl"></div>
      <canvas></canvas>
      <div class="wg"><span class="w1">we’re</span><span class="w2 g">${[...'going!'].map((c, i) => `<span style="animation-delay:${0.25 + i * 0.06}s">${c}</span>`).join('')}</span></div>
      <div class="tk"><div class="tl"><div class="cd"><img class="ri2" src="${IMG}ticket-r.jpg" alt=""><div class="tx"><div class="a" data-k="dn">Gokarna Beach</div><div class="b">GOA</div><div class="c">Dates</div><div class="d">15-25 Apr</div><div class="e">Budget</div><div class="f" data-k="bud">₹25k-₹35k</div></div><div class="gl"></div></div></div></div>
      <div class="pfoot"><button class="btn gr tap" data-a="celeback">back to chat</button><button class="btn pa tap nx2">Plan itinerary ${I.arrow}</button></div>
    </div>
  </section>

  <section class="view plan off-b gone" data-v="plan">
    <header class="hdr ai"><button class="bk tap" data-a="backchat">${I.back}</button><span class="ga"><img src="${IMG}g-goa.png" alt=""><span class="orb"></span></span><div class="nm"><b>Goa Trip <em>[AI Planning...]</em></b><span>AI, You, Akshay, Aman, Sneha, Sakshi, Priya</span></div><span class="kb">${I.kebab}</span></header>
    <div class="prog"><i></i><i></i><i></i></div>

    <div class="pg scroll" data-p="gat"><div class="gat st">
      <div class="mp"><img src="${IMG}map.jpg" alt=""></div>
      <h3>Here’s what<big class="g">we’ve gathered!</big></h3>
      <p class="sub2">based on your group chats..</p>
      <div class="card">
        <div class="sec">${I.cal}<div class="k"><b>When</b><span>Summer - date needs to be decided</span></div></div>
        <div class="sec">${I.ppl}<div class="k"><b>Group Size</b><span>6 People</span></div></div>
        <div class="sec">${I.pin}<div class="k"><b>Destination</b><span>2 interested for GOA, 4 not decided</span></div></div>
        <div class="sec" style="border:0">${I.cash}<div class="k"><b>Budget</b><span>Not decided</span></div></div>
        <div class="ft">Picked up from past messages, tap to edit it ${I.chev}</div>
      </div>
      <div><h6>What the group loves:</h6><div class="tg"><span>Beach</span><span>Temples</span></div></div>
      <div><h6>Still needs clarity</h6><div class="tg"><span>Dates</span><span>Destination</span><span>Budget</span></div></div>
    </div></div>

    <div class="pg scroll nx gone" data-p="pref"><div class="pref st">
      <h2 class="ttl">Let’s <span class="g">decide!</span></h2>
      <p class="sub2">select your preferences...</p>
      <div class="card">
        <div class="blk">
          <div class="sec">${I.cal}<div class="k"><b>When</b><span>Summer - chat said nothing about dates.</span></div>${okc('when')}</div>
          ${calHTML()}
          <div class="flex"><button class="tgl tap" aria-label="Mark as flexible"></button>Mark as flexible <small class="rng"></small></div>
          <div class="anyd">${I.calI}Select any no date ${I.chev.replace('class="i"', 'class="i cv"')}</div>
        </div>
        <div class="blk">
          <div class="sec">${I.pin}<div class="k"><b>Destination</b><span>2 interested for GOA, where do you want to go?</span></div>${okc('dest')}</div>
          <div class="tg"><button class="tap" data-c="dest">Beach</button><button class="tap" data-c="dest">Temples</button></div>
        </div>
        <div class="blk" style="border:0">
          <div class="sec">${I.cash}<div class="k"><b>Budget</b><span>select the range</span></div>${okc('bud')}</div>
          <div class="sl"><div class="rn"></div><div class="th" data-t="0"></div><div class="th" data-t="1"></div></div>
          <div class="scl"><span>₹0k</span><span>₹25k</span><span>₹50k</span></div>
          <div class="bsel">Budget selected: <b class="bv"></b></div>
          <div class="tg bud"><button class="tap" data-c="bud">Can go higher</button><button class="tap" data-c="bud">I’m fixed for this range</button></div>
        </div>
      </div>
    </div></div>

    <div class="pg scroll nx gone" data-p="rec"><div class="rec st">
      <h2 class="ttl">AI is <span class="g">thinking<span class="dots"><i>.</i><i>.</i><i>.</i></span></span></h2>
      <p class="sub2">based on your and the group’s preferences, here are places recommended by AI</p>
      <div class="think"><span class="orb"></span><div class="tw"><b>Matching places for all 6</b><span class="ts"><span>Reading everyone’s preferences</span></span></div><span class="ct"><b>0</b><br>places</span><i class="bar"></i></div>
      <div class="skel">${'<div class="sk"><div class="p"></div><div class="l" style="width:46%"></div><div class="l" style="width:82%"></div></div>'.repeat(2)}</div>
      <div class="res"><div class="dst">${I.pin}<div><b>Destination</b><span>As you all asked for Beach + Temple + Goa</span></div></div>
      ${Object.entries(DEST).map(([k, d]) => `<div class="dc"><div class="ph"><img src="${IMG}${d.img}" alt=""></div><div class="mt2"><div class="k"><b>${d.name}</b><span>${d.desc}</span></div><button class="add tap" data-dest="${k}">${I.check}<span>Add</span></button></div></div>`).join('')}
      </div>
    </div></div>

    <div class="pg scroll nx gone" data-p="rk"><div class="rk st">
      <h2 class="ttl">Select your <span class="g">preference!</span></h2>
      <p class="sub2">drag to rank. Your ranking helps lock a decision...</p>
      <div class="card">
        <div class="grp"><div class="sec">${I.cal}<div class="k"><b>Date</b><span>dates everybody agreed on</span></div></div><div class="ls" data-l="date"></div></div>
        <div class="grp"><div class="sec">${I.pin}<div class="k"><b>Destination</b><span>places everybody can go</span></div></div><div class="ls d" data-l="dest"></div></div>
        <div class="grp"><div class="sec">${I.cash}<div class="k"><b>Budget</b><span>select the range</span></div></div><div class="ls d" data-l="bud"></div></div>
      </div>
    </div></div>

    <div class="pfoot"><button class="btn gr tap" data-a="backchat">back to chat</button><button class="btn pa tap nx"><span>All good let’s plan</span>${I.arrow}</button></div>
  </section>
  <div class="ptr"></div>`;

  /* =====================================================================
     App
     ===================================================================== */
  // AI scan filter: water ripple (turbulence displacement) + blur + RGB split (chromatic aberration)
  function scanFilter() {
    if (document.getElementById('aiscan')) return;
    const d = document.createElement('div');
    d.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="aiscan" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feTurbulence id="aiscanN" type="fractalNoise" baseFrequency="0.006 0.04" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap id="aiscanD" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur id="aiscanB" in="d" stdDeviation="1.6" result="b"/>
      <feColorMatrix in="b" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="r"/><feOffset in="r" dx="-5" dy="-1" result="r2"/>
      <feColorMatrix in="b" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g"/>
      <feColorMatrix in="b" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="bl"/><feOffset in="bl" dx="5" dy="1" result="b2"/>
      <feBlend in="r2" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b2" mode="screen"/>
    </filter></svg>`;
    document.body.appendChild(d.firstChild);
  }

  function createApp(screen, opts = {}) {
    scanFilter();
    const ctx = { gen: 0, instant: false, paused: false };
    let S, A;
    const app = { screen, ctx, busy: Promise.resolve(), onAct: null };

    const wait = (ms) => {
      const g = ctx.gen;
      if (ctx.instant) return g === ctx.gen ? Promise.resolve() : Promise.reject(STOP);
      return new Promise((res, rej) => {
        let left = ms * SPEED, last = performance.now();
        (function tick() {
          if (g !== ctx.gen) return rej(STOP);
          const now = performance.now();
          if (!ctx.paused) left -= now - last;
          last = now;
          if (left <= 0) res(); else setTimeout(tick, Math.min(left, 40));
        })();
      });
    };
    app.wait = wait;
    const scale = () => screen.getBoundingClientRect().width / 393 || 1;
    const local = (el) => {
      const r = el.getBoundingClientRect(), sr = screen.getBoundingClientRect(), s = scale();
      return { x: (r.left - sr.left) / s, y: (r.top - sr.top) / s, w: r.width / s, h: r.height / s };
    };
    app.local = local;
    app.scale = scale;
    const q = (s) => $(A, s);
    const qa = (s) => $$(A, s);
    const reflow = (el) => void el.offsetWidth;

    function run(fn) { // run an async action; catch cancellation
      const p = (async () => { try { await fn(); } catch (e) { if (e !== STOP) console.error(e); } })();
      app.busy = p;
      return p;
    }

    /* ---------- build ---------- */
    function build() {
      ctx.gen++;
      S = { stage: 'home', col: false, typed: false, sent: false, sheetReady: false, page: 'gat', cal: { s: 0, e: 0 }, flex: false,
        dest: new Set(), bud: null, b: [10, 40], added: new Set(), voted: false, reported: false, cele: false, last: performance.now() };
      screen.innerHTML = `<div class="island"></div><div class="homebar"></div><div class="app dark-sb">${TEMPLATE()}</div>`;
      A = $(screen, '.app');
      A.classList.toggle('instant', ctx.instant);
      app.A = A;
      renderSlider();
      bind();
      qa('.row').forEach((r) => r.classList.add('ent'));
    }
    app.reset = () => { build(); };
    app.setInstant = (v) => { ctx.instant = v; A.classList.toggle('instant', v); if (!v) reflow(A); };
    app.setPaused = (v) => { ctx.paused = v; A.classList.toggle('paused', v); };
    app.state = () => S;

    function toast(t) {
      let el = q('.toast');
      if (!el) { el = document.createElement('div'); el.className = 'toast'; A.appendChild(el); }
      el.textContent = t;
      el.classList.add('on');
      clearTimeout(el._t);
      el._t = setTimeout(() => el.classList.remove('on'), 1800);
    }

    function show(v, cls) { v.classList.remove('gone'); reflow(v); v.classList.remove('off-r', 'off-l', 'off-b'); if (cls) v.classList.add(cls); }
    function hide(v, cls) { v.classList.add(cls); setTimeout(() => { if (v.classList.contains(cls)) v.classList.add('gone'); }, ctx.instant ? 0 : 650); }

    /* ---------- home ---------- */
    function collapse(on) {
      if (S.col === on || S.stage !== 'home') return;
      S.col = on;
      q('.home').classList.toggle('col', on);
      A.classList.toggle('dark-sb', !on);
    }
    const openChat = () => run(async () => {
      S.stage = S.sent ? 'sent' : 'chat';
      A.classList.remove('dark-sb');
      const home = q('.home'), chat = q('.chat');
      show(chat);
      home.classList.add('off-l');
      await wait(700);
      home.classList.add('gone');
      if (S.loaded) return;
      // the group talks: each friend types, then their message lands
      const m = q('.msgs');
      for (const [who, bubbles, meta] of MSGS.slice(1)) {
        let msg = null;
        for (let b = 0; b < bubbles.length; b++) {
          m.insertAdjacentHTML('beforeend', `<div class="msg in tmp"><img class="av" src="${IMG}a-${who}.png" alt=""><div class="bs"><div class="bb typing"><i></i><i></i><i></i></div></div></div>`);
          scrollMsgs();
          await wait(420 + bubbles[b].length * 6);
          q('.tmp').remove();
          if (!msg) {
            m.insertAdjacentHTML('beforeend', msgHTML(who, [bubbles[b]], meta, 'in'));
            msg = m.lastElementChild;
          } else {
            const bb = document.createElement('div');
            bb.className = 'bb'; bb.style.animation = 'msgin .55s var(--spring-soft) both'; bb.textContent = bubbles[b];
            $(msg, '.mt').before(bb);
          }
          scrollMsgs();
          await wait(300);
        }
      }
      S.loaded = true;
    });
    const goHome = () => run(async () => {
      const home = q('.home');
      home.classList.remove('gone'); reflow(home);
      home.classList.remove('off-l');
      hide(q('.chat'), 'off-r');
      S.stage = 'home';
      A.classList.toggle('dark-sb', !S.col);
    });

    /* ---------- chat ---------- */
    const scrollMsgs = () => { const m = q('.msgs'); m.scrollTo({ top: m.scrollHeight, behavior: ctx.instant ? 'auto' : 'smooth' }); };
    const typeAsk = () => run(async () => {
      if (S.typed || S.sent || !S.loaded) return;
      S.typed = true;
      const box = q('.comp .in');
      box.classList.add('t');
      box.innerHTML = '<span class="tt"></span><span class="car"></span>';
      const tt = $(box, '.tt');
      for (let i = 1; i <= ASK.length; i++) { tt.textContent = ASK.slice(0, i); if (!ctx.instant) await wait(i < 4 ? 80 : 28 + Math.random() * 30); }
      q('.comp').classList.add('ty');
    });
    const send = () => run(async () => {
      if (!S.typed || S.sent) return;
      S.sent = true; S.stage = 'sent';
      q('.comp').classList.remove('ty');
      const box = q('.comp .in');
      box.classList.remove('t'); box.textContent = 'Message....';
      q('.msgs').insertAdjacentHTML('beforeend', msgHTML('me', [ASK], '9:04 AM · You', 'in'));
      scrollMsgs();
      await wait(500);
      q('.fab').classList.add('glow');
    });

    /* AI scan: a band sweeps up the chat; inside it the messages ripple, blur and split into RGB */
    async function scan(ms) {
      if (ctx.instant) return;
      const m = q('.msgs'), c = m.cloneNode(true), g = document.createElement('div');
      c.classList.add('scanc');
      c.querySelectorAll('.in').forEach((e) => e.classList.remove('in'));
      c.querySelectorAll('[style]').forEach((e) => { e.style.animation = 'none'; });
      g.className = 'scang';
      [c, g].forEach((e) => e.style.setProperty('--d', ms * SPEED + 'ms'));
      q('.chat').append(c, g);
      c.scrollTop = m.scrollTop;
      // the ripple swells in and settles out while the noise keeps drifting, so it reads as water
      const N = document.getElementById('aiscanN'), D = document.getElementById('aiscanD'), B = document.getElementById('aiscanB');
      const T = ms * SPEED, t0 = performance.now(), g0 = ctx.gen;
      (function f(now) {
        if (!c.isConnected || g0 !== ctx.gen) return;
        const t = (now - t0) / 1000, p = Math.min(1, (now - t0) / T), env = Math.sin(Math.PI * p);
        N.setAttribute('baseFrequency', `${(0.006 + 0.0025 * Math.sin(t * 2.1)).toFixed(4)} ${(0.04 + 0.014 * Math.sin(t * 1.4 + 1)).toFixed(4)}`);
        D.setAttribute('scale', (6 + 18 * env).toFixed(1));
        B.setAttribute('stdDeviation', (0.8 + 1.6 * env).toFixed(2));
        requestAnimationFrame(f);
      })(t0);
      try { await wait(ms); } finally { c.remove(); g.remove(); }
    }

    /* ---------- AI sheet ---------- */
    const openSheet = () => run(async () => {
      if (S.reported) { // after the report, Ask Trip AI just reopens the plan
        if (S.voted) return toast('Trip is planned. Itinerary is next.');
        return toast('Vote on the date to finish the plan');
      }
      if (!S.sent) { await typeAsk(); await send(); }
      S.stage = 'sheet';
      const fab = q('.fab');
      fab.classList.remove('glow'); fab.classList.add('hide');
      if (S.sheetReady) { q('.veil').classList.add('on'); q('.sheet').classList.add('on'); return; }
      const sc = scan(2500); // AI reads the chat
      await wait(650);
      q('.veil').classList.add('on');
      q('.sheet').classList.add('on');
      await wait(350);
      const lis = qa('.sheet li');
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.add('run');
        if (i === 0) await sc.catch(() => {}); // stays on "Read the chat." until the scan finishes
        await wait([250, 750, 900, 900][i]);
        lis[i].classList.remove('run'); lis[i].classList.add('ok');
        await wait(160);
      }
      S.sheetReady = true;
      const b = q('.sheet .start');
      b.disabled = false; b.classList.add('shine');
    });
    const closeSheet = () => {
      q('.veil').classList.remove('on');
      q('.sheet').classList.remove('on');
      q('.fab').classList.remove('hide');
      S.stage = S.reported ? 'report' : 'sent';
    };

    /* ---------- plan ---------- */
    const LABELS = { gat: 'All good let’s plan', pref: 'Confirm your preference', rec: 'Continue with added options', rk: 'Confirm your vote' };
    const ORDER = ['gat', 'pref', 'rec', 'rk'];
    function setPage(p, dir = 1) {
      const cur = q(`.pg[data-p="${S.page}"]`), nx = q(`.pg[data-p="${p}"]`);
      if (cur !== nx) {
        cur.classList.add(dir > 0 ? 'pv' : 'nx');
        setTimeout(() => cur.classList.add('gone'), ctx.instant ? 0 : 600);
        nx.classList.remove('gone', 'pv', 'nx');
        nx.classList.add(dir > 0 ? 'nx' : 'pv'); reflow(nx);
        nx.classList.remove('nx', 'pv');
      }
      nx.scrollTop = 0;
      const st = $(nx, '.st'); st.classList.remove('st'); reflow(st); st.classList.add('st');
      S.page = p; S.stage = p;
      q('.pfoot .nx span').textContent = LABELS[p];
      const i = ORDER.indexOf(p);
      q('.prog').classList.toggle('on', i > 0);
      qa('.prog i').forEach((el, j) => el.classList.toggle('on', j < i));
      if (p === 'gat') { const mp = q('.gat .mp'); mp.classList.remove('drop'); reflow(mp); mp.classList.add('drop'); }
      if (p === 'rk') buildRank();
      syncNext();
    }
    function syncNext() {
      const b = q('.pfoot .nx');
      b.disabled = S.page === 'rec' && (S.thinking || S.added.size === 0);
    }
    const openPlan = () => run(async () => {
      if (!S.sheetReady) return;
      q('.sheet').classList.remove('on');
      q('.veil').classList.remove('on');
      const plan = q('.plan');
      show(plan);
      setPage(S.page === 'gat' ? 'gat' : S.page, 1);
      await wait(700);
    });
    const backToChat = () => run(async () => {
      hide(q('.plan'), 'off-b');
      q('.fab').classList.remove('hide');
      S.stage = S.reported ? 'report' : 'sent';
    });
    async function think() { // anticipation: AI works through the group's inputs before answering
      const r = q('.rec'), ts = q('.think .ts'), ct = q('.think .ct b');
      syncNext();
      countUp(ct, 24, 3400 * SPEED, (v) => v);
      const lines = ['Reading everyone\u2019s preferences', 'Beach + Temples + Goa', `Budget ₹${S.b[0]}k – ₹${S.b[1]}k`, S.cal.s && S.cal.e ? `Free between ${S.cal.s}–${S.cal.e} Apr` : 'Checking free dates', 'Ranking the best matches'];
      await wait(500);
      for (const l of lines) { ts.innerHTML = `<span>${l}</span>`; await wait(720); }
      r.classList.add('done');
      q('.rec .ttl').innerHTML = 'AI is <span class="g">recommending...</span>';
      S.thinking = false; S.recDone = true;
      syncNext();
      await wait(500);
    }
    const next = () => run(async () => {
      const i = ORDER.indexOf(S.page);
      if (i < ORDER.length - 1) {
        const p = ORDER[i + 1];
        if (p === 'rec' && !S.recDone) S.thinking = true;
        setPage(p, 1);
        if (S.thinking) await think(); else await wait(650);
        return;
      }
      await finishPlan();
    });

    /* calendar */
    function renderCal() {
      const { s, e } = S.cal;
      qa('.cal .d').forEach((el) => {
        const d = +el.dataset.d;
        el.classList.toggle('sel', d === s || d === e);
        el.classList.toggle('rg', !!(s && e && d >= s && d <= e));
        el.classList.toggle('rs', d === s && !!e);
        el.classList.toggle('re', d === e);
      });
      q('.rng').textContent = s && e ? `[${s} Apr,26 to ${e} Apr,26]` : s ? `[${s} Apr,26]` : '';
      setOk('when', !!(s && e));
    }
    function pickDay(d) {
      const c = S.cal;
      if (!c.s || c.e) { c.s = d; c.e = 0; } else if (d > c.s) c.e = d; else c.s = d;
      renderCal();
    }
    function setOk(k, on) { const el = q(`[data-ok="${k}"]`); if (el) el.classList.toggle('on', on); }

    /* slider */
    const SLPAD = 17;
    function renderSlider() {
      const sl = q('.sl'); if (!sl) return;
      const w = 329, px = (v) => SLPAD + (w - SLPAD * 2) * v / 50;
      const [a, b] = S.b;
      $$(sl, '.th').forEach((t, i) => { t.style.left = px(S.b[i]) + 'px'; });
      const rn = $(sl, '.rn'); rn.style.left = px(a) - 10 + 'px'; rn.style.width = px(b) - px(a) + 20 + 'px';
      q('.bv').textContent = `₹${a}k - ₹${b}k`;
    }
    app.sliderX = (v) => { const l = local(q('.sl')); return { x: l.x + SLPAD + (l.w - SLPAD * 2) * v / 50, y: l.y + l.h / 2 }; };
    function sliderDrag(th, e) {
      const i = +th.dataset.t, sl = q('.sl');
      th.classList.add('drag');
      const mv = (ev) => {
        const l = local(sl), s = scale(), sr = screen.getBoundingClientRect();
        const x = (ev.clientX - sr.left) / s - l.x;
        let v = Math.round(((x - SLPAD) / (l.w - SLPAD * 2)) * 50);
        v = Math.max(0, Math.min(50, v));
        if (i === 0) v = Math.min(v, S.b[1] - 5); else v = Math.max(v, S.b[0] + 5);
        S.b[i] = v; renderSlider(); S.last = performance.now();
      };
      const up = () => { th.classList.remove('drag'); removeEventListener('pointermove', mv); removeEventListener('pointerup', up); setOk('bud', !!S.bud); };
      addEventListener('pointermove', mv); addEventListener('pointerup', up);
      mv(e);
    }

    /* recommend */
    function addDest(btn) {
      const k = btn.dataset.dest;
      const on = !S.added.has(k);
      on ? S.added.add(k) : S.added.delete(k);
      btn.classList.toggle('on', on);
      $(btn, 'span').textContent = on ? 'Added' : 'Add';
      btn.classList.remove('pop'); reflow(btn); btn.classList.add('pop');
      syncNext();
      if (on && !ctx.instant) { // thumbnail flies into the continue button
        const ph = btn.closest('.dc').querySelector('.ph'), to = local(q('.pfoot .nx')), from = local(ph);
        const f = document.createElement('div');
        f.className = 'fly';
        f.innerHTML = `<img src="${ph.querySelector('img').src}" alt="">`;
        Object.assign(f.style, { left: from.x + 'px', top: from.y + 'px', width: from.w + 'px', height: from.h + 'px' });
        A.appendChild(f); reflow(f);
        Object.assign(f.style, { left: to.x + to.w / 2 - 20 + 'px', top: to.y + 6 + 'px', width: '40px', height: '40px', borderRadius: '50%', opacity: '.3' });
        setTimeout(() => { f.remove(); const b = q('.pfoot .nx'); b.classList.remove('shine'); reflow(b); b.classList.add('shine'); }, 760);
      }
    }

    /* rank */
    function buildRank() {
      const item = (inner, tall) => `<div class="ri"><span class="n"></span><div class="bx ${tall ? 'tall' : ''}">${inner}${I.grip}</div></div>`;
      q('[data-l="date"]').innerHTML = ['15 Apr - 27 Apr', '15 Apr - 25 Apr', '15 Apr - 24 Apr'].map((d) => item(`<span class="k">${d}</span>`)).join('');
      const ds = S.added.size ? [...S.added] : ['gok'];
      q('[data-l="dest"]').innerHTML = ds.map((k) => item(`<img src="${IMG}${DEST[k].img}" alt=""><div class="k" data-dest="${k}"><b>${DEST[k].short}</b><span>Beach · Temple</span></div>`, true)).join('');
      q('[data-l="bud"]').innerHTML = ['₹20k - ₹40k', `₹${S.b[0]}k - ₹${S.b[1]}k`].map((d) => item(`<span class="k">${d}</span>`)).join('');
      renumber();
    }
    function renumber() { qa('.ls').forEach((l) => $$(l, '.ri').forEach((r, i) => { $(r, '.n').textContent = i + 1; })); }
    function rankDrag(item, e) {
      const list = item.parentElement, items = $$(list, '.ri'), i = items.indexOf(item);
      const s = scale(), y0 = e.clientY, h = item.offsetHeight + 9;
      let t = i;
      item.classList.add('lift');
      const mv = (ev) => {
        const dy = (ev.clientY - y0) / s;
        item.style.transform = `translateY(${dy}px) scale(1.02)`;
        t = Math.max(0, Math.min(items.length - 1, Math.round(i + dy / h)));
        items.forEach((o, j) => { if (o === item) return; o.style.transform = j > i && j <= t ? `translateY(${-h}px)` : j < i && j >= t ? `translateY(${h}px)` : ''; });
        S.last = performance.now();
      };
      const up = async () => {
        removeEventListener('pointermove', mv); removeEventListener('pointerup', up);
        item.style.transition = 'transform .28s cubic-bezier(.23,1,.32,1)';
        item.style.transform = `translateY(${(t - i) * h}px)`;
        await new Promise((r) => setTimeout(r, ctx.instant ? 0 : 280));
        items.forEach((o) => { o.style.transition = 'none'; o.style.transform = ''; });
        item.classList.remove('lift');
        const ref = $$(list, '.ri').filter((o) => o !== item)[t] || null;
        list.insertBefore(item, ref);
        reflow(list);
        items.forEach((o) => { o.style.transition = ''; });
        renumber();
      };
      addEventListener('pointermove', mv); addEventListener('pointerup', up);
    }

    /* report + vote */
    const topDest = () => { const k = q('[data-l="dest"] .k'); return DEST[k ? k.dataset.dest : 'gok']; };
    function countUp(el, to, ms, fmt) {
      if (ctx.instant) { el.textContent = fmt(to); return; }
      const t0 = performance.now();
      (function f(now) { const p = Math.min(1, (now - t0) / ms), v = Math.round(to * (1 - Math.pow(1 - p, 3))); el.textContent = fmt(v); if (p < 1) requestAnimationFrame(f); })(t0);
    }
    const finishPlan = () => run(async () => {
      S.plan = { dest: topDest(), bud: `₹${S.b[0]}k-₹${S.b[1]}k` };
      hide(q('.plan'), 'off-b');
      S.stage = 'report';
      q('.fab').classList.remove('hide');
      await wait(650);
      const m = q('.msgs');
      m.insertAdjacentHTML('beforeend', '<div class="msg ai in tmp"><span class="orb av spin"></span><div class="bs"><div class="bb aw"><b>Trip AI is working</b><span class="ts"><span>Collecting 6 rankings</span></span><i class="bar"></i></div></div></div>');
      scrollMsgs();
      const ts = q('.tmp .ts');
      wait(450).then(() => scan(2300)).catch(() => {});
      for (const l of ['Collecting 6 rankings', 'Comparing date ranges', 'Matching budgets', 'Scoring group alignment']) { ts.innerHTML = `<span>${l}</span>`; await wait(620); }
      q('.tmp').remove();
      const d = S.plan.dest;
      m.insertAdjacentHTML('beforeend', `<div class="rep in"><div class="rh"><span class="orb"></span>Trip AI report...</div><div class="rb">
        <h5>Best match for trip:</h5>
        <div class="ln">${I.cal}<div class="k"><b>Date</b><span>15 Apr - 25 Apr</span></div><span class="al" data-n="90"></span></div>
        <div class="ln">${I.pin}<div class="k"><b>Destination</b><span class="sub">${d.short}</span><img src="${IMG}${d.img}" alt=""></div><span class="al" data-n="100"></span></div>
        <div class="ln" style="border:0">${I.cash}<div class="k"><b>Budget</b><span>${S.plan.bud.replace('-', ' - ')}</span></div><span class="al" data-n="100"></span></div>
        <div class="vt"><h6>Vote for date :</h6>${VOTES.map(([l, c], i) => `<button class="vr tap" data-i="${i}"><span class="fl"></span><span class="lb"><span class="ck">${I.check}</span>${l}</span><span class="ct">${c}/6</span></button>`).join('')}</div>
      </div></div>`);
      scrollMsgs();
      await wait(700);
      for (const al of qa('.rep .al')) { al.classList.add('on'); countUp(al, +al.dataset.n, 900, (v) => `${v}% alignment`); await wait(260); }
      qa('.vr').forEach((v, i) => { $(v, '.fl').style.transform = `scaleX(${VOTES[i][1] / 6})`; });
      await wait(400);
      scrollMsgs();
      S.reported = true;
    });
    const vote = (btn) => run(async () => {
      if (S.voted || !S.reported) return;
      S.voted = true; S.stage = 'voted';
      const i = +btn.dataset.i;
      btn.classList.add('voted');
      const ct = $(btn, '.ct'), n = VOTES[i][1] + 1;
      ct.style.transition = 'transform .25s,opacity .25s';
      ct.style.transform = 'translateY(-8px)'; ct.style.opacity = '0';
      await wait(220);
      ct.textContent = `${n}/6`; ct.style.transform = 'translateY(8px)'; reflow(ct);
      ct.style.transform = ''; ct.style.opacity = '';
      $(btn, '.fl').style.transform = `scaleX(${n / 6})`;
      await wait(800);
      q('.fab').classList.add('hide');
      const m = q('.msgs');
      m.insertAdjacentHTML('beforeend', '<div class="msg ai in tmp"><span class="orb av"></span><div class="bs"><div class="bb typing"><i></i><i></i><i></i></div></div></div>');
      scrollMsgs();
      await wait(1100);
      q('.tmp').remove();
      m.insertAdjacentHTML('beforeend', msgHTML('ai', ['Date is also final now.<br>You all are set for the trip!'], '9:15 AM · Trip AI', 'in'));
      scrollMsgs();
      await wait(1500);
      celebrate();
    });

    /* celebration */
    const celebrate = () => run(async () => {
      S.stage = 'cele'; S.cele = true;
      const c = q('.cele');
      q('[data-k="dn"]').textContent = S.plan ? S.plan.dest.name : 'Gokarna Beach';
      if (S.plan) q('[data-k="bud"]').textContent = S.plan.bud;
      c.classList.add('on');
      if (!ctx.instant) setTimeout(() => confetti($(c, 'canvas'), ctx), 450);
      await wait(1700);
      q('.tk .cd').classList.add('fl');
    });
    function celeBack() {
      const c = q('.cele');
      c.classList.remove('on');
      q('.tk .cd').classList.remove('fl');
      S.stage = 'done';
    }

    /* ---------- events ---------- */
    function bind() {
      A.addEventListener('pointerdown', () => { S.last = performance.now(); clearHint(); }, true);
      A.addEventListener('click', (e) => {
        const t = e.target;
        S.last = performance.now();
        if (app.onAct) app.onAct();
        const row = t.closest('.row');
        if (row) return row.dataset.g === 'goa' ? openChat() : toast('Open Goa Trip to try the flow');
        const a = t.closest('[data-a]');
        if (a) {
          const k = a.dataset.a;
          if (k === 'home') return goHome();
          if (k === 'notnow') return closeSheet();
          if (k === 'backchat') return backToChat();
          if (k === 'celeback') return celeBack();
          if (k === 'flex') return;
        }
        if (t.closest('.comp .in')) return typeAsk();
        if (t.closest('.comp .send')) return send();
        if (t.closest('.fab')) return openSheet();
        if (t.closest('.sheet .start')) return openPlan();
        if (t.closest('.pfoot .nx')) return next();
        if (t.closest('.nx2')) return toast('Itinerary planning comes next');
        const tg = t.closest('.tgl');
        if (tg) { S.flex = !S.flex; tg.classList.toggle('on', S.flex); return; }
        const d = t.closest('.cal .d');
        if (d) return pickDay(+d.dataset.d);
        const ch = t.closest('[data-c]');
        if (ch) {
          if (ch.dataset.c === 'dest') { ch.classList.toggle('on'); setOk('dest', qa('[data-c="dest"].on').length > 0); }
          else { qa('[data-c="bud"]').forEach((b) => b.classList.toggle('on', b === ch)); S.bud = ch.textContent; setOk('bud', true); }
          return;
        }
        const ad = t.closest('.add');
        if (ad) return addDest(ad);
        const vr = t.closest('.vr');
        if (vr) return vote(vr);
        if (t.closest('.chip') || t.closest('.newg')) return toast('Open Goa Trip to try the flow');
      });
      A.addEventListener('pointerdown', (e) => {
        const th = e.target.closest('.sl .th');
        if (th) { e.preventDefault(); return sliderDrag(th, e); }
        const ri = e.target.closest('.ri');
        if (ri) { e.preventDefault(); return rankDrag(ri, e); }
        const hs = e.target.closest('.hsheet');
        if (hs && S.stage === 'home') {
          const y0 = e.clientY, list = q('.hsheet .list');
          const mv = (ev) => { const dy = (ev.clientY - y0) / scale(); if (dy < -24) collapse(true); else if (dy > 30 && list.scrollTop <= 0) collapse(false); };
          const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
          addEventListener('pointermove', mv); addEventListener('pointerup', up);
        }
      });
      q('.hsheet').addEventListener('wheel', (e) => {
        if (e.deltaY > 6) collapse(true);
        else if (e.deltaY < -6 && q('.hsheet .list').scrollTop <= 0) collapse(false);
      }, { passive: true });
      const tk = q('.tk'), tl = q('.tk .tl');
      tk.addEventListener('pointermove', (e) => {
        if (opts.mode !== 'interactive') return;
        const r = tk.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        tl.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 14}deg)`;
      });
      tk.addEventListener('pointerleave', () => { tl.style.transform = ''; });
    }

    /* ---------- interactive hint ---------- */
    let hintEl = null;
    function clearHint() { if (hintEl) hintEl.classList.remove('hint'); hintEl = null; }
    app.hintTarget = () => {
      switch (S.stage) {
        case 'home': return '.row[data-g="goa"]';
        case 'chat': return !S.loaded ? null : S.typed ? '.comp .send' : '.comp .in';
        case 'sent': return '.fab';
        case 'sheet': return S.sheetReady ? '.sheet .start' : null;
        case 'gat': return '.pfoot .nx';
        case 'pref':
          if (!S.cal.s) return '.cal .d[data-d="15"] i';
          if (!S.cal.e) return '.cal .d[data-d="20"] i';
          if (!qa('[data-c="dest"].on').length) return '[data-c="dest"]:nth-child(2)';
          if (!S.bud) return '[data-c="bud"]:nth-child(2)';
          return '.pfoot .nx';
        case 'rec': return S.thinking ? null : S.added.size ? '.pfoot .nx' : '.add[data-dest="gok"]';
        case 'rk': return '.pfoot .nx';
        case 'report': return S.reported ? '.vr[data-i="0"]' : null;
        case 'cele': return '.nx2';
        default: return null;
      }
    };
    if (opts.mode === 'interactive') {
      setInterval(() => {
        if (!A || performance.now() - S.last < 2200) return;
        const sel = app.hintTarget(), el = sel && q(sel);
        if (el === hintEl) return;
        clearHint();
        if (el && el.offsetParent !== null) { hintEl = el; el.classList.add('hint'); }
      }, 400);
    }

    build();
    return app;
  }

  /* =====================================================================
     Confetti
     ===================================================================== */
  function confetti(cv, ctx) {
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = 393, H = 852;
    cv.width = W * dpr; cv.height = H * dpr;
    const c = cv.getContext('2d'); c.scale(dpr, dpr);
    const COL = ['#5a52e0', '#8a3fd0', '#e0457b', '#f58a3a', '#f7b23b', '#7fe0d0', '#ffffff'];
    const P = [];
    const burst = (x, y, ang, spread, n, sp) => {
      for (let i = 0; i < n; i++) {
        const a = ang + (Math.random() - 0.5) * spread, v = sp * (0.55 + Math.random() * 0.6);
        P.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.35, w: 5 + Math.random() * 6, h: 3 + Math.random() * 5, col: COL[(Math.random() * COL.length) | 0], sh: Math.random() < 0.25 ? 1 : 0, wob: Math.random() * 6 });
      }
    };
    burst(30, 640, -Math.PI / 2 + 0.55, 0.9, 70, 17);
    burst(363, 640, -Math.PI / 2 - 0.55, 0.9, 70, 17);
    setTimeout(() => burst(196, 380, -Math.PI / 2, 2.6, 60, 11), 250);
    const g = ctx.gen, t0 = performance.now();
    (function f(now) {
      if (g !== ctx.gen) return c.clearRect(0, 0, W, H);
      const t = now - t0;
      c.clearRect(0, 0, W, H);
      const fade = t > 2600 ? Math.max(0, 1 - (t - 2600) / 900) : 1;
      for (const p of P) {
        p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.38; p.x += p.vx + Math.sin((t / 160) + p.wob) * 0.6; p.y += p.vy; p.r += p.vr;
        c.save(); c.globalAlpha = fade; c.translate(p.x, p.y); c.rotate(p.r); c.fillStyle = p.col;
        if (p.sh) { c.beginPath(); c.arc(0, 0, p.h / 1.6, 0, 7); c.fill(); }
        else c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(t / 120 + p.wob)) + 1);
        c.restore();
      }
      if (fade > 0) requestAnimationFrame(f); else c.clearRect(0, 0, W, H);
    })(t0);
  }

  /* =====================================================================
     Video driver: moves a tap pointer and plays the script.
     ===================================================================== */
  const CHAPTERS = [
    'Every plan starts in a group chat',
    'Goa? Temples? Nobody agrees.',
    'Ask Trip AI. It reads the room.',
    'What the group already said',
    'Everyone sets their own terms',
    'Places that fit everyone',
    'Rank, don’t argue',
    'See where the group aligns',
    'Vote only on what’s still open',
    'We’re going.'
  ];
  const SCRIPT = [
    { ch: 0, pause: 2400 },
    { ch: 0, drag: '.hsheet .list', by: [0, -230], after: 1100 },
    { ch: 1, tap: '.row[data-g="goa"]', after: 700 },
    { ch: 1, tap: '.comp .in', after: 300 },
    { ch: 1, tap: '.comp .send', after: 800 },
    { ch: 2, tap: '.fab', after: 900 },
    { ch: 3, tap: '.sheet .start', after: 3000 },
    { ch: 4, tap: '.pfoot .nx', after: 1000 },
    { ch: 4, tap: '.cal .d[data-d="15"]', after: 300 },
    { ch: 4, tap: '.cal .d[data-d="20"]', after: 500 },
    { ch: 4, tap: '.tgl', after: 400 },
    { ch: 4, tap: '[data-c="dest"]:nth-child(2)', after: 400 },
    { ch: 4, drag: '.th[data-t="0"]', to: (app) => app.sliderX(25), after: 200 },
    { ch: 4, drag: '.th[data-t="1"]', to: (app) => app.sliderX(35), after: 300 },
    { ch: 4, tap: '[data-c="bud"]:nth-child(2)', after: 800 },
    { ch: 5, tap: '.pfoot .nx', after: 1000 },
    { ch: 5, tap: '.add[data-dest="gok"]', after: 600 },
    { ch: 5, tap: '.add[data-dest="aar"]', after: 900 },
    { ch: 6, tap: '.pfoot .nx', after: 1300 },
    { ch: 6, drag: '[data-l="date"] .ri:nth-child(2) .gp', by: [0, -45], after: 800 },
    { ch: 7, tap: '.pfoot .nx', after: 2800 },
    { ch: 8, tap: '.vr[data-i="0"]', after: 0 },
    { ch: 9, pause: 5000 }
  ];

  // rough chapter lengths for the progress bar: waits + pointer travel + built-in animation time
  const EXTRA = [0, 7500, 3900, 700, 0, 4300, 300, 5500, 3200, 0];
  const SCRIPT_MS = CHAPTERS.map((_, c) => (SCRIPT.filter((s) => s.ch === c).reduce((a, s) => a + (s.pause || s.after || 0) + (s.tap || s.drag ? 800 : 0), 0) + EXTRA[c]) * SPEED);

  function createVideo(app, { onChapter } = {}) {
    const ctx = app.ctx, scr = app.screen;
    let ptr, gen = 0, ch = -1;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const P = { x: 300, y: 700 };
    const anim = (ms, fn) => new Promise((res, rej) => {
      const g = ctx.gen;
      if (ctx.instant) { fn(1); return res(); }
      let el = 0, last = performance.now();
      (function f(now) {
        if (g !== ctx.gen) return rej(STOP);
        if (!ctx.paused) el += now - last;
        last = now;
        const p = Math.min(1, el / ms); fn(ease(p));
        if (p < 1) requestAnimationFrame(f); else res();
      })(last);
    });
    const place = () => { ptr.style.left = P.x + 'px'; ptr.style.top = P.y + 'px'; };
    let hideT = 0;
    const idle = () => { clearTimeout(hideT); hideT = setTimeout(() => ptr && ptr.classList.remove('on'), 650); };
    async function moveTo(x, y) {
      clearTimeout(hideT);
      ptr = scr.querySelector('.ptr');
      ptr.classList.add('on');
      const x0 = P.x, y0 = P.y, d = Math.hypot(x - x0, y - y0);
      await anim(Math.max(260, Math.min(750, d * 1.6)), (p) => { P.x = x0 + (x - x0) * p; P.y = y0 + (y - y0) * p; place(); });
    }
    const centre = (el) => { const l = app.local(el); return { x: l.x + l.w / 2, y: l.y + l.h / 2 }; };
    async function ensureVisible(el) {
      const sc = el.closest('.scroll');
      if (!sc) return;
      const r = app.local(el), c = app.local(sc);
      const lo = c.y + 30, hi = c.y + c.h - 40;
      if (r.y >= lo && r.y + r.h <= hi) return;
      const target = Math.max(0, Math.min(sc.scrollHeight - sc.clientHeight, sc.scrollTop + (r.y + r.h / 2) - (c.y + c.h * 0.5)));
      const s0 = sc.scrollTop;
      await anim(650, (p) => { sc.scrollTop = s0 + (target - s0) * p; });
    }
    function ripple() {
      if (ctx.instant) return;
      const r = document.createElement('div');
      r.className = 'ripple'; r.style.left = P.x + 'px'; r.style.top = P.y + 'px';
      app.A.appendChild(r); setTimeout(() => r.remove(), 650);
    }
    const ev = (type, x, y, target) => {
      const sr = scr.getBoundingClientRect(), s = app.scale();
      const e = new PointerEvent(type, { bubbles: true, cancelable: true, clientX: sr.left + x * s, clientY: sr.top + y * s, pointerId: 7, isPrimary: true });
      (target || window).dispatchEvent(e);
    };
    async function tap(sel) {
      const el = app.A.querySelector(sel);
      if (!el) return;
      await ensureVisible(el);
      if (!ctx.instant) {
        const c = centre(el); await moveTo(c.x, c.y);
        ptr.classList.add('down'); el.classList.add('pressed');
        await app.wait(140);
        ptr.classList.remove('down'); el.classList.remove('pressed'); ripple();
      }
      el.click();
      idle();
      await app.busy;
    }
    async function drag(step) {
      const el = app.A.querySelector(step.drag);
      if (!el) return;
      await ensureVisible(el);
      const c = centre(el);
      const to = step.to ? step.to(app) : { x: c.x + step.by[0], y: c.y + step.by[1] };
      if (!ctx.instant) { await moveTo(c.x, c.y); ptr.classList.add('down'); await app.wait(120); }
      P.x = c.x; P.y = c.y;
      ev('pointerdown', c.x, c.y, el);
      await anim(step.drag.includes('list') ? 520 : 700, (p) => { P.x = c.x + (to.x - c.x) * p; P.y = c.y + (to.y - c.y) * p; if (ptr) place(); ev('pointermove', P.x, P.y); });
      ev('pointerup', P.x, P.y);
      if (ptr) ptr.classList.remove('down');
      idle();
      await app.wait(320);
    }

    async function play(from = 0) {
      const g = ++gen;
      for (let i = from; i < SCRIPT.length; i++) {
        if (g !== gen) return;
        const st = SCRIPT[i];
        if (st.ch !== ch) { ch = st.ch; if (onChapter) onChapter(ch); }
        try {
          if (st.tap) await tap(st.tap);
          else if (st.drag) await drag(st);
          await app.wait(st.pause || st.after || 0);
        } catch (e) { if (e === STOP) return; console.error(e); }
      }
      if (g !== gen) return;
      // loop
      try {
        const sc = scr.querySelector('.app');
        sc.style.transition = 'opacity .6s'; sc.style.opacity = '0';
        await app.wait(650);
      } catch (e) { return; }
      if (g !== gen) return;
      restart(0);
    }
    function restart(toCh = 0) {
      gen++;
      app.reset();
      ch = -1; P.x = 300; P.y = 700;
      const first = SCRIPT.findIndex((s) => s.ch === toCh);
      if (first <= 0) { play(0); return; }
      // fast-forward silently to the chapter start
      (async () => {
        const g = ++gen;
        app.setInstant(true);
        try {
          for (let i = 0; i < first; i++) {
            const st = SCRIPT[i];
            if (st.tap) await tap(st.tap); else if (st.drag) await drag(st);
          }
          await new Promise((r) => setTimeout(r, 30));
        } catch (e) { /* cancelled */ }
        if (g !== gen) return;
        app.setInstant(false);
        play(first);
      })();
    }
    return {
      start: () => restart(0),
      seek: (c) => restart(c),
      pause: (v) => app.setPaused(v),
      get chapter() { return ch; }
    };
  }

  window.TripProto = { createApp, createVideo, CHAPTERS, I, SCRIPT_MS };
})();

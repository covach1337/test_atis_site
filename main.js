(function () {
  var gsap = window.gsap;
  var ScrollToPlugin = window.ScrollToPlugin;
  if (!gsap) return;
  if (ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

  var sections, locked = false, lastWheelTime = 0;

  function getScrollY() { return window.pageYOffset; }

  function currentIdx() {
    var y = getScrollY();
    for (var i = sections.length - 1; i >= 0; i--) {
      if (y >= sections[i].offsetTop - 10) return i;
    }
    return 0;
  }

  function seqInfo() {
    var seq = sections.find(function (s) { return s.classList.contains('seq'); });
    if (!seq) return null;
    var top = seq.offsetTop;
    var bot = top + seq.offsetHeight - window.innerHeight;
    var y   = getScrollY();
    return { idx: sections.indexOf(seq), top: top, bot: bot, y: y };
  }

  // True when inside seq section (not past boundaries)
  function insideSeq() {
    var s = seqInfo();
    return s && s.y >= s.top && s.y <= s.bot;
  }

  function goTo(idx) {
    if (locked || idx < 0 || idx >= sections.length) return;
    var sec = sections[idx];
    var targetY = sec.offsetTop;
    // Coming from below into seq → land at seq end (animation fully played)
    if (sec.classList.contains('seq') && currentIdx() > idx) {
      targetY = sec.offsetTop + sec.offsetHeight - window.innerHeight;
    }
    if (Math.abs(targetY - getScrollY()) < 10) return;
    locked = true;
    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: function () { setTimeout(function () { locked = false; }, 200); }
    });
    updateDots(idx);
  }

  function onDirectional(dir) {
    var s = seqInfo();
    if (s && currentIdx() === s.idx) {
      return; // FrameSequencer handles all navigation inside seq
    }
    var nxt = currentIdx() + dir;
    if (nxt >= 0 && nxt < sections.length) goTo(nxt);
  }

  function onWheel(e) {
    var now = Date.now();
    if (now - lastWheelTime < 60) return;
    lastWheelTime = now;
    if (Math.abs(e.deltaY) < 5) return;
    var dir = e.deltaY > 0 ? 1 : -1;

    var s = seqInfo();
    if (s && currentIdx() === s.idx) {
      return; // FrameSequencer handles all navigation inside seq
    }

    if (locked) return;
    var cur = currentIdx();
    var nxt = cur + dir;
    if (nxt >= 0 && nxt < sections.length && nxt !== cur) {
      e.preventDefault();
      goTo(nxt);
    }
  }

  function addSweepLines() {
    var ST = window.ScrollTrigger;
    if (!ST) return;
    ['.lineup', '.specs', '.process', '.cta'].forEach(function (sel) {
      var sec = document.querySelector(sel);
      if (!sec) return;
      sec.style.position = 'relative';
      var line = document.createElement('div');
      Object.assign(line.style, {
        position: 'absolute', top: '0', left: '0',
        width: '100%', height: '2px',
        background: '#E21A1A',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        pointerEvents: 'none',
        zIndex: '10'
      });
      sec.insertBefore(line, sec.firstChild);
      ST.create({
        trigger: sec, start: 'top 92%', end: 'top 35%', scrub: 0.5,
        onUpdate: function (self) {
          line.style.transform = 'scaleX(' + self.progress + ')';
        }
      });
    });
  }

  function addSectionDots() {
    var labels = ['Hero', 'Видео', 'Продукция', 'Характеристики', 'Процесс', 'Контакты'];
    var nav = document.createElement('nav');
    nav.id = 'sec-dots';
    Object.assign(nav.style, {
  position: 'fixed',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: '999',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',

  // 👇 вот это добавь
  padding: '12px 8px',
  borderRadius: '20px',
  background: 'rgba(0,0,0,0.25)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)', // Safari
});
    sections.forEach(function (sec, i) {
      var wrap = document.createElement('div');
      Object.assign(wrap.style, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
      var label = document.createElement('span');
      label.textContent = labels[i] || '';
      Object.assign(label.style, {
  position: 'absolute',
  right: '12px',   // расстояние от точки
  top: '50%',
  transform: 'translateY(-50%)',
  opacity: '0',
  transition: 'opacity .2s',
});
      var dot = document.createElement('button');
      Object.assign(dot.style, {
        width: '6px', height: '6px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        border: 'none', cursor: 'pointer', padding: '0',
        transition: 'background .3s, transform .3s, width .3s'
      });
      dot.setAttribute('aria-label', labels[i] || 'Section ' + i);
      dot.addEventListener('click', function () { goTo(i); });
      wrap.addEventListener('mouseenter', function () { label.style.opacity = '1'; });
      wrap.addEventListener('mouseleave', function () { label.style.opacity = '0'; });
      wrap.appendChild(label);
      wrap.appendChild(dot);
      nav.appendChild(wrap);
    });
    document.body.appendChild(nav);
    window.addEventListener('scroll', function () { updateDots(currentIdx()); }, { passive: true });
    updateDots(0);
  }

  function updateDots(idx) {
    var nav = document.getElementById('sec-dots');
    if (!nav) return;
    Array.from(nav.children).forEach(function (wrap, i) {
      var dot = wrap.querySelector('button');
      if (!dot) return;
      if (i === idx) {
        dot.style.background = '#E21A1A';
        dot.style.transform = 'scale(1.8)';
      } else {
        dot.style.background = 'rgba(255,255,255,0.25)';
        dot.style.transform = 'scale(1)';
      }
    });
  }

  function init() {
  // Disable snap scroll on mobile — natural scroll only
  if (window.innerWidth < 760) return;

  sections = Array.from(document.querySelectorAll(
    '.hero, .seq, .lineup, .specs, .process, .cta'
  ));
  if (!sections.length) return;
  addSweepLines();
  addSectionDots();
  
  // ---- НАВИГАЦИЯ: скрытие при скролле вниз, показ при скролле вверх ----
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;
  
  function handleNavOnScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastScrollY = currentScrollY;
  }
  
  window.addEventListener('scroll', handleNavOnScroll, { passive: true });
  // ---------------------------------------------------------------
  
  window.addEventListener('wheel', onWheel, { passive: false });
  var touchY = 0;
  window.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (insideSeq()) return;
    var d = touchY - e.changedTouches[0].clientY;
    if (Math.abs(d) > 40) onDirectional(d > 0 ? 1 : -1);
  }, { passive: true });
}
  setTimeout(init, 700);
})();

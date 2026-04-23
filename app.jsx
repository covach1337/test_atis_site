
function useIsMobile(breakpoint) {
  var bp = breakpoint || 760;
  var [isMobile, setIsMobile] = React.useState(window.innerWidth < bp);
  React.useEffect(function() {
    var handler = function() { setIsMobile(window.innerWidth < bp); };
    window.addEventListener('resize', handler);
    return function() { window.removeEventListener('resize', handler); };
  }, [bp]);
  return isMobile;
}

function Nav() {
  const { motion } = window;
  const [isHidden, setIsHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) setIsHidden(true);
      else setIsHidden(false);
      lastScroll = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`nav ${isHidden && !menuOpen ? 'nav--hidden' : ''}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <a href="#" className="nav-logo" aria-label="НПС АТИС">
          <img src="./NPS-ATIS_Logo_DivisionR.svg" alt="АТИС логотип"
            style={{ height: 22, width: 'auto', marginRight: 8 }} />
        </a>
        <div className="nav-links">
          <a href="https://www.atis-wdu.ru/company">О компании</a>
          <a href="#lineup">Продукция</a>
          <a href="https://www.atis-wdu.ru/industry">Производство</a>
          <a href="https://www.atis-wdu.ru/software-systems">ПО</a>
          <a href="https://www.atis-wdu.ru/news">Новости</a>
          <a href="#contacts">Контакты</a>
        </div>
        <a href="#contacts" className="nav-cta" style={{ display: menuOpen ? 'none' : '' }}>Связаться →</a>
        <button className={`nav-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Меню">
          <span /><span /><span />
        </button>
      </motion.nav>

      {menuOpen && (
        <div className="nav-mobile-overlay">
          <a href="https://www.atis-wdu.ru/company" onClick={closeMenu}>О компании</a>
          <a href="#lineup" onClick={closeMenu}>Продукция</a>
          <a href="https://www.atis-wdu.ru/industry" onClick={closeMenu}>Производство</a>
          <a href="https://www.atis-wdu.ru/software-systems" onClick={closeMenu}>ПО</a>
          <a href="https://www.atis-wdu.ru/news" onClick={closeMenu}>Новости</a>
          <a href="#contacts" className="nav-mobile-cta" onClick={closeMenu}>Связаться →</a>
        </div>
      )}
    </>
  );
}
window.Nav = Nav;
/* Hero — intro text over the first frame of the sequence.
   The real product reveal happens in <FrameSequencer /> directly below.
   Uses CSS keyframe staggered entrance (reliable, no JS animation deps). */

function Hero() {
  const s = (i) => ({ animationDelay: `${0.1 + i * 0.08}s` });

  return (
    <section className="hero hero-section" id="about" style={{
  background: "var(--bg)",
  overflow: "hidden",
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "120px 0 80px"
}}>
  {/* Фоновый акцент — мягкий градиент + шум */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 70% 20%, rgba(238,53,36,0.03) 0%, rgba(64,83,97,0.00) 70%)",
    pointerEvents: "none"
  }} />

  <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
    {/* Верхняя линия + бейдж */}
    <div className="hero-mono mono hero-in" style={{ marginBottom: 32 }}>
      <span className="bar" />
      <span>АО «АТИС»</span>
      <span>•</span>
      <span>С 1998 года</span>
    </div>

    {/* ДВЕ КОЛОНКИ: заголовок + правый блок с цифрами и текстом */}
    <div className="hero-grid">
      {/* ЛЕВАЯ КОЛОНКА — заголовок */}
      <div>
        <h1 className="hero-title" style={{ color: "var(--ink)", marginBottom: 40 }}>
          <span className="hero-in" style={{ display: "block" }}>
            Производственная
          </span>
          <span className="hero-in" style={{ display: "block" }}>
            инжиниринговая
          </span>
          <span className="hero-in" style={{ display: "block" }}>
            компания </span>
          <span className="hero-in" style={{ display: "block" }}>
            в сфере
          </span>
          <span className="hero-in" style={{ display: "block" }}>
            автоматизации и безопасности.
          </span>
        </h1>

        {/* Кнопки */}
        <div className="hero-ctas hero-in" style={{ marginTop: 0 }}>
          <a href="#contacts" className="btn-primary">
            Начать сотрудничество
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </a>
          <a href="#lineup" className="btn-ghost">Наши направления</a>
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА — текст + разнесённые плашки с цифрами */}
      <div className="hero-kpi-col">
        {/* Описательный текст с лёгкой плашкой */}
        <div className="hero-in" style={{
          background: "rgba(64, 83, 97, 0.04)",
          backdropFilter: "blur(12px)",
          borderRadius: "32px",
          padding: "24px 28px",
          marginBottom: 40,
          border: "1px solid rgba(64, 83, 97, 0.08)"
        }}>
          <p style={{
            fontSize: "18px",
            lineHeight: 1.5,
            color: "var(--ink-dim)",
            margin: 0
          }}>
            Мы проектируем, производим и внедряем инженерные системы для железнодорожной
            инфраструктуры, промышленности и объектов повышенной ответственности.
          </p>
        </div>

        {/* Сетка плашек с цифрами (KPI) — блюровые, разные размеры + иконки */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px"
        }}>
          {/* Плашка 1 */}
          <div className="hero-in" style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: "28px",
            padding: "24px 20px",
            border: "1px solid rgba(64, 83, 97, 0.1)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.02)"
          }}>
            <div style={{ fontSize: "48px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>
              20<span style={{ color: "var(--accent)" }}>+</span>
            </div>
            <div className="mono" style={{ marginTop: 8, color: "var(--ink-dim)" }}>лет опыта</div>
          </div>

          {/* Плашка 2 */}
          <div className="hero-in" style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: "28px",
            padding: "24px 20px",
            border: "1px solid rgba(64, 83, 97, 0.1)",
            transform: "translateY(12px)"
          }}>
            <div style={{ fontSize: "48px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>
              150<span style={{ color: "var(--accent)" }}>+</span>
            </div>
            <div className="mono" style={{ marginTop: 8, color: "var(--ink-dim)" }}>партнёров</div>
          </div>

          {/* Плашка 3 — шире (через colspan) */}
          <div className="hero-in" style={{
            gridColumn: "span 2",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: "28px",
            padding: "20px 28px",
            border: "1px solid rgba(64, 83, 97, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20
          }}>
            <div>
              <div style={{ fontSize: "42px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>
                5 000<span style={{ color: "var(--accent)" }}>+</span>
              </div>
              <div className="mono" style={{ marginTop: 6, color: "var(--ink-dim)" }}>реализованных проектов</div>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--line-strong)" }} />
            <div>
              <div style={{ fontSize: "42px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>
                15 000
              </div>
              <div className="mono" style={{ marginTop: 6, color: "var(--ink-dim)" }}>м² производственных площадей</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 );
}

window.Hero = Hero;
/* FrameSequencer — desktop: video scrubbing. Mobile: canvas + 240 WebP frames scroll-driven. */

function FrameSequencer() {
  const isMobile = window.innerWidth < 760;
  const TOTAL = 240;

  const stageRef    = React.useRef(null);
  const pinRef      = React.useRef(null);
  const videoRef    = React.useRef(null);
  const canvasRef   = React.useRef(null);
  const framesRef   = React.useRef([]);
  const frameIdxRef = React.useRef(0);
  const stRef       = React.useRef(null);
  const lockedRef   = React.useRef(false);
  const [loaded,      setLoaded]      = React.useState(false);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const STEP_PROGRESS = [0.15, 0.5, 0.85, 0.95];

  // Mobile: load all 240 WebP frames in batches
  React.useEffect(() => {
    if (!isMobile) return;
    let cancelled = false, count = 0;
    const imgs = new Array(TOTAL);
    const loadOne = (i) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { imgs[i] = img; resolve(); };
      img.onerror = () => resolve();
      img.src = `frames-mobile/${String(i + 1).padStart(3, '0')}.webp`;
    });
    (async () => {
      const BATCH = 20;
      for (let start = 0; start < TOTAL; start += BATCH) {
        if (cancelled) return;
        await Promise.all(Array.from({ length: Math.min(BATCH, TOTAL - start) }, (_, k) => loadOne(start + k)));
        count += Math.min(BATCH, TOTAL - start);
        if (!cancelled) {
          framesRef.current = imgs;
          setLoadedCount(count);
          if (count === TOTAL) setLoaded(true);
          if (count === BATCH) drawMobileFrame(0); // first batch ready → show frame
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const drawMobileFrame = (idx) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[idx];
    if (!canvas || !img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr) {
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight) * 0.95;
    const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
  };

  // Mobile: resize canvas
  React.useEffect(() => {
    if (!isMobile) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      drawMobileFrame(frameIdxRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Mobile: scroll drives frame index + currentStep
  React.useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const section = stageRef.current;
      if (!section) return;
      const p = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / Math.max(1, section.offsetHeight - window.innerHeight)));
      const idx = Math.min(TOTAL - 1, Math.round(p * (TOTAL - 1)));
      if (idx !== frameIdxRef.current) {
        frameIdxRef.current = idx;
        drawMobileFrame(idx);
      }
      const step = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      setCurrentStep(step);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop: video ready listener
  React.useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setLoaded(true);
    video.addEventListener('canplaythrough', onReady);
    video.addEventListener('loadeddata', onReady);
    return () => {
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('loadeddata', onReady);
    };
  }, []);

  const animateToFrame = (targetProgress) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const startTime = video.currentTime;
    const targetTime = targetProgress * video.duration;
    const duration = 800;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      video.currentTime = startTime + (targetTime - startTime) * ease;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const goToStep = (stepIndex) => {
    if (lockedRef.current) return;
    if (stepIndex < 0) {
      lockedRef.current = true;
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        window.gsap.to(window, { scrollTo: { y: heroSection.offsetTop, autoKill: false }, duration: 0.6, ease: 'power2.inOut', onComplete: () => { setTimeout(() => { lockedRef.current = false; }, 200); } });
      } else { lockedRef.current = false; }
      return;
    }
    if (stepIndex === 3) {
      lockedRef.current = true;
      const lineupSection = document.querySelector('.lineup');
      if (lineupSection) {
        window.gsap.to(window, { scrollTo: { y: lineupSection.offsetTop, autoKill: false }, duration: 0.6, ease: 'power2.inOut', onComplete: () => { setTimeout(() => { lockedRef.current = false; }, 200); } });
      } else { lockedRef.current = false; }
      return;
    }
    if (stepIndex >= 0 && stepIndex < 3) {
      lockedRef.current = true;
      setCurrentStep(stepIndex);
      if (!isMobile) animateToFrame(STEP_PROGRESS[stepIndex]);
      setTimeout(() => { lockedRef.current = false; }, 450);
    }
  };

  // GSAP pin — both mobile and desktop
  React.useEffect(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);
    if (window.ScrollToPlugin) gsap.registerPlugin(window.ScrollToPlugin);
    const st = ST.create({ trigger: stageRef.current, start: 'top top', end: 'bottom bottom', pin: pinRef.current, pinSpacing: true, scrub: false, invalidateOnRefresh: true });
    stRef.current = st;
    return () => { st.kill(); stRef.current = null; };
  }, []);

  // Desktop: wheel navigation
  React.useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e) => {
      const seqSection = stageRef.current;
      if (!seqSection) return;
      const rect = seqSection.getBoundingClientRect();
      if (!(rect.top <= 100 && rect.bottom >= 100)) return;
      e.preventDefault();
      if (lockedRef.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const newStep = currentStep + dir;
      if (newStep < 0) goToStep(-1);
      else if (newStep <= 3) goToStep(newStep);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStep]);

  // Desktop: touch navigation
  React.useEffect(() => {
    if (isMobile) return;
    let touchStartY = 0;
    const onTouchStart = (e) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (rect && rect.top <= 10 && rect.bottom >= window.innerHeight * 0.5) touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (!touchStartY) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      touchStartY = 0;
      if (Math.abs(dy) < 35) return;
      const dir = dy > 0 ? 1 : -1;
      const newStep = currentStep + dir;
      if (newStep < 0) goToStep(-1);
      else if (newStep <= 3) goToStep(newStep);
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => { window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchend', onTouchEnd); };
  }, [currentStep]);


  const captions = [
    { num: "01", tag: "ЖАТ", title: "Системы электропитания ЖАТ", body: "Проектируем и производим системы электроснабжения для объектов железнодорожной автоматики и телемеханики. Надёжность в каждом узле.", short: "Системы электроснабжения для объектов ЖАТ" },
    { num: "02", tag: "ЭНЕРГЕТИКА", title: "Дизельные электростанции", body: "Резервное электропитание для устройств ЖАТ, связи и бытовых потребителей первой особой категории. Автономность без компромиссов.", short: "Резервное электропитание без компромиссов" },
    { num: "03", tag: "ПО", title: "Программное обеспечение", body: "ТД-ЭЛ, ПУМА, VORTEX — собственные программные продукты для мониторинга, аналитики и управления бизнес-процессами.", short: "ТД-ЭЛ · ПУМА · VORTEX — мониторинг и аналитика" },
  ];

  return (
    <section className="seq" ref={stageRef} style={{ position: "relative", background: "var(--bg)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 20%, rgba(238,53,36,0.03) 0%, rgba(64,83,97,0.00) 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div className="seq-sticky" ref={pinRef} style={{ position: "relative", zIndex: 1 }}>

  {/* Mobile: bottom overlay — теперь полноценная информационная панель */}
{isMobile && (
  <div className="seq-mob-bot" style={{
    background: "var(--bg)",
    padding: "24px 20px 32px",
    marginTop: "-4px", // убираем возможный зазор
    borderTop: "1px solid var(--line)"
  }}>
    {!loaded ? (
      /* Скелетон загрузки */
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="skel" style={{ width: '45%', height: 20, borderRadius: 8 }} />
        <div className="skel" style={{ width: '90%', height: 14, borderRadius: 6 }} />
        <div className="skel" style={{ width: '75%', height: 14, borderRadius: 6 }} />
        <div className="skel" style={{ width: '50%', height: 44, borderRadius: 100, marginTop: 8 }} />
        <div className="seq-mob-loading mono" style={{ marginTop: 12, textAlign: "center", color: "var(--ink-dim)" }}>
          Загрузка {Math.round(loadedCount / TOTAL * 100)}%
        </div>
      </div>
    ) : (
      /* Полноценный информационный блок */
      <>
        <div className="mono" style={{ 
          fontSize: 11, 
          color: "var(--accent)", 
          marginBottom: 12,
          letterSpacing: "0.1em"
        }}>
          {captions[currentStep].tag}
        </div>
        
        <div className="seq-mob-title" style={{
          fontSize: 24,
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: 12,
          lineHeight: 1.2
        }}>
          {captions[currentStep].title}
        </div>
        
        <p style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: "var(--ink-dim)",
          marginBottom: 20
        }}>
          {captions[currentStep].body}
        </p>
        
        <a href="#lineup" className="btn-primary" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginTop: 8
        }}>
          Подробнее
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
        
        {/* Прогресс-точки для навигации */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 28
        }}>
          {captions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                // скролл к соответствующей позиции
                const section = stageRef.current;
                if (section) {
                  const targetScroll = section.offsetTop + (idx / 3) * (section.offsetHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
              style={{
                width: currentStep === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: currentStep === idx ? "var(--accent)" : "var(--line)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            />
          ))}
        </div>
      </>
    )}
  </div>
)}

        {/* Canvas / Video */}
        <div className="seq-canvas-wrap">
          {isMobile
            ? <canvas ref={canvasRef} className="seq-canvas" />
            : <video ref={videoRef} className="seq-canvas" muted playsInline preload="auto" style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                <source src="frames.webm" type="video/webm" />
                <source src="frames.mp4" type="video/mp4" />
              </video>
          }

   
          {/* Mobile: bottom overlay (empty area below 16:9 image) */}
          {isMobile && (
            <div className="seq-mob-bot">
              {!loaded ? (
                <div className="seq-mob-skel">
                  <div className="skel" style={{ width: '55%', height: 22, borderRadius: 6 }} />
                  <div className="skel" style={{ width: '80%', height: 14, borderRadius: 6 }} />
                  <div className="skel" style={{ width: '40%', height: 32, borderRadius: 100, marginTop: 4 }} />
                  <div className="seq-mob-loading mono" style={{ marginTop: 8 }}>Загрузка {Math.round(loadedCount / TOTAL * 100)}%</div>
                </div>
              ) : (
                <>
                  <div className="seq-mob-title" style={{ transition: 'opacity 0.3s' }}>{captions[currentStep].title}</div>
                  <a href="#lineup" className="seq-mob-btn">Подробнее
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </>
              )}
            </div>
          )}

          {/* Desktop: HUD + hint */}
          {!isMobile && (
            <>
              <div className="seq-hud-top">
                <div className="seq-counter mono">Этап <span className="seq-num">{String(currentStep + 1).padStart(2, '0')}</span> / 03</div>
                <div className="seq-progress"><div className="seq-track"><div className="seq-bar" style={{ width: ((currentStep + 1) / 3 * 100) + '%' }} /></div></div>
              </div>
              {!loaded && <div className="seq-loading mono">Загрузка…</div>}
              <div className="seq-hint mono">
                <span>{currentStep < 2 ? 'Прокрутите → следующий этап' : 'Прокрутите → далее'}</span>
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none"><rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor"/><circle cx="7" cy="7" r="2" fill="currentColor"><animate attributeName="cy" values="6;12;6" dur="1.6s" repeatCount="indefinite"/></circle></svg>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
window.FrameSequencer = FrameSequencer;
/* Lineup — product cards with whileInView animations */

function Lineup() {
  return (
<section className="lineup" id="lineup" style={{
  background: "var(--bg)",
  borderTop: "1px solid var(--line)"
}}>
  <div className="section-wrap">
    
    {/* Заголовочная группа */}
    <div style={{
      marginBottom: "56px"
    }}>
      <div className="mono" style={{
        color: "var(--accent)",
        marginBottom: 16,
        letterSpacing: "0.15em"
      }}>
        КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ
      </div>
      <h2 style={{
        fontSize: "clamp(36px, 5vw, 52px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        marginBottom: 20,
        color: "var(--ink)",
        maxWidth: "700px"
      }}>
        Проектируем, производим и внедряем
      </h2>
      <p style={{
        color: "var(--ink-dim)",
        fontSize: "16px",
        lineHeight: 1.5,
        maxWidth: "560px"
      }}>
        Инженерные системы для железнодорожной инфраструктуры, промышленности и объектов повышенной ответственности
      </p>
    </div>

{/* Карточки направлений */}
<div className="lineup-cards-grid">

  {/* Карточка 1 — Модульные дизель-генераторные установки */}
  <div style={{
    background: "var(--bg-2)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid var(--line)",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      width: "48px",
      height: "48px",
      background: "rgba(238, 53, 36, 0.1)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
        <rect x="4" y="8" width="16" height="12" rx="1" />
        <path d="M8 6V4M16 6V4" strokeLinecap="round" />
        <circle cx="12" cy="14" r="2" fill="var(--accent)" stroke="none" />
      </svg>
    </div>
    
    <h3 style={{
      fontSize: "20px",
      fontWeight: 600,
      color: "var(--ink)",
      marginBottom: 12
    }}>
      Модульные дизель-генераторные установки
    </h3>
    <p style={{
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--ink-dim)",
      marginBottom: 20,
      flex: 1
    }}>
      Автономные решения для резервного и основного электропитания объектов железнодорожной инфраструктуры, промышленности и связи.
    </p>
    
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "auto",
      paddingTop: 20,
      borderTop: "1px solid var(--line)"
    }}>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>МОЩНОСТЬ</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>10–2000 кВт</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>ИСПОЛНЕНИЕ</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Контейнерное / Блочное</div>
      </div>
    </div>
  </div>

  {/* Карточка 2 — Системы пожаротушения (без изменений) */}
  <div style={{
    background: "var(--bg-2)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid var(--line)",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      width: "48px",
      height: "48px",
      background: "rgba(238, 53, 36, 0.1)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4 12H2M22 12h-2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="var(--accent)" stroke="none" />
        <path d="M6 6l-2 2M18 18l2 2" strokeLinecap="round" />
        <path d="M18 6l2 2M6 18l-2 2" strokeLinecap="round" />
      </svg>
    </div>
    
    <h3 style={{
      fontSize: "20px",
      fontWeight: 600,
      color: "var(--ink)",
      marginBottom: 12
    }}>
      Системы пожаротушения
    </h3>
    <p style={{
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--ink-dim)",
      marginBottom: 20,
      flex: 1
    }}>
      Комплексная защита объектов ЖАТ: разработка, производство и внедрение систем пожаротушения.
    </p>
    
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "auto",
      paddingTop: 20,
      borderTop: "1px solid var(--line)"
    }}>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>НАПРАВЛЕНИЕ</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Безопасность</div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>ТИП</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Пожарная защита</div>
      </div>
    </div>
  </div>

  {/* Карточка 3 — Характеристики дизеля (со скелетонами) */}
  <div style={{
    background: "var(--bg-2)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid var(--line)",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column"
  }}>
    <div style={{
      width: "48px",
      height: "48px",
      background: "rgba(238, 53, 36, 0.1)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
        <rect x="6" y="8" width="12" height="12" rx="1" />
        <path d="M10 4v4M14 4v4" strokeLinecap="round" />
        <circle cx="12" cy="14" r="2" fill="var(--accent)" stroke="none" />
        <path d="M8 20h8" strokeLinecap="round" />
      </svg>
    </div>
    
    <h3 style={{
      fontSize: "20px",
      fontWeight: 600,
      color: "var(--ink)",
      marginBottom: 12
    }}>
      Характеристики дизеля
    </h3>
    <div style={{
      fontSize: "14px",
      lineHeight: 1.5,
      color: "var(--ink-dim)",
      marginBottom: 20,
      flex: 1
    }}>
      {/* Скелетоны — заглушки для будущего контента */}
      <div className="skel" style={{ width: "100%", height: "14px", marginBottom: 8, borderRadius: "4px" }} />
      <div className="skel" style={{ width: "85%", height: "14px", marginBottom: 8, borderRadius: "4px" }} />
      <div className="skel" style={{ width: "70%", height: "14px", borderRadius: "4px" }} />
    </div>
    
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "auto",
      paddingTop: 20,
      borderTop: "1px solid var(--line)"
    }}>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>СКОРО</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-dim)" }}>
          <div className="skel" style={{ width: "60px", height: "12px", borderRadius: "4px" }} />
        </div>
      </div>
      <div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--ink-dim)", marginBottom: 4 }}>СКОРО</div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink-dim)" }}>
          <div className="skel" style={{ width: "50px", height: "12px", borderRadius: "4px" }} />
        </div>
      </div>
    </div>
  </div>
</div>
    {/* Нижний блок — статистика */}
    <div className="lineup-stats-grid" style={{
      paddingTop: 32,
      borderTop: "1px solid var(--line)"
    }}>
      <div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
          20<span style={{ fontSize: "20px" }}>+</span>
        </div>
        <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", marginTop: 8 }}>ЛЕТ НА РЫНКЕ</div>
      </div>
      <div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
          150<span style={{ fontSize: "20px" }}>+</span>
        </div>
        <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", marginTop: 8 }}>ПАРТНЁРОВ</div>
      </div>
      <div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
          5 000<span style={{ fontSize: "20px" }}>+</span>
        </div>
        <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", marginTop: 8 }}>ПРОЕКТОВ</div>
      </div>
      <div>
        <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
          15 000
        </div>
        <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", marginTop: 8 }}>М² ПРОИЗВОДСТВА</div>
      </div>
    </div>

    {/* Кнопка "Все направления" */}
    <div style={{
      marginTop: 48,
      textAlign: "center"
    }}>
      <a 
        href="https://www.atis-wdu.ru/industry" 
        className="btn-ghost"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10
        }}
      >
        Все направления компании
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </a>
    </div>

  </div>
</section>
  );
}

window.Lineup = Lineup;
/* Specs — scroll-in rows */

function Specs() {
  const { motion } = window;
  const rows = [
    ["Год основания", "1998"],
    ["Рабочая площадь", "~15 000 м²"],
    ["Производственных комплексов", "6"],
    ["Складских кластеров", "4"],
    ["Офисно-административных зданий", "2"],
    ["Партнёров", "150+"],
    ["Реализованных проектов", "5 000+"],
    ["Адрес", "г. Санкт-Петербург, пл. Конституции, 3, корп. 2"],
    ["Телефон", "+7 (800) 234-88-77"],
    ["Email", "atis@atis-wdu.ru"],
  ];

  return (
    <section className="specs" id="specs" style={{
  background: "var(--bg)",
  borderTop: "1px solid var(--line)"
}}>
  <div className="section-wrap">
    
    {/* Заголовочная группа */}
    <div style={{
      marginBottom: "64px"
    }}>
      <div className="mono" style={{
        color: "var(--accent)",
        marginBottom: 16,
        letterSpacing: "0.15em"
      }}>
        ЦИФРЫ И ФАКТЫ
      </div>
      <h2 style={{
        fontSize: "clamp(36px, 5vw, 56px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        marginBottom: 20,
        color: "var(--ink)"
      }}>
        Производство и <span style={{ color: "var(--accent)" }}>инфраструктура</span>
      </h2>
      <p style={{
        color: "var(--ink-dim)",
        fontSize: "17px",
        lineHeight: 1.5,
        maxWidth: "560px"
      }}>
        Собственная производственная база в Санкт-Петербурге — полный цикл от проектирования
        до сдачи объекта под ключ.
      </p>
    </div>

    {/* Основная сетка: 2 колонки */}
    <div className="specs-grid" style={{ alignItems: "stretch" }}>
      
      {/* ЛЕВАЯ КОЛОНКА — крупные цифры (инфраструктура) */}
      <div style={{
        background: "rgba(64, 83, 97, 0.03)",
        borderRadius: "32px",
        padding: "40px 32px",
        border: "1px solid rgba(64, 83, 97, 0.1)"
      }}>
        <div className="specs-nums-grid">
          <div>
            <div className="specs-big-num">6</div>
            <div className="mono" style={{ marginTop: 10, color: "var(--ink-dim)", fontSize: "11px" }}>производственных комплексов</div>
          </div>
          <div>
            <div className="specs-big-num">4</div>
            <div className="mono" style={{ marginTop: 10, color: "var(--ink-dim)", fontSize: "11px" }}>складских кластера</div>
          </div>
          <div>
            <div className="specs-big-num">2</div>
            <div className="mono" style={{ marginTop: 10, color: "var(--ink-dim)", fontSize: "11px" }}>офисно-административных здания</div>
          </div>
          <div>
            <div className="specs-big-num">15 000</div>
            <div className="mono" style={{ marginTop: 10, color: "var(--ink-dim)", fontSize: "11px" }}>м² общей площади</div>
          </div>
        </div>
        
        <div style={{
          borderTop: "1px solid rgba(64, 83, 97, 0.15)",
          paddingTop: 24,
          marginTop: 8
        }}>
          <div className="mono" style={{ fontSize: "11px", color: "var(--ink-dim)", marginBottom: 8 }}>ГОД ОСНОВАНИЯ</div>
          <div style={{ fontSize: "28px", fontWeight: 600, color: "var(--ink)" }}>1998</div>
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА — список характеристик */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        {/* Группа 1: площадки */}
        <div style={{
          background: "var(--bg-2)",
          borderRadius: "20px",
          padding: "20px 24px",
          border: "1px solid var(--line)"
        }}>
          <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 12, letterSpacing: "0.1em" }}>
            ПРОИЗВОДСТВЕННАЯ БАЗА
          </div>
          <div className="specs-right-cols3">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Рабочая площадь</div>
              <div className="mono" style={{ fontSize: "12px", color: "var(--ink-dim)", marginTop: 4 }}>~15 000 м²</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Комплексов</div>
              <div className="mono" style={{ fontSize: "12px", color: "var(--ink-dim)", marginTop: 4 }}>6</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Складских зон</div>
              <div className="mono" style={{ fontSize: "12px", color: "var(--ink-dim)", marginTop: 4 }}>4</div>
            </div>
          </div>
        </div>

        {/* Группа 2: достижения */}
        <div style={{
          background: "var(--bg-2)",
          borderRadius: "20px",
          padding: "20px 24px",
          border: "1px solid var(--line)"
        }}>
          <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 12, letterSpacing: "0.1em" }}>
            КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ
          </div>
          <div className="specs-right-cols2">
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Партнёров</div>
              <div className="mono" style={{ fontSize: "12px", color: "var(--ink-dim)", marginTop: 4 }}>150+</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Проектов</div>
              <div className="mono" style={{ fontSize: "12px", color: "var(--ink-dim)", marginTop: 4 }}>5 000+</div>
            </div>
          </div>
        </div>

        {/* Группа 3: контакты */}
        <div style={{
          background: "rgba(238, 53, 36, 0.04)",
          borderRadius: "20px",
          padding: "20px 24px",
          border: "1px solid rgba(238, 53, 36, 0.15)"
        }}>
          <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 12, letterSpacing: "0.1em" }}>
            КОНТАКТНАЯ ИНФОРМАЦИЯ
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)" }}>Адрес</div>
            <div style={{ fontSize: "14px", color: "var(--ink-dim)", marginTop: 4 }}>
              г. Санкт-Петербург, пл. Конституции, 3, корп. 2
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginTop: 12
          }}>
            <div>
              <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)" }}>ТЕЛЕФОН</div>
              <a href="tel:+78002348877" style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
                +7 (800) 234-88-77
              </a>
            </div>
            <div>
              <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)" }}>EMAIL</div>
              <a href="mailto:atis@atis-wdu.ru" style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
                atis@atis-wdu.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Нижняя декоративная линия */}
    <div style={{
      marginTop: 64,
      paddingTop: 32,
      borderTop: "1px solid var(--line)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16
    }}>
      <div className="mono" style={{ fontSize: "10px", color: "var(--ink-low)", letterSpacing: "0.1em" }}>
        ПОЛНЫЙ ЦИКЛ: ПРОЕКТИРОВАНИЕ → ПРОИЗВОДСТВО → ВНЕДРЕНИЕ
      </div>
      <div style={{
        display: "flex",
        gap: 12,
        alignItems: "center"
      }}>
        <span style={{
          width: 40,
          height: 2,
          background: "var(--accent)"
        }} />
        <span className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", letterSpacing: "0.1em" }}>
          САНКТ-ПЕТЕРБУРГ
        </span>
      </div>
    </div>

    {/* Бар-чарт — ключевые показатели */}
    <SpecsChart />
  </div>
</section>);
}

function SpecsChart() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bars = [
    { label: "Реализованных проектов", value: "5 000+", pct: 100 },
    { label: "Партнёров и заказчиков",  value: "150+",   pct: 42  },
    { label: "Лет на рынке",            value: "26",     pct: 30  },
    { label: "Производственных площадей (м²)", value: "15 000", pct: 68 },
  ];

  return (
    <div ref={ref} style={{
      marginTop: 56,
      padding: "40px 40px 36px",
      background: "rgba(64,83,97,0.03)",
      borderRadius: 28,
      border: "1px solid rgba(64,83,97,0.1)"
    }}>
      <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 28, letterSpacing: "0.15em" }}>
        ДИНАМИКА КОМПАНИИ
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {bars.map(({ label, value, pct }, i) => (
          <div key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--ink-dim)", flex: 1 }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap" }}>{value}</span>
            </div>
            <div style={{ height: 6, background: "rgba(64,83,97,0.1)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: visible ? pct + "%" : "0%",
                background: i === 0 ? "var(--accent)" : "var(--ink)",
                borderRadius: 99,
                transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Specs = Specs;
/* Process — 4-step pipeline */

function Process() {
  const { motion } = window;
  const steps = [
    ["01", "Консультация", "Обсуждаем задачу и подбираем оптимальное техническое решение под ваш объект."],
    ["02", "Проектирование", "Разрабатываем проектную документацию, спецификации и сметы. Фиксируем стоимость."],
    ["03", "Производство", "Изготавливаем оборудование на собственных площадях ~15 000 м² в Санкт-Петербурге."],
    ["04", "Внедрение", "Выполняем монтаж, ПНР и сдачу объекта под ключ с полной исполнительной документацией."],
  ];
  return (
    <section className="process" id="process" style={{
  background: "var(--bg-2)",
  borderTop: "1px solid var(--line)",
  borderBottom: "1px solid var(--line)"
}}>
  <div className="section-wrap">
    
    {/* Заголовочная группа */}
    <div style={{
      marginBottom: "64px",
      textAlign: "center"
    }}>
      <div className="mono" style={{
        color: "var(--accent)",
        marginBottom: 16,
        letterSpacing: "0.15em"
      }}>
        ЭТАПЫ РАБОТЫ
      </div>
      <h2 style={{
        fontSize: "clamp(36px, 5vw, 52px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        marginBottom: 20,
        color: "var(--ink)",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        От консультации <span style={{ color: "var(--accent)" }}>до сдачи объекта</span> — одной командой
      </h2>
      <p style={{
        color: "var(--ink-dim)",
        fontSize: "16px",
        lineHeight: 1.5,
        maxWidth: "560px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        Полный цикл работ — от первой встречи до ввода в эксплуатацию и сопровождения
      </p>
    </div>

    {/* Горизонтальные этапы — 4 карточки */}
    <div className="process-steps" style={{ marginBottom: "64px" }}>
      
      {/* Этап 1 */}
      <div style={{
        background: "var(--bg)",
        borderRadius: "24px",
        padding: "28px 24px",
        border: "1px solid var(--line)",
        transition: "all 0.2s ease"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          background: "rgba(238, 53, 36, 0.1)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24
        }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent)" }}>01</span>
        </div>
        <h3 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 12
        }}>
          Консультация
        </h3>
        <p style={{
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--ink-dim)",
          marginBottom: 16
        }}>
          Обсуждаем задачу, анализируем объект и подбираем оптимальное техническое решение под ваши требования.
        </p>
        <div style={{
          width: "32px",
          height: "2px",
          background: "var(--accent)",
          marginTop: "auto"
        }} />
      </div>

      {/* Этап 2 */}
      <div style={{
        background: "var(--bg)",
        borderRadius: "24px",
        padding: "28px 24px",
        border: "1px solid var(--line)",
        transition: "all 0.2s ease"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          background: "rgba(238, 53, 36, 0.1)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24
        }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent)" }}>02</span>
        </div>
        <h3 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 12
        }}>
          Проектирование
        </h3>
        <p style={{
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--ink-dim)",
          marginBottom: 16
        }}>
          Разрабатываем проектную документацию, спецификации и сметы. Фиксируем стоимость и сроки.
        </p>
        <div style={{
          width: "32px",
          height: "2px",
          background: "var(--accent)",
          marginTop: "auto"
        }} />
      </div>

      {/* Этап 3 */}
      <div style={{
        background: "var(--bg)",
        borderRadius: "24px",
        padding: "28px 24px",
        border: "1px solid var(--line)",
        transition: "all 0.2s ease"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          background: "rgba(238, 53, 36, 0.1)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24
        }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent)" }}>03</span>
        </div>
        <h3 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 12
        }}>
          Производство
        </h3>
        <p style={{
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--ink-dim)",
          marginBottom: 16
        }}>
          Изготавливаем оборудование на собственных площадях с контролем качества на всех этапах.
        </p>
        <div style={{
          width: "32px",
          height: "2px",
          background: "var(--accent)",
          marginTop: "auto"
        }} />
      </div>

      {/* Этап 4 */}
      <div style={{
        background: "var(--bg)",
        borderRadius: "24px",
        padding: "28px 24px",
        border: "1px solid var(--line)",
        transition: "all 0.2s ease"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          background: "rgba(238, 53, 36, 0.1)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24
        }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "var(--accent)" }}>04</span>
        </div>
        <h3 style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 12
        }}>
          Внедрение
        </h3>
        <p style={{
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--ink-dim)",
          marginBottom: 16
        }}>
          Выполняем монтаж, пусконаладочные работы и сдачу объекта с полной исполнительной документацией.
        </p>
        <div style={{
          width: "32px",
          height: "2px",
          background: "var(--accent)",
          marginTop: "auto"
        }} />
      </div>
    </div>

    {/* Нижний блок с ключевым преимуществом */}
    <div style={{
      background: "var(--bg)",
      borderRadius: "24px",
      padding: "32px 40px",
      border: "1px solid var(--line)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 24
    }}>
      <div>
        <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 8, letterSpacing: "0.1em" }}>
          ГАРАНТИЯ КАЧЕСТВА
        </div>
        <div style={{ fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>
          Единая ответственность за результат
        </div>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: "8px",
            height: "8px",
            background: "var(--accent)",
            borderRadius: "50%"
          }} />
          <span className="mono" style={{ fontSize: "11px", color: "var(--ink-dim)" }}>Без посредников</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: "8px",
            height: "8px",
            background: "var(--accent)",
            borderRadius: "50%"
          }} />
          <span className="mono" style={{ fontSize: "11px", color: "var(--ink-dim)" }}>Собственное производство</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: "8px",
            height: "8px",
            background: "var(--accent)",
            borderRadius: "50%"
          }} />
          <span className="mono" style={{ fontSize: "11px", color: "var(--ink-dim)" }}>Полное сопровождение</span>
        </div>
      </div>
    </div>
    </div>
</section>);
}

window.Process = Process;
/* CTA + wordmark */

function CTA() {
  const { motion } = window;
  return (
    <section className="cta" id="contacts" style={{
  background: "var(--bg)",
  borderTop: "1px solid var(--line)"
}}>
  <div className="section-wrap">
    
    {/* Заголовочная группа */}
    <div style={{
      marginBottom: "48px"
    }}>
      <div className="mono" style={{
        color: "var(--accent)",
        marginBottom: 16,
        letterSpacing: "0.15em"
      }}>
        СВЯЖИТЕСЬ С НАМИ
      </div>
      <h2 style={{
        fontSize: "clamp(44px, 6vw, 72px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        color: "var(--ink)"
      }}>
        Свяжитесь с нами<br />
      </h2>
    </div>

    {/* Основная сетка: контактная информация + форма */}
    <div className="cta-main-grid">
      
      {/* ЛЕВАЯ КОЛОНКА — контакты и реквизиты */}
      <div>
        {/* Блок с контактами */}
        <div style={{
          background: "var(--bg-2)",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid var(--line)",
          marginBottom: 24
        }}>
          <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 20, letterSpacing: "0.1em" }}>
            КОНТАКТНАЯ ИНФОРМАЦИЯ
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>Телефон</div>
            <a href="tel:+78002348877" style={{ fontSize: "20px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", display: "block", marginBottom: 4 }}>
              +7 (800) 234-88-77
            </a>
            <div className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)" }}>Бесплатно по России</div>
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>Email</div>
            <a href="mailto:atis@atis-wdu.ru" style={{ fontSize: "18px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
              atis@atis-wdu.ru
            </a>
          </div>
          
          <div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>Адрес</div>
            <div style={{ fontSize: "15px", color: "var(--ink-dim)", lineHeight: 1.4 }}>
              г. Санкт-Петербург,<br />
              пл. Конституции, 3, корп. 2
            </div>
          </div>
        </div>

        {/* Блок с реквизитами */}
        <div style={{
          background: "var(--bg-2)",
          borderRadius: "24px",
          padding: "32px",
          border: "1px solid var(--line)"
        }}>
          <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 20, letterSpacing: "0.1em" }}>
            РЕКВИЗИТЫ
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr",
            gap: "12px 16px",
            fontSize: "13px"
          }}>
            <div style={{ color: "var(--ink-dim)" }}>ИНН</div>
            <div style={{ color: "var(--ink)", fontWeight: 500 }}>7814402713</div>
            
            <div style={{ color: "var(--ink-dim)" }}>КПП</div>
            <div style={{ color: "var(--ink)", fontWeight: 500 }}>781401001</div>
            
            <div style={{ color: "var(--ink-dim)" }}>ОГРН</div>
            <div style={{ color: "var(--ink)", fontWeight: 500 }}>1089847230445</div>
          </div>
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА — форма */}
      <div style={{
        background: "var(--bg-2)",
        borderRadius: "24px",
        padding: "36px",
        border: "1px solid var(--line)"
      }}>
        <div className="mono" style={{ fontSize: "10px", color: "var(--accent)", marginBottom: 20, letterSpacing: "0.1em" }}>
          ОТПРАВИТЬ ЗАПРОС
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Наш менеджер свяжется с вами в ближайшее время."); }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: 8
            }}>
              Ваше имя
            </label>
            <input 
              type="text" 
              placeholder="Иван Петров"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--line)"}
            />
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: 8
            }}>
              Телефон или Email
            </label>
            <input 
              type="text" 
              placeholder="+7 999 000-00-00"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--line)"}
            />
          </div>
          
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: 8
            }}>
              Ваш вопрос или задача
            </label>
            <textarea 
              placeholder="Опишите ваш проект или потребность..."
              rows="4"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                color: "var(--ink)",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--line)"}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: "100%",
              background: "var(--accent)",
              color: "#fff",
              padding: "16px 24px",
              borderRadius: "40px",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s"
            }}
            onMouseEnter={(e) => e.target.style.background = "var(--accent-2)"}
            onMouseLeave={(e) => e.target.style.background = "var(--accent)"}
          >
            Отправить запрос
          </button>
          
          <div className="mono" style={{
            fontSize: "10px",
            color: "var(--ink-dim)",
            textAlign: "center",
            marginTop: 20
          }}>
            Мы свяжемся с вами в течение 24 часов
          </div>
        </form>
      </div>
    </div>

    {/* Нижняя декоративная линия с картой-схемой */}
    <div style={{
      marginTop: 64,
      paddingTop: 32,
      borderTop: "1px solid var(--line)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16
    }}>
      <div className="mono" style={{ fontSize: "10px", color: "var(--ink-low)", letterSpacing: "0.1em" }}>
        АО «АТИС» · ПРОИЗВОДСТВЕННАЯ ИНЖИНИРИНГОВАЯ КОМПАНИЯ
      </div>
      <div style={{
        display: "flex",
        gap: 12,
        alignItems: "center"
      }}>
        <span style={{
          width: 40,
          height: 2,
          background: "var(--accent)"
        }} />
        <span className="mono" style={{ fontSize: "10px", color: "var(--ink-dim)", letterSpacing: "0.1em" }}>
          САНКТ-ПЕТЕРБУРГ
        </span>
      </div>
    </div>
  </div>
</section>);
}

window.CTA = CTA;
/* Footer */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ marginBottom: 16 }}>
              <svg height="26" viewBox="0 0 426 34" xmlns="http://www.w3.org/2000/svg" fill="#E21A1A">
                <polygon points="49.6,34 39.2,34 39.2,20.8 10.4,20.8 10.4,34 0,34 0,0 10.4,0 10.4,11.5 39.2,11.5 39.2,0 49.6,0"/>
                <path d="M107.1,34H96.7V9.3H67.9V34H57.5V5.7C57.5,2.6,60,0,63.2,0h38.2c3.1,0,5.7,2.5,5.7,5.7V34z"/>
                <path d="M162.3,9.2l-38.4,0v15.6l38.5,0V34h-38.8c-6.8,0-10.2-2.8-10.2-8.3V8.3c0-5.5,3.4-8.3,10.2-8.3h38.6V9.2z"/>
                <polygon points="171,34 183.8,34 209.4,0 196.6,0"/>
                <polygon points="189.5,34 202.3,34 227.9,0 215.1,0"/>
                <path d="M248.4,9.2c-0.8,0-1.2,0.3-1.7,1.1l-4.9,8.9h14.9l-4.9-8.9c-0.4-0.7-0.9-1.1-1.6-1.1H248.4z M276.5,34h-11.8l-3.4-6.1h-24L234,34h-11.7L240,2.9c1.1-2.1,2.2-2.9,5.1-2.9h8.6c2.5,0,3.9,0.7,5.1,2.9L276.5,34z"/>
                <polygon points="316.8,9.2 298.4,9.2 298.4,34 288,34 288,9.2 269.3,9.2 269.3,0 316.8,0"/>
                <path d="M371.3,34h-10.2V9.2h-0.7c-1.5,0-2.6,0.7-3.4,1.9l-10.4,16C343,32.7,340,34,332.4,34h-2c-4.1,0-7.5-3.3-7.5-7.5V0h10.2v24.8h0.7c1.4,0,2.5-0.7,3.4-1.8l10.7-16.1c3.2-4.8,5.9-6.9,11.8-6.9h4.2c4.1,0,7.5,3.3,7.5,7.5V34z"/>
                <path d="M425.9,9.2h-38.4v1.7v14H426V34h-38.8c-6.8,0-10.2-2.8-10.2-8.3V8.3c0-5.5,3.4-8.3,10.2-8.3h38.6V9.2z"/>
              </svg>
            </div>
            <p>Производственная инжиниринговая компания в сфере автоматизации
              и безопасности с 1998 года. Россия, Санкт-Петербург.</p>
          </div>
          <div className="footer-col">
            <h5>Продукция</h5>
            <a href="https://www.atis-wdu.ru/power-supply-systems">Системы электропитания ЖАТ</a>
            <a href="https://www.atis-wdu.ru/fire-extinguishing-systems">Системы пожаротушения</a>
            <a href="https://www.atis-wdu.ru/diesel-generator-systems">Дизельные электростанции</a>
            <a href="https://www.atis-wdu.ru/television-surveillance-systems">Системы теленаблюдения</a>
          </div>
          <div className="footer-col">
            <h5>Компания</h5>
            <a href="https://www.atis-wdu.ru/company">О компании</a>
            <a href="https://www.atis-wdu.ru/industry">Производство</a>
            <a href="https://www.atis-wdu.ru/software-systems">Программное обеспечение</a>
            <a href="https://www.atis-wdu.ru/news">Новости</a>
          </div>
          <div className="footer-col">
            <h5>Связь</h5>
            <a href="tel:+78002348877">+7 (800) 234-88-77</a>
            <a href="mailto:atis@atis-wdu.ru">atis@atis-wdu.ru</a>
            <a href="https://www.atis-wdu.ru/contacts">Контакты</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 1998–2026 АО «АТИС»</span>
          <span>г. Санкт-Петербург, пл. Конституции, 3, корп. 2</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
/* App entry */

function App() {
  const { Nav, Hero, FrameSequencer, Lineup, Specs, Process, CTA, Footer } = window;
  return (
    <>
      <Nav />
      <Hero />
      <FrameSequencer />
      <Lineup />
      <Specs />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* FrameSequencer — GSAP ScrollTrigger-pinned canvas playback of a PNG sequence.
   True pinning: the stage is fixed to the viewport while scroll drives the
   frame index via ScrollTrigger's scrub timeline. */

function FrameSequencer() {
  const TOTAL = 240;
  const stageRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const framesRef = React.useRef([]);
  const stateRef = React.useRef({ frame: 0 });
  const [loaded, setLoaded] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  // Pre-load all frames
  React.useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs = new Array(TOTAL);
    // Grab auth token if present (preview environment)
    const tok = (() => {
      try { return new URL(location.href).searchParams.get('t'); } catch { return null; }
    })();
    const q = tok ? `?t=${tok}` : '';
    // Prioritize first frame for immediate paint
    const loadOne = (i) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { imgs[i] = img; resolve(); };
      img.onerror = () => resolve();
      img.src = `frames/${String(i + 1).padStart(3, '0')}.png${q}`;
    });
    (async () => {
      // Load in waves of 12 for throughput without thrashing
      const BATCH = 12;
      for (let start = 0; start < TOTAL; start += BATCH) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: Math.min(BATCH, TOTAL - start) }, (_, k) =>
            loadOne(start + k)
          )
        );
        count += Math.min(BATCH, TOTAL - start);
        if (!cancelled) setLoaded(count);
      }
      framesRef.current = imgs;
      // initial draw
      draw();
    })();
    return () => { cancelled = true; };
  }, []);

  // Setup canvas sizing
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const frames = framesRef.current;
    const f = stateRef.current.frame;
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(f)));
    const img = frames[idx] || frames.find(Boolean);
    if (!img) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  React.useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // GSAP ScrollTrigger setup
  React.useEffect(() => {
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;
    if (!gsap || !ST) { console.warn('GSAP not loaded'); return; }
    gsap.registerPlugin(ST);

    const st = ST.create({
      trigger: stageRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinRef.current,
      pinSpacing: false,
      scrub: 0.4,
      onUpdate: (self) => {
        stateRef.current.frame = self.progress * (TOTAL - 1);
        setProgress(self.progress);
        draw();
      },
    });

    return () => { st.kill(); };
  }, []);

  // Caption ranges (progress 0..1)
  const captions = [
    { start: 0.00, end: 0.16, num: "01", tag: "ЖАТ", title: (<>Системы <span className="ital">электропитания ЖАТ</span></>), body: "Проектируем и производим системы электроснабжения для объектов железнодорожной автоматики и телемеханики. Надёжность в каждом узле." },
    { start: 0.20, end: 0.38, num: "02", tag: "Пожаротушение", title: <>Системы <span className="ital">пожаротушения</span></>, body: "Комплексная защита объектов ЖАТ: разработка, производство и внедрение систем пожаротушения под требования заказчика." },
    { start: 0.42, end: 0.60, num: "03", tag: "Энергетика", title: <>Дизельные <span className="ital">электростанции</span></>, body: "Резервное электропитание для устройств ЖАТ, связи и бытовых потребителей первой особой категории. Автономность без компромиссов." },
    { start: 0.64, end: 0.80, num: "04", tag: "Безопасность", title: <>Системы <span className="ital">теленаблюдения</span></>, body: "Комплексные решения видеонаблюдения для контроля и охраны объектов ЖАТ. Интеграция с существующей инфраструктурой." },
    { start: 0.84, end: 1.00, num: "05", tag: "ПО", title: <>Программное <span className="ital">обеспечение</span></>, body: "ТД-ЭЛ, ПУМА, VORTEX — собственные программные продукты для мониторинга, аналитики и управления бизнес-процессами." },
  ];

  const getFade = (c) => {
    let opacity = 0;
    const span = c.end - c.start;
    const fadeZone = Math.min(0.06, span * 0.3);
    if (progress >= c.start && progress <= c.end) {
      const inT = Math.min(1, (progress - c.start) / fadeZone);
      const outT = Math.min(1, (c.end - progress) / fadeZone);
      opacity = Math.min(inT, outT);
    }
    return opacity;
  };

  const loadPct = Math.round((loaded / TOTAL) * 100);

  return (
    <section className="seq" ref={stageRef}>
      <div className="seq-sticky" ref={pinRef}>

        {/* LEFT PANEL — detail card */}
        <div className="seq-panel">
          {/* Skeleton while frames load */}
          <div className="seq-skel-wrap" style={{ opacity: loaded < TOTAL ? 1 : 0, transition: 'opacity 0.7s ease' }}>
            <div className="seq-skel-card">
              <div className="skel skel-tag" />
              <div className="skel skel-num" />
              <div className="skel skel-h1" />
              <div className="skel skel-h2" />
              <div className="skel skel-p" />
              <div className="skel skel-p" style={{ width: '80%' }} />
              <div className="skel skel-p" style={{ width: '60%' }} />
              <div style={{ flex: 1 }} />
              <div className="skel skel-btn" />
            </div>
          </div>

          {/* Detail cards — one per caption, stacked, fade in/out */}
          {captions.map((c, i) => {
            const opacity = loaded < TOTAL ? 0 : getFade(c);
            const y = (1 - opacity) * 24;
            return (
              <div key={i} className="seq-detail-card" style={{
                opacity,
                transform: `translateY(${y}px)`,
                pointerEvents: opacity > 0.5 ? 'auto' : 'none',
              }}>
                <div className="seq-detail-tag">{c.tag}</div>
                <div className="seq-detail-num mono">{c.num} <span style={{ opacity: 0.4 }}>/ 05</span></div>
                <h3 className="seq-detail-title">{c.title}</h3>
                <p className="seq-detail-body">{c.body}</p>
                <div style={{ flex: 1 }} />
                <a href="#lineup" className="seq-btn-more">
                  Подробнее
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            );
          })}
        </div>

        {/* RIGHT — canvas area */}
        <div className="seq-canvas-wrap">
          <canvas ref={canvasRef} className="seq-canvas" />
          <div className="seq-vignette" />

          {/* HUD top */}
          <div className="seq-hud-top">
            <div className="seq-counter mono">
              Кадр <span className="seq-num">{String(Math.min(TOTAL, Math.round(progress * (TOTAL - 1)) + 1)).padStart(3, '0')}</span> / {TOTAL}
            </div>
            <div className="seq-progress">
              <div className="seq-track"><div className="seq-bar" style={{ width: (progress * 100).toFixed(2) + '%' }} /></div>
            </div>
          </div>

          {/* Loading indicator */}
          {loaded < TOTAL && (
            <div className="seq-loading mono">Загрузка {loadPct}%</div>
          )}

          {/* Small badge at bottom of video */}
          <div className="seq-badges">
            {captions.map((c, i) => {
              const opacity = getFade(c);
              const y = (1 - opacity) * 10;
              return (
                <div key={i} className="seq-badge" style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  pointerEvents: 'none',
                }}>
                  <span className="seq-badge-num mono">{c.num}</span>
                  <span className="seq-badge-divider" />
                  <span className="seq-badge-title">{c.title}</span>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          {progress < 0.02 && (
            <div className="seq-hint mono">
              <span>Прокручивайте, чтобы открыть</span>
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none"><rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor"/><circle cx="7" cy="7" r="2" fill="currentColor"><animate attributeName="cy" values="6;12;6" dur="1.6s" repeatCount="indefinite"/></circle></svg>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

window.FrameSequencer = FrameSequencer;

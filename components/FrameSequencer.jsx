/* FrameSequencer — GSAP ScrollTrigger-pinned video scrubbing.
   Scroll drives video.currentTime instead of a PNG array. */

function FrameSequencer() {
  const stageRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setReady(true);
    video.addEventListener('canplaythrough', onReady);
    // also accept 'loadeddata' as fallback
    video.addEventListener('loadeddata', onReady);
    return () => {
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('loadeddata', onReady);
    };
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
        const video = videoRef.current;
        if (video && video.duration) {
          video.currentTime = self.progress * video.duration;
        }
        setProgress(self.progress);
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

  const TOTAL = 240;

  return (
    <section className="seq" ref={stageRef}>
      <div className="seq-sticky" ref={pinRef}>

        {/* LEFT PANEL — detail card */}
        <div className="seq-panel">
          {/* Skeleton while video loads */}
          <div className="seq-skel-wrap" style={{ opacity: ready ? 0 : 1, transition: 'opacity 0.7s ease' }}>
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

          {captions.map((c, i) => {
            const opacity = ready ? getFade(c) : 0;
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

        {/* RIGHT — video area */}
        <div className="seq-canvas-wrap">
          <video
            ref={videoRef}
            className="seq-canvas"
            muted
            playsInline
            preload="auto"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          >
            <source src="frames.webm" type="video/webm" />
            <source src="frames.mp4" type="video/mp4" />
          </video>
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
          {!ready && (
            <div className="seq-loading mono">Загрузка…</div>
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

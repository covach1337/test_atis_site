/* Hero — АТИС company intro */

function Hero() {
  const s = (i) => ({ animationDelay: `${0.1 + i * 0.08}s` });

  return (
    <section className="hero hero--slim" id="about" style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Red diagonal accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '42%', height: '100%',
        background: 'linear-gradient(160deg, #EE3524 0%, #F2B05F 100%)',
        clipPath: 'polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, paddingTop: 160 }}>
        <div className="hero-mono mono hero-in" style={s(0)}>
          <span className="bar" />
          <span>АО «АТИС»</span>
          <span>•</span>
          <span>С 1998 года</span>
        </div>

        <h1 className="hero-title" style={{ color: 'var(--ink)' }}>
          <span className="hero-in" style={{ display: 'block', ...s(1) }}>Производственная</span>
          <span className="hero-in" style={{ display: 'block', ...s(2) }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 400 }}>инжиниринговая</span>
          </span>
          <span className="hero-in" style={{ display: 'block', ...s(3) }}>
            компания в сфере <span className="accent" style={{ color: 'var(--accent)' }}>автоматизации</span>
          </span>
          <span className="hero-in" style={{ display: 'block', ...s(4) }}>и безопасности.</span>
        </h1>

        <p className="hero-sub hero-in" style={{ ...s(5), color: 'var(--ink-dim)' }}>
          Мы проектируем, производим и внедряем инженерные системы для железнодорожной инфраструктуры,
          промышленности и объектов повышенной ответственности.
        </p>

        <div className="hero-ctas hero-in" style={s(6)}>
          <a href="#contacts" className="btn-primary">
            Начать сотрудничество
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </a>
          <a href="#lineup" className="btn-ghost">Наши направления</a>
        </div>
      </div>

      <div className="hero-kpis hero-in" style={{ ...s(8), borderTopColor: 'var(--line)' }}>
        <div className="hero-kpi">
          <div className="num" style={{ color: 'var(--ink)' }}>20<span style={{ color: 'var(--accent)' }}>+</span></div>
          <div className="lbl">лет опыта</div>
        </div>
        <div className="hero-kpi">
          <div className="num" style={{ color: 'var(--ink)' }}>150<span style={{ color: 'var(--accent)' }}>+</span></div>
          <div className="lbl">партнёров</div>
        </div>
        <div className="hero-kpi">
          <div className="num" style={{ color: 'var(--ink)' }}>5 000<span style={{ color: 'var(--accent)' }}>+</span></div>
          <div className="lbl">реализованных проектов</div>
        </div>
        <div className="hero-kpi">
          <div className="num" style={{ color: 'var(--ink)' }}>15 000</div>
          <div className="lbl">м² производственных площадей</div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;

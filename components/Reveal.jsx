/* Reveal — scroll-driven recreation of frames 30-140:
   walls peel away via clip-path, camera dollies through the door into the interior. */

function Reveal() {
  const { motion, useScroll, useTransform, useSpring } = window;
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Phase A (0 → 0.35): container rotation intensifies
  // Phase B (0.35 → 0.65): walls dissolve — clip-path sweeps away the front
  // Phase C (0.65 → 1): push-through into interior, interior fades/scales in

  const rotY        = useTransform(scrollYProgress, [0, 0.35, 1], [25, 15, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.95, 1.4, 2.4]);
  const containerOpacity = useTransform(scrollYProgress, [0.55, 0.78], [1, 0]);

  // dissolve the long front wall with a clip-path mask
  const dissolveClip = useTransform(scrollYProgress, [0.35, 0.7],
    ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"]);
  const frontOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);

  // interior appears
  const interiorOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const interiorScale   = useTransform(scrollYProgress, [0.55, 1], [1.25, 1]);

  // caption swap
  const capA = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const capB = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.7], [0, 1, 1, 0]);
  const capC = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);

  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="reveal" ref={ref}>
      <div className="reveal-sticky">
        <div className="reveal-stage">
          {/* progress */}
          <div className="reveal-progress">
            <div className="mono">Секвенция — разрез контейнера</div>
            <div className="track">
              <motion.div className="bar" style={{ width: progressBar }} />
            </div>
          </div>

          {/* Container in 3D with dissolving front wall */}
          <motion.div
            className="c3d-wrap"
            style={{ perspective: "2000px", opacity: containerOpacity }}
          >
            <motion.div className="c3d" style={{ rotateY: rotY, rotateX: -10, scale: containerScale }}>
              <div className="c3d-face top" />
              <div className="c3d-face bottom" />
              <div className="c3d-face side-short left" />
              <div className="c3d-face side-short right" />
              <div className="c3d-face side-long-back" />
              <motion.div className="c3d-face side-long"
                style={{ clipPath: dissolveClip, opacity: frontOpacity }}>
                <div className="c3d-logo">ATIS</div>
                <div className="c3d-vent" />
                <div className="c3d-door" />
              </motion.div>
              {/* splatter / tear overlay during dissolve */}
              <SplatterMask scrollYProgress={scrollYProgress} />
            </motion.div>
          </motion.div>

          {/* Interior scene fades in */}
          <motion.div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: interiorOpacity, scale: interiorScale,
              pointerEvents: "none"
            }}
          >
            <InteriorScene />
          </motion.div>

          {/* captions */}
          <motion.div className="reveal-caption" style={{ opacity: capA }}>
            <div className="mono" style={{ marginBottom: 10 }}>01 — Оболочка</div>
            <h3>Сварной каркас. <span className="serif">Цельный корпус.</span></h3>
            <p>Несущая рама 100×100 мм, обшивка профлистом С8, термошов по периметру.</p>
          </motion.div>

          <motion.div className="reveal-caption" style={{ opacity: capB }}>
            <div className="mono" style={{ marginBottom: 10 }}>02 — Разрез</div>
            <h3>Стены <span className="serif">уходят</span> — открывается технический контур.</h3>
            <p>Утеплитель 100 мм, пароизоляция, антивандальная внутренняя обшивка.</p>
          </motion.div>

          <motion.div className="reveal-caption" style={{ opacity: capC }}>
            <div className="mono" style={{ marginBottom: 10 }}>03 — Машинный зал</div>
            <h3>Дизель‑генератор <span className="serif">на раме</span>, готов к работе.</h3>
            <p>Выхлопная система, топливный бак, АВР и щиты — в одной пломбируемой ячейке.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SplatterMask({ scrollYProgress }) {
  const { motion, useTransform } = window;
  const op = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const sc = useTransform(scrollYProgress, [0.35, 0.65], [0.8, 1.2]);
  // cowhide-like splatter from frame 50–70
  return (
    <motion.svg
      width="520" height="260" viewBox="0 0 520 260"
      style={{
        position: "absolute", left: 0, top: 0,
        transform: "rotateY(0deg) translateZ(131px)",
        opacity: op, scale: sc, pointerEvents: "none"
      }}
    >
      <defs>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4"/>
          <feDisplacementMap in="SourceGraphic" scale="18"/>
        </filter>
      </defs>
      <g fill="#141416" filter="url(#rough)">
        <ellipse cx="120" cy="100" rx="60" ry="36"/>
        <ellipse cx="200" cy="180" rx="48" ry="28"/>
        <ellipse cx="310" cy="80"  rx="54" ry="32"/>
        <ellipse cx="400" cy="150" rx="62" ry="38"/>
        <ellipse cx="470" cy="60"  rx="30" ry="20"/>
        <ellipse cx="60"  cy="200" rx="36" ry="22"/>
        <ellipse cx="260" cy="130" rx="28" ry="18"/>
      </g>
    </motion.svg>
  );
}

function InteriorScene() {
  return (
    <div className="interior-scene">
      <div className="int-ceiling" />
      <div className="int-floor" />
      <div className="int-side left" />
      <div className="int-side right" />
      <div className="int-back" />
      <div className="int-light" />
      <div className="generator">
        <GeneratorSVG />
      </div>
    </div>
  );
}

function GeneratorSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      {/* base platform */}
      <rect x="20" y="150" width="260" height="20" fill="#6b6858" />
      <rect x="30" y="170" width="240" height="10" fill="#4a4840" />
      {/* main engine block */}
      <rect x="50" y="80" width="180" height="70" fill="#bcb6a4" stroke="#6a6756" strokeWidth="1"/>
      <rect x="60" y="90" width="160" height="10" fill="#8a8778" />
      <rect x="60" y="110" width="50" height="30" fill="#a59f8c" />
      <rect x="120" y="110" width="40" height="30" fill="#9c9683" />
      <rect x="170" y="110" width="50" height="30" fill="#a59f8c" />
      {/* alternator (drum at right) */}
      <circle cx="250" cy="115" r="28" fill="#d0cab7" stroke="#6a6756"/>
      <circle cx="250" cy="115" r="18" fill="#9c9683"/>
      <circle cx="250" cy="115" r="6" fill="#4a4840"/>
      {/* exhaust pipes */}
      <path d="M80 80 Q80 40, 100 40 L100 20" stroke="#cfc9b8" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M140 80 Q140 50, 160 50 L160 25" stroke="#cfc9b8" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <circle cx="100" cy="20" r="12" fill="#b8b2a0"/>
      <circle cx="160" cy="25" r="12" fill="#b8b2a0"/>
      {/* control panel */}
      <rect x="200" y="85" width="30" height="40" fill="#d98b3a" stroke="#6a6756"/>
      <rect x="204" y="90" width="22" height="8" fill="#111"/>
      <circle cx="209" cy="110" r="2" fill="#6a6756"/>
      <circle cx="217" cy="110" r="2" fill="#6a6756"/>
      <circle cx="225" cy="110" r="2" fill="#6a6756"/>
    </svg>
  );
}

window.Reveal = Reveal;

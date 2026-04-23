/* Interior — static "inside" full-width section below the reveal */

function Interior() {
  const { motion } = window;
  const fade = {
    hidden: { y: 32, opacity: 0 },
    show: (i=0) => ({ y: 0, opacity: 1, transition: { delay: i*0.08, duration: 0.9, ease: [0.22,1,0.36,1] }})
  };
  return (
    <section className="process" id="interior" style={{ borderTop: "none", paddingTop: 40 }}>
      <div className="wrap">
        <motion.div className="mono" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 22 }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} variants={fade}>
          <span style={{ width: 40, height: 1, background: "var(--ink-dim)" }} />
          Внутри контейнера
        </motion.div>
        <motion.h2
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fade} custom={1}>
          Машинный зал, <span className="serif" style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400 }}>упакованный</span> до последнего <span style={{ color: "var(--accent)" }}>кабеля</span>.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, marginTop: 72 }} className="int-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
            style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              border: "1px solid var(--line)",
              aspectRatio: "4 / 3",
              background: "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 100%)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <div style={{ width: "80%" }}><GenImg /></div>
            <div className="mono" style={{ position: "absolute", left: 20, top: 20 }}>ДГУ 200 кВт · Вид изнутри</div>
          </motion.div>
          <div>
            {[
              ["Автоматика АВР", "Переключение на резерв за ≤5 секунд. Удалённый мониторинг по Modbus TCP."],
              ["Топливная система", "Бак 500–2000 л в отдельном отсеке, датчик уровня, огнепреградители."],
              ["Шумоизоляция", "Уровень шума на 7 м — 72 дБ(А). Базальтовая вата 100 мм + перфорированные панели."],
              ["Климат", "Приток/вытяжка с жалюзи, обогреватели с термостатом, работа до −60°C."]
            ].map(([t, d], i) => (
              <motion.div key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i*0.08, duration: 0.7, ease: [0.22,1,0.36,1] }}
                style={{ padding: "22px 0", borderTop: "1px solid var(--line)" }}>
                <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em" }}>{t}</div>
                <div style={{ color: "var(--ink-dim)", fontSize: 14, marginTop: 6 }}>{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GenImg() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d5cfbf"/>
          <stop offset="1" stopColor="#7a7666"/>
        </linearGradient>
      </defs>
      {/* room */}
      <rect x="0" y="0" width="400" height="300" fill="#0e0e10"/>
      <polygon points="60,40 340,40 300,180 100,180" fill="#2a2a2c"/>
      <polygon points="100,180 300,180 400,300 0,300" fill="url(#floor)"/>
      <polygon points="0,0 60,40 100,180 0,300" fill="#1a1a1c"/>
      <polygon points="400,0 340,40 300,180 400,300" fill="#1a1a1c"/>
      {/* ribs */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={60 + i*20} y1="40" x2={100 + i*14} y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {/* generator at center */}
      <g transform="translate(130, 150)">
        <rect x="0" y="30" width="140" height="12" fill="#4a4840"/>
        <rect x="10" y="0" width="120" height="30" fill="#bcb6a4"/>
        <circle cx="130" cy="15" r="14" fill="#d0cab7" stroke="#6a6756"/>
        <path d="M30 0 Q30 -20 40 -20 L40 -32" stroke="#cfc9b8" strokeWidth="7" fill="none"/>
        <path d="M65 0 Q65 -15 75 -15 L75 -28" stroke="#cfc9b8" strokeWidth="7" fill="none"/>
        <rect x="90" y="4" width="18" height="22" fill="#ff7a1a"/>
      </g>
      {/* light shaft */}
      <polygon points="200,40 220,40 260,180 240,180" fill="rgba(255,255,255,0.12)"/>
    </svg>
  );
}

window.Interior = Interior;

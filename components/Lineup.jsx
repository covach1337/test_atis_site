/* Lineup — АТИС product/service cards */

function Lineup() {
  const { motion } = window;
  const cards = [
    {
      tag: "ЖАТ",
      title: "Системы электропитания",
      desc: "Проектирование и производство систем электроснабжения для объектов железнодорожной автоматики и телемеханики.",
      meta: [["Отрасль", "Ж/д инфраструктура"], ["Тип", "Производство"]],
    },
    {
      tag: "Пожаротушение",
      title: "Системы пожаротушения",
      desc: "Комплексные решения по защите объектов ЖАТ с использованием современных систем пожаротушения.",
      meta: [["Отрасль", "Безопасность"], ["Тип", "Производство"]],
    },
    {
      tag: "Энергетика",
      title: "Дизельные электростанции",
      desc: "Резервное электропитание устройств ЖАТ, связи и бытовых потребителей первой особой категории.",
      meta: [["Применение", "Резервное питание"], ["Тип", "Производство"]],
    },
    {
      tag: "Безопасность",
      title: "Системы теленаблюдения",
      desc: "Комплексные решения видеонаблюдения для контроля и охраны объектов ЖАТ.",
      meta: [["Отрасль", "Ж/д безопасность"], ["Тип", "Производство"]],
    },
    {
      tag: "ПО",
      title: "Программное обеспечение",
      desc: "Собственные продукты для мониторинга систем ЖАТ, управления пожарными оповещениями и бизнес-процессами.",
      meta: [["Продукты", "ТД-ЭЛ, ПУМА, VORTEX"], ["Тип", "Разработка"]],
    },
  ];

  return (
    <section className="lineup" id="lineup">
      <div className="wrap">
        <div className="lineup-head">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
            Пять направлений. <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 400 }}>Одна</span> цель.
          </motion.h2>
          <motion.p className="lineup-sub"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }}>
            Комплексные инженерные решения для железнодорожной инфраструктуры,
            промышленности и объектов повышенной ответственности.
          </motion.p>
        </div>

        <div className="lineup-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cards.map((c, i) => (
            <motion.div key={c.title} className="card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i*0.08, duration: 0.9, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6 , opacity: 1  }}>
              <div>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'linear-gradient(135deg, #EE3524 0%, #F2B05F 100%)',
                  marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11h14M11 4l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="card-tag">{c.tag}</span>
                <h3 style={{ color: 'var(--ink)' }}>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="card-meta">
                {c.meta.map(([k,v]) => (
                  <div key={k}>{k}<b style={{ color: 'var(--ink)' }}>{v}</b></div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Lineup = Lineup;

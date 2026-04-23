/* Specs — АТИС company facts */

function Specs() {
  const { motion } = window;
  const rows = [
    ["Год основания", "1998 — более 26 лет на рынке"],
    ["Партнёры", "150+ организаций и предприятий"],
    ["Реализованные проекты", "Более 5 000 выполненных проектов"],
    ["Производственная площадь", "~15 000 м² рабочих площадей"],
    ["Производственные комплексы", "6 производственных комплексов"],
    ["Складские кластеры", "4 складских кластера"],
    ["Офисно-административные здания", "2 здания в Санкт-Петербурге"],
    ["Реализованных объектов", "300+ завершённых объектов"],
    ["Отрасль", "Железнодорожная автоматика и телемеханика"],
    ["География", "Россия и страны СНГ"],
  ];

  return (
    <section className="specs" id="specs">
      <div className="wrap">
        <div className="specs-grid">
          <div>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
              О <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 400 }}>компании</span>.
            </motion.h2>
            <motion.p className="specs-intro"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.1 }}>
              АО «АТИС» — производственная инжиниринговая компания с более чем
              двадцатилетним опытом в сфере автоматизации и безопасности.
              Мы сопровождаем проекты от проектирования до пуска в эксплуатацию.
            </motion.p>
          </div>
          <div>
            {rows.map(([l, v], i) => (
              <motion.div key={l} className="spec-row"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i*0.04, duration: 0.6, ease: [0.22,1,0.36,1] }}>
                <div className="idx">{String(i+1).padStart(2,"0")}</div>
                <div className="label">{l}</div>
                <div className="val">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Specs = Specs;

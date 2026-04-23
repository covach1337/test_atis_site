/* Process — cooperation steps */

function Process() {
  const { motion } = window;
  const steps = [
    ["01", "Запрос", "Оставьте заявку или позвоните нам. Обсудим задачи и подберём оптимальное направление сотрудничества."],
    ["02", "Консультация", "Проведём технический аудит, сформируем требования и предложим решение под ваш объект."],
    ["03", "Проектирование", "Разработаем проектную документацию, согласуем спецификацию и зафиксируем стоимость."],
    ["04", "Внедрение", "Производство, поставка, монтаж, пусконаладочные работы и сдача объекта под ключ."],
  ];
  return (
    <section className="process" id="process">
      <div className="wrap">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
          От первого контакта <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 400 }}>до сдачи объекта</span>.
        </motion.h2>
        <div className="process-steps">
          {steps.map(([n, t, d], i) => (
            <motion.div key={n} className="step"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i*0.08, duration: 0.8, ease: [0.22,1,0.36,1] }}>
              <div className="num">— {n}</div>
              <h4>{t}</h4>
              <p>{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Process = Process;

/* CTA — АТИС contact form */

function CTA() {
  const { motion } = window;

  const topics = [
    "Консультация по техническим решениям",
    "Проектирование и внедрение систем",
    "Сервисное обслуживание",
    "Аудит существующих решений",
    "Подбор оборудования",
    "Заключение договора",
  ];

  return (
    <section className="cta" id="contacts">
      <div className="wrap cta-inner">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}>
          <h2>
            Готовы к <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 400 }}>сотрудничеству</span>?<br/>
            Обсудим <span style={{ color: 'var(--accent)' }}>ваш проект</span>.
          </h2>
          <p style={{ color: 'var(--ink-dim)', marginTop: 24, fontSize: 17, maxWidth: '44ch', lineHeight: 1.6 }}>
            Заполните форму и мы свяжемся с вами в ближайшее время.
            Или звоните напрямую: <a href="tel:+78002348877" style={{ color: 'var(--accent)', fontWeight: 500 }}>+7 (800) 234-88-77</a>
          </p>
        </motion.div>

        <motion.form className="cta-form"
          onSubmit={e => { e.preventDefault(); alert("Спасибо! Мы свяжемся с вами в ближайшее время."); }}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22,1,0.36,1] }}>
          <label>Имя</label>
          <input type="text" placeholder="Иван Петров" required />
          <label>Телефон или почта</label>
          <input type="text" placeholder="+7 (800) 234-88-77" required />
          <label>Тема обращения</label>
          <select style={{
            width: '100%', background: 'transparent', border: 0,
            borderBottom: '1px solid var(--line-strong)', color: 'var(--ink)',
            font: 'inherit', fontSize: 17, padding: '10px 0 14px', marginBottom: 20,
            outline: 'none', cursor: 'pointer',
          }}>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="btn-primary" type="submit">
            Отправить запрос
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none"/></svg>
          </button>
        </motion.form>
      </div>
    </section>
  );
}

window.CTA = CTA;

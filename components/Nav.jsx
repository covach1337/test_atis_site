/* Nav */

function Nav() {
  const { motion } = window;
  return (
    <motion.nav
      className="nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <a href="#" className="nav-logo">
        <img src="NPS-ATIS_Logo_DivisionR.svg" alt="НПС АТИС" style={{ height: 22 }} />
      </a>
      <div className="nav-links">
        <a href="#about">О компании</a>
        <a href="#lineup">Продукция</a>
        <a href="#process">Сотрудничество</a>
        <a href="#contacts">Контакты</a>
      </div>
      <a href="#contacts" className="nav-cta">Связаться →</a>
    </motion.nav>
  );
}

window.Nav = Nav;

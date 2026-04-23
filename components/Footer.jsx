/* Footer */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>
              <img src="NPS-ATIS_Logo_White.svg" alt="НПС АТИС" style={{ height: 24, display: 'block' }} />
            </h3>
            <p>Производственная инжиниринговая компания в сфере автоматизации и безопасности. Санкт-Петербург, с 1998 года.</p>
          </div>
          <div className="footer-col">
            <h5>Продукция</h5>
            <a href="#lineup">Системы электропитания ЖАТ</a>
            <a href="#lineup">Системы пожаротушения</a>
            <a href="#lineup">Дизельные электростанции</a>
            <a href="#lineup">Системы теленаблюдения</a>
            <a href="#lineup">Программное обеспечение</a>
          </div>
          <div className="footer-col">
            <h5>Компания</h5>
            <a href="#about">О компании</a>
            <a href="#specs">Производство</a>
            <a href="#process">Сотрудничество</a>
            <a href="#contacts">Контакты</a>
          </div>
          <div className="footer-col">
            <h5>Связь</h5>
            <a href="tel:+78002348877">+7 (800) 234-88-77</a>
            <a href="mailto:atis@atis-wdu.ru">atis@atis-wdu.ru</a>
            <a href="https://www.atis-wdu.ru" target="_blank">atis-wdu.ru</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 1998–2026 АО «АТИС»</span>
          <span>г. Санкт-Петербург, пл. Конституции, 3, корп. 2</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;

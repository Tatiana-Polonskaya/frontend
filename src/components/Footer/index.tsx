import "./style.scss";

import LogoTitle from "./assets/logo-title.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={LogoTitle} alt="Logo" />
                <div className="footer-content__links-container">
                    <a
                        className="footer-content__link"
                        href="http://speechup.ru/confidential/"
                    >
                        {"Политика конфиденциальности"}
                    </a>
                    <a
                        className="footer-content__link"
                        href="http://speechup.ru/usersconf/"
                    >
                        {"Пользовательское соглашение"}
                    </a>
                </div>
                <span>&#169;&nbsp;ООО&nbsp;«Спичап»&nbsp;2023</span>
            </div>
        </footer>
    );
}

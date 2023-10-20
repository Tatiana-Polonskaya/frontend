import "./style.scss";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <span>
                    Все авторские права принадлежат создателям.
                    <br /> Разработчики:
                    <a href="https://github.com/4in4in">Леонов Александр</a>
                    {", "}
                    <a href="https://github.com/4in4in">Полонская Татьяна</a>
                    {", "}
                    <a href="https://github.com/4in4in">Лагун Алексей</a>
                    {", "}
                    <a href="https://github.com/4in4in">Ванькович Анастасия</a>
                    <br />
                    Дизайнер:
                    <a href="https://t.me/ann_choys">Эгамова Анна</a>
                </span>
                <span>
                    ©️ Leonov A., Polonskaia T., Lagun A., Vancovich A., Egamova
                    A.
                </span>
            </div>
        </footer>
    );
}

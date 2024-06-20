import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
    return (
        <header className={s.header}>
            <h1 className={s.title}>Navigation</h1>
            <ul className={s.list}>
                <li className={s.item}>
                    <NavLink className={s.link} to="/">
                        Home
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} to="/movies">
                        Movies
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Navigation;
import { Link } from "react-router-dom";

import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <div className="not_found">
            <h1>
                {" "}
                <span className={s.span}>404</span> Page not found
            </h1>
            <Link to="/">Go home</Link>
        </div>
    );
};

export default NotFoundPage;